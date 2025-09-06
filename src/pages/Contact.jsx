import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Stack,
  Chip,
  Alert,
  CircularProgress
} from '@mui/material';
import {
  Email,
  Phone,
  Schedule,
  LocationOn,
  Send,
  Security,
  VideoCall,
  Assignment,
  Star,
  CheckCircle,
  Info
} from '@mui/icons-material';
import { toast } from 'react-toastify';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    consultationType: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate form submission
    setTimeout(() => {
      setLoading(false);
      toast.success('Your message has been sent successfully! We will contact you soon.');
      setFormData({ name: '', email: '', phone: '', consultationType: '', message: '' });
    }, 2000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const consultationModes = [
    {
      icon: <VideoCall />,
      title: 'Video Consultation',
      description: 'HD video calls for detailed face-to-face interaction',
      features: ['Clear video quality', 'Screen sharing for charts', 'Record session (optional)', 'Most recommended']
    },
    {
      icon: <Phone />,
      title: 'Phone Consultation',
      description: 'Voice-only consultation for convenience',
      features: ['Crystal clear audio', 'Flexible timing', 'No internet required', 'Traditional approach']
    },
    {
      icon: <Email />,
      title: 'Email Consultation',
      description: 'Detailed written analysis and predictions',
      features: ['Comprehensive report', 'Reference document', 'Take your time to read', 'Permanent record']
    }
  ];

  const requiredInfo = [
    { field: 'Full Name', description: 'As per official documents' },
    { field: 'Gender', description: 'Male/Female/Other' },
    { field: 'Date of Birth', description: 'DD/MM/YYYY format (mention both dates if born at night)' },
    { field: 'Time of Birth', description: 'Exact time in HH:MM format' },
    { field: 'Place of Birth', description: 'City, State, Country' },
    { field: 'Current Location', description: 'Present city of residence' },
    { field: 'Contact Details', description: 'Phone number and email address' },
    { field: 'Specific Questions', description: 'Areas you want guidance on (if any)' }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      {/* Hero Section */}
      <Box sx={{ textAlign: 'center', mb: 8 }}>
        <Typography variant="h2" component="h1" gutterBottom fontWeight={700}>
          Get In Touch
        </Typography>
        <Typography variant="h5" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto', mb: 4 }}>
          Ready to discover your cosmic path? Connect with Jyotirvid Kuldeep Paliwal 
          for authentic Vedic astrology guidance
        </Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
          <Chip icon={<Schedule />} label="Available Mon-Sat, 5 PM - 8 PM" color="primary" size="large" />
          <Chip icon={<Security />} label="100% Confidential" color="success" size="large" />
        </Stack>
      </Box>

      <Grid container spacing={6}>
        {/* Contact Information */}
        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom fontWeight={600} color="primary.main">
            Contact Information
          </Typography>
          
          <Card sx={{ mb: 4 }}>
            <CardContent sx={{ p: 3 }}>
              <List>
                <ListItem sx={{ px: 0 }}>
                  <ListItemIcon>
                    <Email color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Email Address"
                    secondary="Jyotirvid.kp@gmail.com"
                    primaryTypographyProps={{ fontWeight: 600 }}
                  />
                </ListItem>
                <Divider />
                <ListItem sx={{ px: 0 }}>
                  <ListItemIcon>
                    <Schedule color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Consultation Hours"
                    secondary="Monday to Saturday: 5:00 PM - 8:00 PM (IST)"
                    primaryTypographyProps={{ fontWeight: 600 }}
                  />
                </ListItem>
                <Divider />
                <ListItem sx={{ px: 0 }}>
                  <ListItemIcon>
                    <LocationOn color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Service Area"
                    secondary="Online Consultations Available Worldwide"
                    primaryTypographyProps={{ fontWeight: 600 }}
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>

          {/* Consultation Modes */}
          <Typography variant="h5" gutterBottom fontWeight={600}>
            Consultation Modes
          </Typography>
          {consultationModes.map((mode, index) => (
            <Card key={index} sx={{ mb: 2, border: '1px solid', borderColor: 'divider' }}>
              <CardContent sx={{ p: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                  <Box sx={{ mr: 2, mt: 0.5 }}>
                    {mode.icon}
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" gutterBottom fontWeight={600}>
                      {mode.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {mode.description}
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {mode.features.map((feature, i) => (
                        <Chip 
                          key={i} 
                          label={feature} 
                          size="small" 
                          variant="outlined" 
                          color={i === 3 ? 'primary' : 'default'}
                        />
                      ))}
                    </Box>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Grid>

        {/* Quick Contact Form */}
        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom fontWeight={600} color="primary.main">
            Quick Inquiry
          </Typography>
          
          <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email Address"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    select
                    label="Consultation Type"
                    name="consultationType"
                    value={formData.consultationType}
                    onChange={handleChange}
                    SelectProps={{ native: true }}
                  >
                    <option value="">Select consultation type</option>
                    <option value="birth-chart">Birth Chart Analysis</option>
                    <option value="career">Career Guidance</option>
                    <option value="marriage">Marriage & Relationships</option>
                    <option value="health">Health Predictions</option>
                    <option value="financial">Financial Astrology</option>
                    <option value="general">General Consultation</option>
                    <option value="other">Other</option>
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="Your Message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your specific questions or concerns..."
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    fullWidth
                    disabled={loading}
                    startIcon={loading ? <CircularProgress size={20} /> : <Send />}
                    sx={{ py: 1.5, fontSize: '1.1rem', fontWeight: 600 }}
                  >
                    {loading ? 'Sending Message...' : 'Send Message'}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>

          <Alert severity="info" sx={{ mb: 3 }}>
            <Typography variant="body2">
              For detailed consultation booking, please use our online booking system or 
              email us directly with your complete birth details.
            </Typography>
          </Alert>
        </Grid>
      </Grid>

      {/* Required Information */}
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" align="center" gutterBottom fontWeight={600}>
          Information Required for Consultation
        </Typography>
        <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 4, maxWidth: 800, mx: 'auto' }}>
          To provide accurate predictions and guidance, please ensure you have the following information ready. 
          <strong> Accuracy of prediction depends on the accuracy of data provided.</strong>
        </Typography>

        <Grid container spacing={3}>
          {requiredInfo.map((info, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ height: '100%', border: '1px solid', borderColor: 'divider' }}>
                <CardContent sx={{ p: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                    <Assignment sx={{ color: 'primary.main', mr: 1, mt: 0.5 }} />
                    <Box>
                      <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                        {info.field}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {info.description}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Important Notes */}
      <Paper 
        elevation={3}
        sx={{ 
          p: 4, 
          mt: 6,
          background: 'linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%)',
          border: '1px solid',
          borderColor: 'warning.light'
        }}
      >
        <Typography variant="h5" gutterBottom fontWeight={600} color="warning.dark">
          ⚠️ Important Guidelines
        </Typography>
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <List>
              <ListItem sx={{ px: 0 }}>
                <ListItemIcon>
                  <Security color="warning" />
                </ListItemIcon>
                <ListItemText
                  primary="Complete Confidentiality"
                  secondary="All personal data and consultations are kept strictly confidential"
                  primaryTypographyProps={{ fontWeight: 600 }}
                />
              </ListItem>
              <ListItem sx={{ px: 0 }}>
                <ListItemIcon>
                  <CheckCircle color="success" />
                </ListItemIcon>
                <ListItemText
                  primary="Genuine Data Only"
                  secondary="Wrong or fake data leads to inaccurate predictions"
                  primaryTypographyProps={{ fontWeight: 600 }}
                />
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12} md={6}>
            <List>
              <ListItem sx={{ px: 0 }}>
                <ListItemIcon>
                  <Info color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="Night Birth Special Note"
                  secondary="If born at night, please mention both dates (before and after midnight)"
                  primaryTypographyProps={{ fontWeight: 600 }}
                />
              </ListItem>
              <ListItem sx={{ px: 0 }}>
                <ListItemIcon>
                  <Star color="secondary" />
                </ListItemIcon>
                <ListItemText
                  primary="Professional Ethics"
                  secondary="All consultations follow traditional astrological ethics and guidelines"
                  primaryTypographyProps={{ fontWeight: 600 }}
                />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Paper>

      {/* Call to Action */}
      <Box sx={{ textAlign: 'center', py: 6 }}>
        <Typography variant="h4" gutterBottom fontWeight={600}>
          Ready to Begin Your Astrological Journey?
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 600, mx: 'auto' }}>
          Take the first step towards understanding your cosmic blueprint and life path. 
          Book your consultation with Jyotirvid Kuldeep Paliwal today.
        </Typography>
        
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
          <Button
            variant="contained"
            size="large"
            sx={{ px: 4, py: 1.5, fontSize: '1.1rem', fontWeight: 600 }}
            onClick={() => window.location.href = 'mailto:Jyotirvid.kp@gmail.com'}
          >
            Email Direct
          </Button>
          <Button
            variant="outlined"
            size="large"
            sx={{ px: 4, py: 1.5, fontSize: '1.1rem', fontWeight: 600 }}
            href="/booking"
          >
            Book Online
          </Button>
        </Stack>
      </Box>
    </Container>
  );
};

export default Contact;
