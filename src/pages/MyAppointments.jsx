import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  Avatar,
  Paper,
  Tabs,
  Tab,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Rating,
  TextField,
  Alert,
  CircularProgress,
  Stack,
  Divider
} from '@mui/material';
import {
  CalendarToday,
  VideoCall,
  Cancel,
  Star,
  AccessTime,
  Person,
  Payment,
  CheckCircle,
  Schedule,
  Refresh
} from '@mui/icons-material';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const MyAppointments = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tabValue, setTabValue] = useState(0);
  const [ratingDialog, setRatingDialog] = useState({ open: false, appointment: null });
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      // Fixed: Use correct endpoint
      const response = await api.get('/user/appointments');
      if (response.data.success) {
        setAppointments(response.data.data.appointments || []);
      }
    } catch (error) {
      console.error('Failed to fetch appointments:', error);
      toast.error('Failed to load appointments');
      // Set empty array to prevent undefined errors
      setAppointments([]);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'success';
      case 'pending': return 'warning';
      case 'completed': return 'info';
      case 'cancelled': return 'error';
      default: return 'default';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed': return <CheckCircle />;
      case 'pending': return <Schedule />;
      case 'completed': return <Star />;
      case 'cancelled': return <Cancel />;
      default: return <AccessTime />;
    }
  };

  const filterAppointments = (status) => {
    const now = new Date();
    return appointments.filter(appointment => {
      const appointmentDate = new Date(appointment.appointmentDate);
      
      switch (status) {
        case 'upcoming':
          return appointmentDate >= now && ['pending', 'confirmed'].includes(appointment.status);
        case 'past':
          return appointmentDate < now || appointment.status === 'completed';
        case 'cancelled':
          return appointment.status === 'cancelled';
        default:
          return true;
      }
    });
  };

  const handleCancelAppointment = async (appointmentId) => {
    if (!window.confirm('Are you sure you want to cancel this appointment?')) return;
    
    try {
      // Fixed: Use correct endpoint
      await api.put(`/appointments/${appointmentId}/cancel`);
      toast.success('Appointment cancelled successfully');
      fetchAppointments();
    } catch (error) {
      console.error('Cancel appointment error:', error);
      toast.error(error.response?.data?.message || 'Failed to cancel appointment');
    }
  };

  const handleRateAppointment = (appointment) => {
    setRatingDialog({ open: true, appointment });
  };

  const submitReview = async () => {
    if (rating === 0) {
      toast.error('Please provide a rating');
      return;
    }

    try {
      setSubmittingReview(true);
      // Fixed: Use correct endpoint
      await api.post(`/appointments/${ratingDialog.appointment._id}/review`, {
        rating,
        review
      });
      toast.success('Thank you for your feedback!');
      setRatingDialog({ open: false, appointment: null });
      setRating(0);
      setReview('');
      fetchAppointments();
    } catch (error) {
      console.error('Submit review error:', error);
      toast.error(error.response?.data?.message || 'Failed to submit review');
    } finally {
      setSubmittingReview(false);
    }
  };

  const joinVideoCall = (appointmentId) => {
    navigate(`/video-call/${appointmentId}`);
  };

  const tabLabels = ['All', 'Upcoming', 'Past', 'Cancelled'];

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading your appointments...
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h3" component="h1" gutterBottom fontWeight={700}>
          My Appointments
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Manage your astrology consultations with Jyotirvid Kuldeep Paliwal
        </Typography>
        
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center" sx={{ mt: 3 }}>
          <Button
            variant="contained"
            startIcon={<CalendarToday />}
            onClick={() => navigate('/booking')}
          >
            Book New Consultation
          </Button>
          <Button
            variant="outlined"
            startIcon={<Refresh />}
            onClick={fetchAppointments}
          >
            Refresh
          </Button>
        </Stack>
      </Box>

      {/* Tabs */}
      <Paper sx={{ mb: 3 }}>
        <Tabs
          value={tabValue}
          onChange={(e, newValue) => setTabValue(newValue)}
          variant="fullWidth"
          indicatorColor="primary"
        >
          {tabLabels.map((label, index) => (
            <Tab key={index} label={label} />
          ))}
        </Tabs>
      </Paper>

      {/* Appointments List */}
      <Grid container spacing={3}>
        {filterAppointments(['all', 'upcoming', 'past', 'cancelled'][tabValue]).length === 0 ? (
          <Grid item xs={12}>
            <Paper sx={{ p: 6, textAlign: 'center' }}>
              <CalendarToday sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
              <Typography variant="h5" gutterBottom>
                No {tabLabels[tabValue].toLowerCase()} appointments
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                {tabValue === 1 ? 
                  'You have no upcoming consultations scheduled.' :
                  'No appointments found in this category.'
                }
              </Typography>
              <Button
                variant="contained"
                startIcon={<CalendarToday />}
                onClick={() => navigate('/booking')}
              >
                Book Your First Consultation
              </Button>
            </Paper>
          </Grid>
        ) : (
          filterAppointments(['all', 'upcoming', 'past', 'cancelled'][tabValue]).map((appointment) => (
            <Grid item xs={12} key={appointment._id}>
              <Card 
                sx={{ 
                  transition: 'transform 0.2s',
                  '&:hover': { transform: 'translateY(-2px)' }
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Grid container spacing={3} alignItems="center">
                    {/* Appointment Info */}
                    <Grid item xs={12} md={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Avatar
                          sx={{
                            bgcolor: 'primary.main',
                            mr: 2,
                            width: 50,
                            height: 50
                          }}
                        >
                          <Person />
                        </Avatar>
                        <Box>
                          <Typography variant="h6" fontWeight={600}>
                            {appointment.consultationType || 'General Consultation'}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {appointment.package} Package
                          </Typography>
                        </Box>
                      </Box>

                      <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          📅 {new Date(appointment.appointmentDate).toLocaleDateString('en-IN', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          ⏰ {appointment.appointmentTime}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          💰 ₹{appointment.amount?.toLocaleString()}
                        </Typography>
                      </Box>
                    </Grid>

                    {/* Status & Actions */}
                    <Grid item xs={12} md={6}>
                      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                        <Chip
                          icon={getStatusIcon(appointment.status)}
                          label={appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                          color={getStatusColor(appointment.status)}
                          sx={{ mb: 2 }}
                        />

                        <Stack spacing={1} direction="row" flexWrap="wrap">
                          {appointment.status === 'confirmed' && (
                            <Button
                              variant="contained"
                              color="primary"
                              startIcon={<VideoCall />}
                              onClick={() => joinVideoCall(appointment._id)}
                              size="small"
                            >
                              Join Call
                            </Button>
                          )}

                          {appointment.status === 'pending' && (
                            <Button
                              variant="outlined"
                              color="error"
                              startIcon={<Cancel />}
                              onClick={() => handleCancelAppointment(appointment._id)}
                              size="small"
                            >
                              Cancel
                            </Button>
                          )}

                          {appointment.status === 'completed' && !appointment.rating && (
                            <Button
                              variant="outlined"
                              color="primary"
                              startIcon={<Star />}
                              onClick={() => handleRateAppointment(appointment)}
                              size="small"
                            >
                              Rate Session
                            </Button>
                          )}

                          {appointment.rating && (
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Rating value={appointment.rating} readOnly size="small" />
                              <Typography variant="caption" sx={{ ml: 1 }}>
                                Your Rating
                              </Typography>
                            </Box>
                          )}
                        </Stack>

                        {appointment.paymentStatus && (
                          <Chip
                            label={`Payment: ${appointment.paymentStatus}`}
                            color={appointment.paymentStatus === 'completed' ? 'success' : 'warning'}
                            size="small"
                            sx={{ mt: 1 }}
                          />
                        )}
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>

      {/* Rating Dialog */}
      <Dialog 
        open={ratingDialog.open} 
        onClose={() => setRatingDialog({ open: false, appointment: null })}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Rate Your Consultation</DialogTitle>
        <DialogContent>
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              How was your session with Kuldeep ji?
            </Typography>
            <Rating
              value={rating}
              onChange={(event, newValue) => setRating(newValue)}
              size="large"
              sx={{ mb: 2 }}
            />
          </Box>
          
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Share your experience (optional)"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Tell us about your consultation experience..."
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRatingDialog({ open: false, appointment: null })}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={submitReview}
            disabled={submittingReview || rating === 0}
            startIcon={submittingReview ? <CircularProgress size={16} /> : <Star />}
          >
            Submit Review
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default MyAppointments;
