import React from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Avatar,
  Chip,
  useTheme,
  Paper,
  Rating,
  Stack,
  Divider,
} from '@mui/material';
import {
  Stars,
  Schedule,
  VideoCall,
  Payment,
  Security,
  Support,
  School,
  EmojiEvents,
  Psychology,
  AutoAwesome,
  TrendingUp,
  CheckCircle,
} from '@mui/icons-material';
import { SERVICE_PACKAGES } from '../utils/constants';

const Home = () => {
  const theme = useTheme();

  const features = [
    {
      icon: <Schedule />,
      title: 'Flexible ',
      description: 'Book sessions from 5 PM to 8 PM, Monday to Saturday'
    },
    {
      icon: <VideoCall />,
      title: 'HD Video Consultations',
      description: 'Crystal clear video calls for personalized readings'
    },
    {
      icon: <School />,
      title: '20+ Years Experience',
      description: 'Expert guidance from a qualified Jyotirvid with deep knowledge'
    },
    {
      icon: <Psychology />,
      title: 'Technical Approach',
      description: 'Scientific and systematic analysis of your birth chart'
    },
    {
      icon: <Security />,
      title: 'Privacy Protected',
      description: 'Your personal information is completely confidential'
    },
    {
      icon: <Support />,
      title: 'Complete Support',
      description: 'Comprehensive guidance with remedies and solutions'
    }
  ];

  const specializations = [
    'Birth Chart Analysis',
    'Career Guidance',
    'Marriage & Relationships',
    'Health Predictions',
    'Financial Astrology',
    'Gem & Color Therapy',
    'Muhurta (Timing)',
    'Match-making',
    'Business Success',
    'Yearly Predictions'
  ];

  const testimonials = [
    {
      name: 'Rajesh Kumar',
      rating: 5,
      text: 'Kuldeep ji\'s predictions about my career change were incredibly accurate. His technical approach to astrology is amazing.',
      location: 'Delhi'
    },
    {
      name: 'Priya Sharma',
      rating: 5,
      text: 'The marriage compatibility analysis was spot on. Thank you for guiding us to a happy married life.',
      location: 'Mumbai'
    },
    {
      name: 'Amit Patel',
      rating: 5,
      text: 'His business guidance helped me make the right decisions. The remedies he suggested really worked!',
      location: 'Ahmedabad'
    }
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #1a237e 0%, #3949ab 50%, #7986cb 100%)',
          color: 'white',
          py: 12,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Chip
                label="🏆 20+ Years Experience"
                sx={{
                  mb: 3,
                  bgcolor: 'rgba(255, 193, 7, 0.2)',
                  color: '#ffc107',
                  fontWeight: 600
                }}
              />
              <Typography
                variant="h1"
                component="h1"
                sx={{
                  fontSize: { xs: '2.5rem', md: '4rem' },
                  fontWeight: 800,
                  mb: 3,
                  lineHeight: 1.1
                }}
              >
                Discover Your
                <Box component="span" sx={{ color: '#ffc107', display: 'block' }}>
                  Cosmic Destiny
                </Box>
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  mb: 4,
                  opacity: 0.95,
                  fontWeight: 400,
                  lineHeight: 1.6
                }}
              >
                Get authentic Vedic astrology consultations from <strong>Jyotirvid Kuldeep Paliwal</strong> - 
                A technical astrologer with engineering precision and ancient wisdom.
              </Typography>
              
              <Stack direction="row" spacing={2} sx={{ mb: 4 }}>
                <Chip icon={<School />} label="B.Tech + MBA Qualified" variant="outlined" sx={{ color: 'white', borderColor: 'white' }} />
                <Chip icon={<EmojiEvents />} label="Jyotish Ratna" variant="outlined" sx={{ color: 'white', borderColor: 'white' }} />
              </Stack>

              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button
                  component={Link}
                  to="/register"
                  variant="contained"
                  size="large"
                  sx={{
                    bgcolor: '#ffc107',
                    color: 'black',
                    fontWeight: 700,
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    '&:hover': {
                      bgcolor: '#ffb300',
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  Book Consultation Now
                </Button>
                <Button
                  component={Link}
                  to="/about"
                  variant="outlined"
                  size="large"
                  sx={{
                    borderColor: 'white',
                    color: 'white',
                    fontWeight: 600,
                    px: 4,
                    py: 1.5,
                    '&:hover': {
                      borderColor: '#ffc107',
                      color: '#ffc107',
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  Learn About Kuldeep Ji
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  textAlign: 'center',
                  position: 'relative',
                }}
              >
                <Paper
                  elevation={8}
                  sx={{
                    p: 3,
                    borderRadius: 4,
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)'
                  }}
                >
                  <Avatar
                    sx={{
                      width: 120,
                      height: 120,
                      mx: 'auto',
                      mb: 2,
                      bgcolor: '#ffc107',
                      fontSize: '3rem'
                    }}
                  >
                    KP
                  </Avatar>
                  <Typography variant="h5" fontWeight={600} gutterBottom>
                    Jyotirvid Kuldeep Paliwal
                  </Typography>
                  <Typography variant="body1" sx={{ opacity: 0.9, mb: 2 }}>
                    Technical Astrologer & Astronomer
                  </Typography>
                  <Stack direction="row" spacing={1} justifyContent="center" flexWrap="wrap">
                    <Chip label="Jyotish Ratna" size="small" sx={{ bgcolor: '#ffc107', color: 'black' }} />
                    <Chip label="B.Tech CSE" size="small" sx={{ bgcolor: '#4caf50', color: 'white' }} />
                    <Chip label="MBA" size="small" sx={{ bgcolor: '#2196f3', color: 'white' }} />
                  </Stack>
                </Paper>
              </Box>
            </Grid>
          </Grid>
        </Container>

        {/* Floating stars animation */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            overflow: 'hidden',
            pointerEvents: 'none',
          }}
        >
          {[...Array(20)].map((_, i) => (
            <Box
              key={i}
              sx={{
                position: 'absolute',
                width: 3,
                height: 3,
                bgcolor: '#ffc107',
                borderRadius: '50%',
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `twinkle ${2 + Math.random() * 3}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            />
          ))}
        </Box>
      </Box>

      {/* Expertise Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography
          variant="h2"
          align="center"
          sx={{
            mb: 2,
            fontSize: { xs: '2rem', md: '2.5rem' },
            fontWeight: 700,
            color: 'primary.main'
          }}
        >
          Areas of Expertise
        </Typography>
        <Typography
          variant="h6"
          align="center"
          color="text.secondary"
          sx={{ mb: 6, maxWidth: 800, mx: 'auto' }}
        >
          Comprehensive astrological services combining ancient Vedic wisdom with modern technical analysis
        </Typography>

        <Grid container spacing={3}>
          {specializations.map((specialization, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Paper
                elevation={2}
                sx={{
                  p: 2,
                  textAlign: 'center',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 6,
                    bgcolor: 'primary.light',
                    color: 'white'
                  }
                }}
              >
                <Typography variant="body1" fontWeight={500}>
                  {specialization}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Service Packages Section */}
      <Box sx={{ bgcolor: 'background.default', py: 8 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            align="center"
            sx={{
              mb: 2,
              fontSize: { xs: '2rem', md: '2.5rem' },
              fontWeight: 700
            }}
          >
            Consultation Packages
          </Typography>
          <Typography
            variant="h6"
            align="center"
            color="text.secondary"
            sx={{ mb: 6, maxWidth: 600, mx: 'auto' }}
          >
            Choose the perfect consultation package tailored to your needs
          </Typography>
          <Grid container spacing={4}>
            {SERVICE_PACKAGES.map((pkg, index) => (
              <Grid item xs={12} md={4} key={pkg.id}>
                <Card
                  sx={{
                    height: '100%',
                    position: 'relative',
                    border: index === 1 ? 3 : 1,
                    borderColor: index === 1 ? 'primary.main' : 'divider',
                    transform: index === 1 ? 'scale(1.05)' : 'scale(1)',
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: index === 1 ? 'scale(1.08)' : 'scale(1.03)',
                      boxShadow: 12,
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
                    <Typography variant="h4" component="h3" gutterBottom fontWeight={700} color="primary.main">
                      {pkg.name}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                      {pkg.description}
                    </Typography>
                    <Typography variant="h2" component="div" sx={{ mb: 1, color: 'success.main' }}>
                      ₹{pkg.price.toLocaleString()}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                      {pkg.duration} minutes detailed session
                    </Typography>
                    
                    <Box sx={{ textAlign: 'left', mb: 4 }}>
                      {pkg.features.map((feature, i) => (
                        <Box key={i} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <CheckCircle sx={{ color: 'success.main', mr: 1, fontSize: 20 }} />
                          <Typography variant="body2">
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
                        ...(index === 1 && {
                          bgcolor: 'primary.main',
                          '&:hover': { bgcolor: 'primary.dark' }
                        })
                      }}
                    >
                      Choose This Package
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography
          variant="h2"
          align="center"
          sx={{
            mb: 6,
            fontSize: { xs: '2rem', md: '2.5rem' },
            fontWeight: 700
          }}
        >
          Why Choose Jyotirvid Kuldeep Paliwal?
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  height: '100%',
                  textAlign: 'center',
                  p: 3,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: 8,
                    bgcolor: 'primary.light',
                    color: 'white',
                    '& .feature-icon': {
                      color: 'white !important'
                    }
                  },
                }}
              >
                <Avatar
                  className="feature-icon"
                  sx={{
                    bgcolor: 'primary.light',
                    color: 'primary.main',
                    width: 70,
                    height: 70,
                    mx: 'auto',
                    mb: 3,
                    transition: 'all 0.3s ease'
                  }}
                >
                  {feature.icon}
                </Avatar>
                <Typography variant="h5" component="h3" gutterBottom fontWeight={600}>
                  {feature.title}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {feature.description}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Testimonials */}
      <Box sx={{ bgcolor: 'background.default', py: 8 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            align="center"
            sx={{
              mb: 6,
              fontSize: { xs: '2rem', md: '2.5rem' },
              fontWeight: 700
            }}
          >
            Client Testimonials
          </Typography>
          <Grid container spacing={4}>
            {testimonials.map((testimonial, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card sx={{ height: '100%', p: 3 }}>
                  <Rating value={testimonial.rating} readOnly sx={{ mb: 2 }} />
                  <Typography variant="body1" sx={{ mb: 2, fontStyle: 'italic' }}>
                    "{testimonial.text}"
                  </Typography>
                  <Typography variant="subtitle1" fontWeight={600}>
                    - {testimonial.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {testimonial.location}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #1a237e 0%, #3949ab 100%)',
          color: 'white',
          py: 10,
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <AutoAwesome sx={{ fontSize: 60, mb: 2, color: '#ffc107' }} />
          <Typography
            variant="h3"
            component="h2"
            gutterBottom
            sx={{ fontSize: { xs: '2rem', md: '3rem' }, fontWeight: 700 }}
          >
            Ready to Transform Your Life?
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
            Join thousands of satisfied clients who have found clarity and direction through 
            Kuldeep ji's expert astrological guidance
          </Typography>
          
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center" sx={{ mb: 4 }}>
            <Chip icon={<TrendingUp />} label="20+ Years Experience" sx={{ bgcolor: '#4caf50', color: 'white' }} />
            <Chip icon={<Stars />} label="Technical Approach" sx={{ bgcolor: '#ff9800', color: 'white' }} />
            <Chip icon={<Security />} label="100% Confidential" sx={{ bgcolor: '#9c27b0', color: 'white' }} />
          </Stack>

          <Button
            component={Link}
            to="/register"
            variant="contained"
            size="large"
            sx={{
              bgcolor: '#ffc107',
              color: 'black',
              fontWeight: 700,
              px: 6,
              py: 2,
              fontSize: '1.2rem',
              '&:hover': {
                bgcolor: '#ffb300',
                transform: 'scale(1.05)',
              },
              transition: 'all 0.3s ease'
            }}
          >
            Book Your Consultation Today
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

// Add keyframes for animations
const style = document.createElement('style');
style.textContent = `
  @keyframes twinkle {
    0%, 100% { opacity: 0; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.5); }
  }
  @keyframes pulse {
    0%, 100% { opacity: 0.3; }
    50% { opacity: 0.8; }
  }
`;
document.head.appendChild(style);

export default Home;
