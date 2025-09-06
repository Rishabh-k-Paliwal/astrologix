import React from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Stack,
  Avatar
} from '@mui/material';
import {
  Psychology,
  Business,
  Favorite,
  MonetizationOn,
  School,
  Schedule,
  Diamond,
  Star,
  TrendingUp,
  Group,
  ChildCare, // Changed from 'Baby' to 'ChildCare'
  CheckCircle,
  Timeline,
  ColorLens,
  Calculate
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { SERVICE_PACKAGES } from '../utils/constants';

const Services = () => {
  const consultationTypes = [
    {
      icon: <Psychology />,
      title: 'Birth Chart Analysis',
      description: 'Complete analysis of your natal chart with detailed predictions',
      features: ['Planetary positions analysis', 'Life path guidance', 'Strengths & challenges', 'Career indicators'],
      color: '#9c27b0'
    },
    {
      icon: <Business />,
      title: 'Career Guidance',
      description: 'Professional insights for career growth and business success',
      features: ['Career timing', 'Job change guidance', 'Business opportunities', 'Professional growth'],
      color: '#2196f3'
    },
    {
      icon: <Favorite />,
      title: 'Marriage & Relationships',
      description: 'Love, marriage compatibility and relationship guidance',
      features: ['Match-making analysis', 'Relationship compatibility', 'Marriage timing', 'Family harmony'],
      color: '#e91e63'
    },
    {
      icon: <MonetizationOn />,
      title: 'Financial Astrology',
      description: 'Money, wealth, investments and financial planning guidance',
      features: ['Wealth indicators', 'Investment timing', 'Financial planning', 'Stock market guidance'],
      color: '#4caf50'
    },
    {
      icon: <Favorite />,
      title: 'Health Predictions',
      description: 'Health-related astrological insights and preventive guidance',
      features: ['Health indicators', 'Preventive measures', 'Treatment timing', 'Lifestyle guidance'],
      color: '#ff9800'
    },
    {
      icon: <ChildCare />, // Fixed: Changed from Baby to ChildCare
      title: 'Child & Newborn',
      description: 'Guidance for children, naming ceremonies and educational choices',
      features: ['Name selection', 'Educational guidance', 'Child development', 'Future prospects'],
      color: '#795548'
    }
  ];

  const specialServices = [
    {
      icon: <Schedule />,
      title: 'Muhurta (Auspicious Timing)',
      description: 'Perfect timing for important life events and ceremonies',
      applications: ['Marriage ceremonies', 'Business launches', 'House warming', 'Travel dates']
    },
    {
      icon: <Group />,
      title: 'Match-making & Compatibility',
      description: 'Detailed compatibility analysis for marriage proposals',
      applications: ['Guna matching', 'Mangal dosha analysis', 'Future harmony', 'Family compatibility']
    },
    {
      icon: <Diamond />,
      title: 'Gem & Color Therapy',
      description: 'Gemstone recommendations based on planetary positions',
      applications: ['Gemstone selection', 'Color therapy', 'Metal recommendations', 'Wearing guidelines']
    },
    {
      icon: <TrendingUp />,
      title: 'Yearly Predictions',
      description: 'Comprehensive annual forecasts and monthly guidance',
      applications: ['Annual overview', 'Monthly predictions', 'Important dates', 'Remedial measures']
    }
  ];

  const technicalExpertise = [
    'Sadabal - Planetary Strength Calculations',
    'Ashtakavarga - Predictive System',
    'Dasha Systems - Planetary Periods',
    'Mathematical Astrology Calculations',
    'Astronomical Calculations',
    'Divisional Chart Analysis',
    'Transit Predictions',
    'Remedial Astrology'
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      {/* Hero Section */}
      <Box sx={{ textAlign: 'center', mb: 8 }}>
        <Typography variant="h2" component="h1" gutterBottom fontWeight={700}>
          Comprehensive Astrology Services
        </Typography>
        <Typography variant="h5" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto', mb: 4 }}>
          Experience authentic Vedic astrology consultations combining 20+ years of expertise 
          with technical precision and ancient wisdom
        </Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
          <Chip icon={<Star />} label="Technical Approach" color="primary" size="large" />
          <Chip icon={<CheckCircle />} label="20+ Years Experience" color="success" size="large" />
          <Chip icon={<Timeline />} label="Proven Results" color="secondary" size="large" />
        </Stack>
      </Box>

      {/* Service Packages */}
      <Box sx={{ mb: 10 }}>
        <Typography variant="h3" align="center" gutterBottom fontWeight={600} color="primary.main">
          Consultation Packages
        </Typography>
        <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 6, maxWidth: 600, mx: 'auto' }}>
          Choose from our carefully designed packages, each offering comprehensive guidance tailored to your needs
        </Typography>
        
        <Grid container spacing={4}>
          {SERVICE_PACKAGES.map((pkg, index) => (
            <Grid item xs={12} md={4} key={pkg.id}>
              <Card
                sx={{
                  height: '100%',
                  position: 'relative',
                  border: index === 1 ? 3 : 2,
                  borderColor: index === 1 ? 'primary.main' : 'divider',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: 8,
                  },
                }}
              >
                {index === 1 && (
                  <Chip
                    label="⭐ Most Popular"
                    color="primary"
                    sx={{
                      position: 'absolute',
                      top: -12,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      fontWeight: 700,
                      zIndex: 1
                    }}
                  />
                )}
                <CardContent sx={{ p: 4, textAlign: 'center' }}>
                  <Typography variant="h4" gutterBottom fontWeight={700} color="primary.main">
                    {pkg.name}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                    {pkg.description}
                  </Typography>
                  <Typography variant="h2" sx={{ mb: 1, color: 'success.main', fontWeight: 700 }}>
                    ₹{pkg.price.toLocaleString()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                    {pkg.duration} minutes detailed session
                  </Typography>
                  
                  <Box sx={{ textAlign: 'left', mb: 4 }}>
                    {pkg.features.map((feature, i) => (
                      <Box key={i} sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                        <CheckCircle sx={{ color: 'success.main', mr: 2, fontSize: 20 }} />
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {feature}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                  <Button
                    component={Link}
                    to="/register"
                    variant={index === 1 ? 'contained' : 'outlined'}
                    fullWidth
                    size="large"
                    sx={{ 
                      fontWeight: 600,
                      py: 1.5,
                      fontSize: '1.1rem'
                    }}
                  >
                    Select Package
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Consultation Types */}
      <Box sx={{ mb: 10 }}>
        <Typography variant="h3" align="center" gutterBottom fontWeight={600}>
          Areas of Consultation
        </Typography>
        <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 6, maxWidth: 700, mx: 'auto' }}>
          Comprehensive guidance across all aspects of life using authentic Vedic astrology principles
        </Typography>
        
        <Grid container spacing={4}>
          {consultationTypes.map((service, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card 
                sx={{ 
                  height: '100%',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 6,
                    borderColor: service.color,
                    borderWidth: 2,
                    borderStyle: 'solid'
                  }
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                    <Avatar
                      sx={{
                        bgcolor: service.color,
                        color: 'white',
                        width: 50,
                        height: 50,
                        mr: 2
                      }}
                    >
                      {service.icon}
                    </Avatar>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h5" gutterBottom fontWeight={600}>
                        {service.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" paragraph>
                        {service.description}
                      </Typography>
                    </Box>
                  </Box>
                  
                  <List dense>
                    {service.features.map((feature, i) => (
                      <ListItem key={i} sx={{ px: 0, py: 0.5 }}>
                        <ListItemIcon sx={{ minWidth: 30 }}>
                          <CheckCircle sx={{ fontSize: 16, color: service.color }} />
                        </ListItemIcon>
                        <ListItemText 
                          primary={feature}
                          primaryTypographyProps={{ variant: 'body2', fontWeight: 500 }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Special Services */}
      <Paper elevation={3} sx={{ p: 6, mb: 8, bgcolor: 'background.default' }}>
        <Typography variant="h3" align="center" gutterBottom fontWeight={600} color="primary.main">
          Specialized Services
        </Typography>
        <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 6, maxWidth: 600, mx: 'auto' }}>
          Advanced astrological services for specific needs and life events
        </Typography>
        
        <Grid container spacing={4}>
          {specialServices.map((service, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Avatar
                  sx={{
                    bgcolor: 'primary.main',
                    width: 60,
                    height: 60,
                    mx: 'auto',
                    mb: 2
                  }}
                >
                  {service.icon}
                </Avatar>
                <Typography variant="h5" gutterBottom fontWeight={600}>
                  {service.title}
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                  {service.description}
                </Typography>
                <Box sx={{ textAlign: 'left', maxWidth: 300, mx: 'auto' }}>
                  {service.applications.map((app, i) => (
                    <Box key={i} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Star sx={{ color: 'primary.main', mr: 1, fontSize: 16 }} />
                      <Typography variant="body2">{app}</Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* Technical Expertise */}
      <Grid container spacing={6} sx={{ mb: 8 }}>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom fontWeight={600} color="primary.main">
            Technical Expertise
          </Typography>
          <Typography variant="body1" paragraph color="text.secondary">
            Advanced astrological calculations and systems that ensure accuracy and depth in predictions:
          </Typography>
          <List>
            {technicalExpertise.map((item, index) => (
              <ListItem key={index} sx={{ px: 0 }}>
                <ListItemIcon>
                  <Calculate color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary={item}
                  primaryTypographyProps={{ fontWeight: 500 }}
                />
              </ListItem>
            ))}
          </List>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper 
            elevation={4}
            sx={{ 
              p: 4, 
              background: 'linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%)',
              borderRadius: 3,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}
          >
            <Typography variant="h4" gutterBottom fontWeight={600} color="success.dark">
              🎯 Our Commitment
            </Typography>
            <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem' }}>
              <strong>Accuracy:</strong> Using precise astronomical calculations and traditional methods 
              for accurate predictions and timing.
            </Typography>
            <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem' }}>
              <strong>Confidentiality:</strong> All consultations and personal data are kept strictly 
              confidential as per traditional ethics.
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '1.1rem' }}>
              <strong>Practical Solutions:</strong> Providing actionable remedies and guidance that 
              can be implemented in daily life.
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Process & Booking */}
      <Box sx={{ textAlign: 'center', py: 6 }}>
        <Typography variant="h3" gutterBottom fontWeight={600}>
          How It Works
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 6, maxWidth: 700, mx: 'auto' }}>
          Simple and straightforward process to get your astrological consultation
        </Typography>
        
        <Grid container spacing={4} sx={{ mb: 6 }}>
          {[
            { step: '1', title: 'Book Your Session', desc: 'Choose your preferred package and time slot' },
            { step: '2', title: 'Provide Birth Details', desc: 'Share accurate birth information for precise analysis' },
            { step: '3', title: 'Join Video Call', desc: 'Connect with Kuldeep ji for your consultation' },
            { step: '4', title: 'Receive Guidance', desc: 'Get detailed predictions and practical remedies' }
          ].map((item, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Box sx={{ textAlign: 'center' }}>
                <Avatar
                  sx={{
                    bgcolor: 'primary.main',
                    width: 60,
                    height: 60,
                    mx: 'auto',
                    mb: 2,
                    fontSize: '1.5rem',
                    fontWeight: 700
                  }}
                >
                  {item.step}
                </Avatar>
                <Typography variant="h6" gutterBottom fontWeight={600}>
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.desc}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
          <Button
            component={Link}
            to="/booking"
            variant="contained"
            size="large"
            sx={{ px: 6, py: 2, fontSize: '1.1rem', fontWeight: 600 }}
          >
            Book Consultation Now
          </Button>
          <Button
            component={Link}
            to="/contact"
            variant="outlined"
            size="large"
            sx={{ px: 6, py: 2, fontSize: '1.1rem', fontWeight: 600 }}
          >
            Have Questions?
          </Button>
        </Stack>
      </Box>
    </Container>
  );
};

export default Services;
