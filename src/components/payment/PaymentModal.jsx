import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Divider,
  Chip,
} from '@mui/material';
import {
  Payment,
  Security,
  CheckCircle,
} from '@mui/icons-material';
import { toast } from 'react-toastify';
import api from '../../services/api';

const PaymentModal = ({ open, onClose, appointment, onPaymentSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Load Razorpay script dynamically
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    setLoading(true);
    setError('');

    try {
      // Step 1: Load Razorpay script
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        throw new Error('Razorpay SDK failed to load. Please check your internet connection.');
      }

      // Step 2: Create order on backend
      const orderResponse = await api.post('/payment/create-order', {
        appointmentId: appointment._id
      });

      if (!orderResponse.data.success) {
        throw new Error('Failed to create payment order');
      }

      const { orderId, amount, currency } = orderResponse.data.data;

      // Step 3: Configure Razorpay options
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_your_key_here', // Replace with your actual Razorpay key
        amount: amount,
        currency: currency,
        name: 'Astrology Consultancy',
        description: `${appointment.consultationType} - ${appointment.package}`,
        order_id: orderId,
        handler: async function (response) {
          try {
            setLoading(true);
            // Step 4: Verify payment on backend
            const verifyResponse = await api.post('/payment/verify', {
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
              appointmentId: appointment._id
            });

            if (verifyResponse.data.success) {
              toast.success('Payment successful! Your appointment is confirmed.');
              onPaymentSuccess();
              onClose();
            } else {
              throw new Error('Payment verification failed');
            }
          } catch (error) {
            toast.error('Payment verification failed');
            console.error('Payment verification error:', error);
          } finally {
            setLoading(false);
          }
        },
        prefill: {
          name: appointment.user?.firstName + ' ' + appointment.user?.lastName || 'Customer',
          email: appointment.user?.email || '',
          contact: appointment.user?.phone || ''
        },
        notes: {
          appointmentId: appointment._id,
          consultationType: appointment.consultationType
        },
        theme: {
          color: '#6366f1'
        },
        modal: {
          ondismiss: function() {
            console.log('Payment modal dismissed by user');
            setLoading(false);
          }
        }
      };

      // Step 5: Open Razorpay payment popup
      const razorpay = new window.Razorpay(options);
      razorpay.open();

    } catch (error) {
      console.error('Payment error:', error);
      setError(error.message || 'Payment failed. Please try again.');
      toast.error(error.message || 'Payment failed. Please try again.');
    } finally {
      // Only set loading to false if not opening Razorpay popup
      if (!window.Razorpay) {
        setLoading(false);
      }
    }
  };

  if (!appointment) return null;

  return (
    <Dialog open={open} onClose={!loading ? onClose : undefined} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Payment sx={{ mr: 1, color: 'primary.main' }} />
          Complete Payment
        </Box>
      </DialogTitle>

      <DialogContent>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Appointment Details
          </Typography>
          
          <Box sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 1, border: 1, borderColor: 'divider' }}>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Package:</strong> {appointment.package}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Consultation:</strong> {appointment.consultationType}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Date:</strong> {new Date(appointment.appointmentDate).toLocaleDateString()}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Time:</strong> {appointment.appointmentTime}
            </Typography>
            <Typography variant="body1">
              <strong>Duration:</strong> {appointment.duration} minutes
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">
            Total Amount:
          </Typography>
          <Chip 
            label={`₹${appointment.amount?.toLocaleString()}`}
            color="primary" 
            size="large"
            sx={{ fontSize: '1.1rem', fontWeight: 'bold' }}
          />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, p: 1, bgcolor: 'success.light', borderRadius: 1 }}>
          <Security sx={{ mr: 1, color: 'success.main' }} />
          <Typography variant="body2" color="success.dark">
            Secure payment powered by Razorpay
          </Typography>
        </Box>

        <Alert severity="info" sx={{ mb: 2 }}>
          <Typography variant="body2">
            <strong>Accepted Payment Methods:</strong> UPI, Credit/Debit Cards, Net Banking, Digital Wallets
          </Typography>
        </Alert>

        <Alert severity="warning" sx={{ mb: 2 }}>
          <Typography variant="body2">
            <strong>Note:</strong> You will be redirected to Razorpay's secure payment gateway to complete your transaction.
          </Typography>
        </Alert>
      </DialogContent>

      <DialogActions sx={{ p: 3 }}>
        <Button 
          onClick={onClose} 
          disabled={loading}
          variant="outlined"
        >
          Cancel
        </Button>
        <Button
          onClick={handlePayment}
          variant="contained"
          size="large"
          disabled={loading}
          startIcon={loading ? <CircularProgress size={20} /> : <Payment />}
          sx={{ px: 4 }}
        >
          {loading ? 'Opening Payment Gateway...' : `Pay ₹${appointment.amount?.toLocaleString()}`}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PaymentModal;
