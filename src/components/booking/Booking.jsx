import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import PaymentModal from '../components/payment/PaymentModal';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Chip,
  Alert,
  CircularProgress,
  Stepper,
  Step,
  StepLabel,
  Paper,
} from '@mui/material';
import {
  CalendarToday,
  Schedule,
  Payment,
  Stars,
  CheckCircle,
} from '@mui/icons-material';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import api from '../../services/api'; 
import { SERVICE_PACKAGES } from '../../utils/constants';

// OR if Booking is in pages folder:
import PaymentModal from "../payment/PaymentModal";

// Consultation types for the booking
const CONSULTATION_TYPES = [
  { id: 'birth-chart', name: 'Birth Chart Reading', description: 'Complete analysis of your birth chart' },
  { id: 'career', name: 'Career Guidance', description: 'Professional and career-related insights' },
  { id: 'marriage', name: 'Marriage & Relationships', description: 'Love, marriage, and relationship guidance' },
  { id: 'health', name: 'Health Astrology', description: 'Health-related astrological insights' },
  { id: 'finance', name: 'Financial Astrology', description: 'Money and investment guidance' },
  { id: 'general', name: 'General Consultation', description: 'General life guidance and predictions' },
];

const Booking = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedDate, setSelectedDate] = useState('');
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [selectedPackage, setSelectedPackage] = useState('');
  const [consultationType, setConsultationType] = useState('');
  const [questions, setQuestions] = useState([{ question: '', answer: '' }]);
  const [loading, setLoading] = useState(false);
  const [slotsLoading, setSlotsLoading] = useState(false);
  
  // Payment Modal states
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [currentAppointment, setCurrentAppointment] = useState(null);
  
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const steps = ['Select Date & Time', 'Choose Package', 'Your Questions', 'Payment'];

  // Fetch available slots when date changes
  useEffect(() => {
    if (selectedDate) {
      fetchAvailableSlots();
    }
  }, [selectedDate]);

  const fetchAvailableSlots = async () => {
    setSlotsLoading(true);
    try {
      console.log('Fetching slots for date:', selectedDate);
      
      const response = await api.get(`/appointments/available-slots/${selectedDate}`);
      console.log('API Response:', response.data);
      
      if (response.data.success) {
        setAvailableSlots(response.data.data.availableSlots || []);
      } else {
        setAvailableSlots([]);
        toast.error(response.data.message || 'Failed to fetch slots');
      }
    } catch (error) {
      console.error('Failed to fetch slots:', error);
      setAvailableSlots([]);
      
      if (error.response?.status === 404) {
        toast.error('Booking service is currently unavailable');
      } else {
        toast.error('Failed to fetch available slots. Please try again.');
      }
    } finally {
      setSlotsLoading(false);
    }
  };

  const handleDateChange = (event) => {
    const date = event.target.value;
    setSelectedDate(date);
    setSelectedSlot(''); // Reset selected slot
  };

  const handleAddQuestion = () => {
    if (questions.length < 5) {
      setQuestions([...questions, { question: '', answer: '' }]);
    }
  };

  const handleQuestionChange = (index, field, value) => {
    const newQuestions = [...questions];
    newQuestions[index][field] = value;
    setQuestions(newQuestions);
  };

  const handleRemoveQuestion = (index) => {
    if (questions.length > 1) {
      const newQuestions = questions.filter((_, i) => i !== index);
      setQuestions(newQuestions);
    }
  };

  const validateStep = (step) => {
    switch (step) {
      case 0:
        return selectedDate && selectedSlot;
      case 1:
        return selectedPackage && consultationType;
      case 2:
        return questions.every(q => q.question.trim() && q.answer.trim());
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (validateStep(activeStep)) {
      setActiveStep((prevStep) => prevStep + 1);
    } else {
      toast.error('Please complete all required fields');
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleBooking = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to book an appointment');
      navigate('/login');
      return;
    }

    setLoading(true);
    try {
      const selectedPkg = SERVICE_PACKAGES.find(pkg => pkg.id === selectedPackage);
      
      const bookingData = {
        appointmentDate: selectedDate,
        appointmentTime: selectedSlot,
        consultationType,
        package: {
          name: selectedPkg.name,
          duration: selectedPkg.duration,
          price: selectedPkg.price
        },
        clientQuestions: questions.map(q => ({
          question: q.question,
          answer: q.answer
        }))
      };

      const response = await api.post('/appointments', bookingData);
      
      if (response.data.success) {
        const appointment = {
          ...response.data.data.appointment,
          package: selectedPkg.name,
          amount: selectedPkg.price,
          duration: selectedPkg.duration,
          consultationType: CONSULTATION_TYPES.find(type => type.id === consultationType)?.name,
          user: user
        };
        
        setCurrentAppointment(appointment);
        setPaymentModalOpen(true);
        toast.success('Appointment created! Please complete payment.');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Booking failed');
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentSuccess = () => {
    setPaymentModalOpen(false);
    toast.success('Payment successful! Your appointment is confirmed.');
    navigate('/dashboard');
  };

  const getMinDate = () => {
    return dayjs().format('YYYY-MM-DD');
  };

  const getMaxDate = () => {
    return dayjs().add(30, 'days').format('YYYY-MM-DD');
  };

  const renderDateTimeStep = () => (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Select Date"
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          InputLabelProps={{ shrink: true }}
          inputProps={{
            min: getMinDate(),
            max: getMaxDate(),
          }}
          helperText="Select a date between today and next 30 days"
        />
      </Grid>
      
      <Grid item xs={12} md={6}>
        <FormControl fullWidth disabled={!selectedDate}>
          <InputLabel>Available Time Slots</InputLabel>
          <Select
            value={selectedSlot}
            onChange={(e) => setSelectedSlot(e.target.value)}
            label="Available Time Slots"
          >
            {slotsLoading ? (
              <MenuItem disabled>
                <CircularProgress size={20} /> Loading slots...
              </MenuItem>
            ) : availableSlots.length > 0 ? (
              availableSlots.map((slot) => (
                <MenuItem key={slot.time} value={slot.time}>
                  {slot.label}
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled>
                {selectedDate ? 'No slots available for this date' : 'Please select a date first'}
              </MenuItem>
            )}
          </Select>
        </FormControl>
      </Grid>

      {selectedDate && (
        <Grid item xs={12}>
          <Alert severity="info" sx={{ mt: 2 }}>
            <Typography variant="body2">
              <strong>Working Hours:</strong> 5:00 PM - 8:00 PM (Monday to Saturday)
              <br />
              <strong>Note:</strong> Sessions are not available on Sundays
            </Typography>
          </Alert>
        </Grid>
      )}
    </Grid>
  );

  const renderPackageStep = () => (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <FormControl fullWidth>
          <InputLabel>Consultation Type</InputLabel>
          <Select
            value={consultationType}
            onChange={(e) => setConsultationType(e.target.value)}
            label="Consultation Type"
          >
            {CONSULTATION_TYPES.map((type) => (
              <MenuItem key={type.id} value={type.id}>
                {type.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          Choose Your Package
        </Typography>
        <Grid container spacing={2}>
          {SERVICE_PACKAGES.map((pkg) => (
            <Grid item xs={12} md={4} key={pkg.id}>
              <Card
                sx={{
                  cursor: 'pointer',
                  border: selectedPackage === pkg.id ? 2 : 1,
                  borderColor: selectedPackage === pkg.id ? 'primary.main' : 'divider',
                  '&:hover': { borderColor: 'primary.main' },
                  position: 'relative'
                }}
                onClick={() => setSelectedPackage(pkg.id)}
              >
                {pkg.id === 'premium' && (
                  <Chip
                    label="Most Popular"
                    color="primary"
                    size="small"
                    sx={{
                      position: 'absolute',
                      top: -8,
                      right: 8,
                    }}
                  />
                )}
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {pkg.name}
                  </Typography>
                  <Typography variant="h4" color="primary" gutterBottom>
                    ₹{pkg.price.toLocaleString()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {pkg.duration} minutes • {pkg.description}
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    {pkg.features.slice(0, 3).map((feature, index) => (
                      <Typography key={index} variant="body2" sx={{ mb: 0.5 }}>
                        ✓ {feature}
                      </Typography>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );

  const renderQuestionsStep = () => (
    <Box>
      <Typography variant="h6" gutterBottom>
        Tell us about your concerns
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Please provide specific questions or areas you'd like guidance on. This helps our astrologer prepare for your session.
      </Typography>
      
      {questions.map((question, index) => (
        <Paper key={index} sx={{ p: 3, mb: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label={`Question ${index + 1}`}
                placeholder="e.g., Career guidance, relationship advice, health concerns"
                value={question.question}
                onChange={(e) => handleQuestionChange(index, 'question', e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Additional Details"
                placeholder="Provide more context or specific details about your question"
                value={question.answer}
                onChange={(e) => handleQuestionChange(index, 'answer', e.target.value)}
                required
              />
            </Grid>
            {questions.length > 1 && (
              <Grid item xs={12}>
                <Button
                  color="error"
                  onClick={() => handleRemoveQuestion(index)}
                  size="small"
                >
                  Remove Question
                </Button>
              </Grid>
            )}
          </Grid>
        </Paper>
      ))}
      
      <Button
        variant="outlined"
        onClick={handleAddQuestion}
        sx={{ mt: 2 }}
        disabled={questions.length >= 5}
      >
        Add Another Question {questions.length >= 5 && '(Max 5)'}
      </Button>
    </Box>
  );

  const renderSummary = () => {
    const selectedPkg = SERVICE_PACKAGES.find(pkg => pkg.id === selectedPackage);
    const selectedConsultation = CONSULTATION_TYPES.find(type => type.id === consultationType);
    
    return (
      <Box>
        <Typography variant="h6" gutterBottom>
          Booking Summary
        </Typography>
        
        <Paper sx={{ p: 3, mb: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <CalendarToday sx={{ mr: 1, color: 'text.secondary' }} />
                <Box>
                  <Typography variant="body2" color="text.secondary">Date</Typography>
                  <Typography variant="body1">
                    {dayjs(selectedDate).format('dddd, MMMM D, YYYY')}
                  </Typography>
                </Box>
              </Box>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Schedule sx={{ mr: 1, color: 'text.secondary' }} />
                <Box>
                  <Typography variant="body2" color="text.secondary">Time</Typography>
                  <Typography variant="body1">
                    {availableSlots.find(slot => slot.time === selectedSlot)?.label}
                  </Typography>
                </Box>
              </Box>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Stars sx={{ mr: 1, color: 'text.secondary' }} />
                <Box>
                  <Typography variant="body2" color="text.secondary">Package</Typography>
                  <Typography variant="body1">{selectedPkg?.name}</Typography>
                </Box>
              </Box>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Payment sx={{ mr: 1, color: 'text.secondary' }} />
                <Box>
                  <Typography variant="body2" color="text.secondary">Amount</Typography>
                  <Typography variant="h6" color="primary">
                    ₹{selectedPkg?.price.toLocaleString()}
                  </Typography>
                </Box>
              </Box>
            </Grid>
            
            <Grid item xs={12}>
              <Typography variant="body2" color="text.secondary">Consultation Type</Typography>
              <Typography variant="body1">{selectedConsultation?.name}</Typography>
            </Grid>
          </Grid>
        </Paper>

        <Alert severity="info" sx={{ mb: 3 }}>
          <Typography variant="body2">
            <strong>Cancellation Policy:</strong> You can cancel your appointment up to 2 hours before the scheduled time for a full refund.
          </Typography>
        </Alert>
      </Box>
    );
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return renderDateTimeStep();
      case 1:
        return renderPackageStep();
      case 2:
        return renderQuestionsStep();
      case 3:
        return renderSummary();
      default:
        return 'Unknown step';
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" align="center" gutterBottom>
        Book Your Consultation
      </Typography>
      <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 4 }}>
        Schedule a personalized astrology session with our expert
      </Typography>

      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Paper sx={{ p: 4 }}>
        {getStepContent(activeStep)}
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            variant="outlined"
          >
            Back
          </Button>
          
          {activeStep === steps.length - 1 ? (
            <Button
              variant="contained"
              onClick={handleBooking}
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} /> : <CheckCircle />}
              size="large"
            >
              {loading ? 'Processing...' : 'Confirm Booking'}
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={handleNext}
              disabled={!validateStep(activeStep)}
              size="large"
            >
              Next
            </Button>
          )}
        </Box>
      </Paper>

      {/* Payment Modal Component */}
      <PaymentModal
        open={paymentModalOpen}
        onClose={() => setPaymentModalOpen(false)}
        appointment={currentAppointment}
        onPaymentSuccess={handlePaymentSuccess}
      />
    </Container>
  );
};

export default Booking;
