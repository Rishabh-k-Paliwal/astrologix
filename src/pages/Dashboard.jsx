import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Avatar,
  Chip,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Paper,
  Alert,
  CircularProgress,
} from '@mui/material';
import {
  CalendarToday,
  VideoCall,
  Payment,
  Star,
  Schedule,
  AccountCircle,
  Add,
  History,
  TrendingUp,
  AccessTime,
  CheckCircle,
} from '@mui/icons-material';
import { toast } from 'react-toastify';
import api from '../services/api';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  
  const [dashboardData, setDashboardData] = useState({
    stats: {},
    recentAppointments: [],
    nextAppointment: null
  });
  const [loading, setLoading] = useState(true);

  // Fetch dashboard data on component mount
  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      // Fixed: Use correct endpoint that matches your backend
      const response = await api.get('/user/dashboard');
      if (response.data.success) {
        setDashboardData({
          stats: response.data.data.stats || {},
          recentAppointments: response.data.data.recentAppointments || [],
          nextAppointment: response.data.data.nextAppointment
        });
      }
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
      toast.error('Failed to load dashboard data');
      // Set default values to prevent undefined errors
      setDashboardData({
        stats: {
          totalAppointments: 0,
          upcomingAppointments: 0,
          completedAppointments: 0,
          cancelledAppointments: 0
        },
        recentAppointments: [],
        nextAppointment: null
      });
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    {
      title: 'Total Consultations',
      value: dashboardData.stats.totalAppointments || 0,
      icon: <VideoCall />,
      color: 'primary',
      subtitle: 'All time'
    },
    {
      title: 'Amount Spent',
      value: `₹${(dashboardData.stats.totalSpent || 0).toLocaleString()}`,
      icon: <Payment />,
      color: 'success',
      subtitle: 'Total investment'
    },
    {
      title: 'Upcoming Sessions',
      value: dashboardData.stats.upcomingAppointments || 0,
      icon: <Schedule />,
      color: 'warning',
      subtitle: 'This month'
    },
    {
      title: 'Completed',
      value: dashboardData.stats.completedAppointments || 0,
      icon: <CheckCircle />,
      color: 'info',
      subtitle: 'Sessions done'
    }
  ];

  const quickActions = [
    {
      title: 'Book New Consultation',
      description: 'Schedule your next astrology session',
      icon: <Add />,
      color: 'primary',
      action: '/booking'
    },
    {
      title: 'View Appointments',
      description: 'Check your upcoming and past sessions',
      icon: <CalendarToday />,
      color: 'secondary',
      action: '/my-appointments'
    },
    {
      title: 'Payment History',
      description: 'View your transaction history',
      icon: <Payment />,
      color: 'success',
      action: '/payment-history'
    },
    {
      title: 'Update Profile',
      description: 'Manage your personal information',
      icon: <AccountCircle />,
      color: 'info',
      action: '/profile'
    }
  ];

  const getActivityIcon = (type) => {
    switch (type) {
      case 'appointment': return <VideoCall color="primary" />;
      case 'payment': return <Payment color="success" />;
      case 'booking': return <CalendarToday color="info" />;
      default: return <Schedule color="default" />;
    }
  };

  const getStatusChip = (status) => {
    const statusMap = {
      completed: { color: 'success', label: 'Completed' },
      confirmed: { color: 'primary', label: 'Confirmed' },
      pending: { color: 'warning', label: 'Pending' },
      cancelled: { color: 'error', label: 'Cancelled' }
    };
    
    const config = statusMap[status] || { color: 'default', label: status };
    return <Chip label={config.label} color={config.color} size="small" variant="outlined" />;
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4, textAlign: 'center' }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading dashboard...
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Welcome Section */}
      <Box sx={{ mb: 4 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            <Avatar
              sx={{
                width: 80,
                height: 80,
                bgcolor: 'primary.main',
                fontSize: '2rem'
              }}
            >
              {(user?.firstName?.[0] || 'U')}{(user?.lastName?.[0] || '')}
            </Avatar>
          </Grid>
          <Grid item xs>
            <Typography variant="h4" component="h1" gutterBottom>
              Welcome back, {user?.firstName || 'User'}!
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              {user?.email}
            </Typography>
            <Chip
              label={user?.role === 'client' ? 'Valued Client' : user?.role || 'Member'}
              color="primary"
              variant="outlined"
              icon={<Star />}
            />
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              size="large"
              startIcon={<Add />}
              component={Link}
              to="/booking"
              sx={{ mr: 1 }}
            >
              Book Consultation
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ height: '100%', transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-4px)' } }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar
                    sx={{
                      bgcolor: `${stat.color}.light`,
                      color: `${stat.color}.main`,
                      width: 48,
                      height: 48,
                      mr: 2
                    }}
                  >
                    {stat.icon}
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h4" component="div" fontWeight={700}>
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {stat.title}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {stat.subtitle}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={4}>
        {/* Quick Actions */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="h2" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                <TrendingUp sx={{ mr: 1 }} />
                Quick Actions
              </Typography>
              <Grid container spacing={2}>
                {quickActions.map((action, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <Card
                      variant="outlined"
                      sx={{
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: 4,
                          borderColor: `${action.color}.main`
                        }
                      }}
                      component={Link}
                      to={action.action}
                      style={{ textDecoration: 'none' }}
                    >
                      <CardContent sx={{ p: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                          <Avatar
                            sx={{
                              bgcolor: `${action.color}.light`,
                              color: `${action.color}.main`,
                              width: 40,
                              height: 40,
                              mr: 2,
                              mt: 0.5
                            }}
                          >
                            {action.icon}
                          </Avatar>
                          <Box>
                            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                              {action.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {action.description}
                            </Typography>
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>

          {/* Profile Completion */}
          <Card sx={{ mt: 3 }}>
            <CardContent>
              <Typography variant="h6" component="h2" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                <AccountCircle sx={{ mr: 1 }} />
                Profile Completion
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">
                    Complete your profile for better consultations
                  </Typography>
                  <Typography variant="body2" color="text.secondary" fontWeight={600}>
                    85%
                  </Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={85} 
                  sx={{ height: 8, borderRadius: 5 }}
                />
              </Box>
              <Alert severity="info" sx={{ mb: 2 }}>
                Add your birth details and preferences to get personalized insights
              </Alert>
              <Button
                component={Link}
                to="/profile"
                variant="outlined"
                startIcon={<AccountCircle />}
              >
                Complete Profile
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Activity & Next Appointment */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="h2" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                <History sx={{ mr: 1 }} />
                Recent Activity
              </Typography>
              
              {dashboardData.recentAppointments.length > 0 ? (
                <List dense>
                  {dashboardData.recentAppointments.slice(0, 3).map((activity, index) => (
                    <React.Fragment key={activity._id || index}>
                      <ListItem alignItems="flex-start" sx={{ px: 0 }}>
                        <ListItemIcon sx={{ mt: 1 }}>
                          {getActivityIcon('appointment')}
                        </ListItemIcon>
                        <ListItemText
                          primary={activity.consultationType || 'Consultation'}
                          secondary={
                            <>
                              <Typography variant="body2" component="span">
                                {activity.package} - ₹{activity.amount}
                              </Typography>
                              <br />
                              <Typography variant="caption" color="text.secondary">
                                {new Date(activity.appointmentDate).toLocaleDateString()}
                              </Typography>
                            </>
                          }
                        />
                        {getStatusChip(activity.status)}
                      </ListItem>
                      {index < Math.min(dashboardData.recentAppointments.length - 1, 2) && <Divider component="li" />}
                    </React.Fragment>
                  ))}
                </List>
              ) : (
                <Box sx={{ textAlign: 'center', py: 3 }}>
                  <History sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                  <Typography variant="body2" color="text.secondary">
                    No recent activity
                  </Typography>
                </Box>
              )}
              
              <Button
                component={Link}
                to="/my-appointments"
                variant="text"
                endIcon={<History />}
                fullWidth
                sx={{ mt: 2 }}
              >
                View All Activity
              </Button>
            </CardContent>
          </Card>

          {/* Next Appointment */}
          <Card sx={{ mt: 3 }}>
            <CardContent>
              <Typography variant="h6" component="h2" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                <AccessTime sx={{ mr: 1 }} />
                Next Appointment
              </Typography>
              
              {dashboardData.nextAppointment ? (
                <Paper sx={{ p: 2, bgcolor: 'primary.light', color: 'primary.contrastText' }}>
                  <Typography variant="h6" gutterBottom>
                    {dashboardData.nextAppointment.consultationType}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    {new Date(dashboardData.nextAppointment.appointmentDate).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    {dashboardData.nextAppointment.appointmentTime}
                  </Typography>
                  
                  {/* Join Meeting Button for confirmed appointments */}
                  {dashboardData.nextAppointment.status === 'confirmed' && (
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<VideoCall />}
                      onClick={() => navigate(`/video-call/${dashboardData.nextAppointment._id}`)}
                      fullWidth
                      sx={{ mb: 1 }}
                    >
                      Join Consultation
                    </Button>
                  )}
                  
                  <Button
                    component={Link}
                    to={`/my-appointments`}
                    variant="outlined"
                    fullWidth
                    size="small"
                  >
                    View Details
                  </Button>
                </Paper>
              ) : (
                <Box sx={{ textAlign: 'center', py: 3 }}>
                  <CalendarToday sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                  <Typography variant="body1" color="text.secondary" gutterBottom>
                    No upcoming appointments
                  </Typography>
                  <Button
                    component={Link}
                    to="/booking"
                    variant="contained"
                    startIcon={<Add />}
                  >
                    Book Consultation
                  </Button>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
