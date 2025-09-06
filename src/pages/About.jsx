import React from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Avatar,
  Chip,
  Paper,
  Stack,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button
} from '@mui/material';
import {
  School,
  EmojiEvents,
  Star,
  Psychology,
  Engineering,
  Business,
  Visibility,
  Groups,
  CheckCircle,
  AutoAwesome,
  Timeline,
  Science
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

const About = () => {
  const qualifications = [
    { icon: <EmojiEvents />, title: 'Jyotish Ratna', description: 'Highest qualification in Vedic Astrology', color: '#ffd700' },
    { icon: <Star />, title: 'Jyotish Visarad', description: 'Advanced astrological studies', color: '#ff9800' },
    { icon: <AutoAwesome />, title: 'Jyotish Praveen', description: 'Foundational astrological certification', color: '#9c27b0' },
    { icon: <Engineering />, title: 'B.Tech (Hons) CSE', description: 'Computer Science & Engineering', color: '#2196f3' },
    { icon: <Business />, title: 'MBA Operations', description: 'Master of Business Administration', color: '#4caf50' },
    { icon: <Science />, title: 'Diploma Electronics', description: 'Electronics Engineering', color: '#ff5722' }
  ];

  const specializations = [
    'Sadabal - Planetary Strength Analysis',
    'Ashtakavarga - Predictive Astrology System',
    'Dasha Systems - Planetary Period Analysis',
    'Mathematical Calculations in Astrology',
    'Astronomical Calculations for Astrology',
    'Palmistry & Hand Analysis',
    'Numerology & Life Path Analysis',
    'Gem & Color Therapy',
    'Muhurta - Auspicious Timing',
    'Match-making & Compatibility'
  ];

  const programs = [
    {
      name: 'Aakash Darshan',
      description: 'Popular sky observation program for astronomy enthusiasts',
      audience: 'Sky Lovers & Astronomy Enthusiasts'
    },
    {
      name: 'Nabh Darshan',
      description: 'Star gazing experience designed for tourists',
      audience: 'Tourists & General Public'
    },
    {
      name: 'Aakash Awalokan',
      description: 'Educational astronomy program for students',
      audience: 'School Students & Educational Institutions'
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      {/* Hero Section */}
      <Box sx={{ textAlign: 'center', mb: 8 }}>
        <Avatar
          sx={{
            width: 150,
            height: 150,
            mx: 'auto',
            mb: 3,
            bgcolor: 'primary.main',
            fontSize: '4rem',
            fontWeight: 700
          }}
        >
          KP
        </Avatar>
        <Typography variant="h2" component="h1" gutterBottom fontWeight={700}>
          Jyotirvid Kuldeep Paliwal
        </Typography>
        <Typography variant="h5" color="primary.main" gutterBottom fontWeight={600}>
          Technical Astrologer & Astronomer
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto', mb: 4 }}>
          A dynamic astrologer with over 20 years of experience, combining ancient Vedic wisdom 
          with modern technical precision to provide authentic astrological guidance.
        </Typography>
        
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
          <Chip icon={<Timeline />} label="20+ Years Experience" color="primary" size="large" />
          <Chip icon={<Groups />} label="Thousands of Students Taught" color="secondary" size="large" />
          <Chip icon={<Star />} label="Technical Approach" color="success" size="large" />
        </Stack>
      </Box>

      {/* About Story */}
      <Grid container spacing={6} sx={{ mb: 8 }}>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom fontWeight={600} color="primary.main">
            The Journey of Excellence
          </Typography>
          <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.7 }}>
            Jyotirvid Kuldeep Paliwal is a distinguished astrologer and astronomer who has devoted over 
            two decades to mastering and teaching the ancient science of Vedic astrology. His unique 
            approach combines traditional astrological wisdom inherited from his grandparents with 
            modern technical precision gained through his engineering and management background.
          </Typography>
          <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.7 }}>
            What sets him apart is his ability to treat astrology as a technical subject while 
            implementing it as a practical science in daily life. His methodical approach has 
            helped thousands of students become established astrologers today.
          </Typography>
          <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.7 }}>
            Beyond astrology, he is among the few practitioners who possess deep ancient knowledge 
            of sky observation (Star Gazing) related to Indian Vedic Astrology, making him a 
            bridge between ancient wisdom and modern understanding.
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper 
            elevation={4}
            sx={{ 
              p: 4, 
              background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
              borderRadius: 3
            }}
          >
            <Typography variant="h5" gutterBottom fontWeight={600} color="primary.main">
              🎯 Mission & Vision
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>Mission:</strong> To provide accurate and beneficial knowledge of Vedic astrology 
              through technical analysis and scientific approach, helping individuals make informed 
              decisions about their life path.
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>Vision:</strong> To bridge the gap between ancient astrological wisdom and 
              modern scientific understanding, making astrology accessible and practical for 
              contemporary life challenges.
            </Typography>
            <Typography variant="body1">
              <strong>Philosophy:</strong> "Whether the field is technical, management, astrology, 
              or astronomy - believe only in PERFECT."
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Qualifications */}
      <Box sx={{ mb: 8 }}>
        <Typography variant="h4" align="center" gutterBottom fontWeight={600}>
          Educational Excellence & Qualifications
        </Typography>
        <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 4 }}>
          A unique combination of traditional astrological knowledge and modern academic achievements
        </Typography>
        
        <Grid container spacing={3}>
          {qualifications.map((qual, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card 
                sx={{ 
                  height: '100%',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: 6
                  }
                }}
              >
                <CardContent sx={{ textAlign: 'center', p: 3 }}>
                  <Avatar
                    sx={{
                      bgcolor: qual.color,
                      color: 'white',
                      width: 60,
                      height: 60,
                      mx: 'auto',
                      mb: 2
                    }}
                  >
                    {qual.icon}
                  </Avatar>
                  <Typography variant="h6" gutterBottom fontWeight={600}>
                    {qual.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {qual.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Areas of Expertise */}
      <Grid container spacing={6} sx={{ mb: 8 }}>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom fontWeight={600} color="primary.main">
            Areas of Specialization
          </Typography>
          <List>
            {specializations.map((item, index) => (
              <ListItem key={index} sx={{ px: 0 }}>
                <ListItemIcon>
                  <CheckCircle color="success" />
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
          <Typography variant="h4" gutterBottom fontWeight={600} color="primary.main">
            Astronomy Programs
          </Typography>
          <Typography variant="body1" paragraph color="text.secondary">
            Connecting people with the cosmos through educational and experiential programs:
          </Typography>
          {programs.map((program, index) => (
            <Card key={index} sx={{ mb: 2, border: '1px solid', borderColor: 'divider' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom color="primary.main" fontWeight={600}>
                  🌟 {program.name}
                </Typography>
                <Typography variant="body2" paragraph>
                  {program.description}
                </Typography>
                <Chip 
                  label={program.audience} 
                  size="small" 
                  color="primary" 
                  variant="outlined" 
                />
              </CardContent>
            </Card>
          ))}
        </Grid>
      </Grid>

      {/* Teaching Legacy */}
      <Paper 
        elevation={3}
        sx={{ 
          p: 6, 
          mb: 6,
          background: 'linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%)',
          borderRadius: 3
        }}
      >
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
            <Groups sx={{ fontSize: 80, color: 'primary.main', mb: 2 }} />
            <Typography variant="h3" fontWeight={700} color="primary.main">
              1000+
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Students Taught
            </Typography>
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography variant="h4" gutterBottom fontWeight={600}>
              Teaching Legacy & Impact
            </Typography>
            <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem' }}>
              Over his illustrious career, Kuldeep ji has taught astrology to thousands of students, 
              many of whom have become established and respected astrologers today. His teaching 
              methodology combines theoretical knowledge with practical applications, ensuring 
              students gain both depth and practical skills.
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '1.1rem' }}>
              His technical approach to astrology education has revolutionized how traditional 
              Vedic astrology is taught, making complex calculations and concepts accessible 
              to modern learners while maintaining the authenticity of ancient wisdom.
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      {/* Call to Action */}
      <Box sx={{ textAlign: 'center', py: 6 }}>
        <Typography variant="h4" gutterBottom fontWeight={600}>
          Experience the Perfect Blend of Ancient Wisdom & Modern Precision
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 4, maxWidth: 600, mx: 'auto' }}>
          Whether you seek guidance for career, relationships, health, or spiritual growth, 
          benefit from Kuldeep ji's 20+ years of experience and technical expertise.
        </Typography>
        
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
          <Button
            component={Link}
            to="/booking"
            variant="contained"
            size="large"
            sx={{ px: 4, py: 1.5, fontWeight: 600 }}
          >
            Book Consultation
          </Button>
          <Button
            component={Link}
            to="/services"
            variant="outlined"
            size="large"
            sx={{ px: 4, py: 1.5, fontWeight: 600 }}
          >
            View Services
          </Button>
        </Stack>
      </Box>
    </Container>
  );
};

export default About;
