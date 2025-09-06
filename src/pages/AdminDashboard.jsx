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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  CircularProgress,
  Stack,
  Badge
} from '@mui/material';
import {
  CalendarToday,
  VideoCall,
  Person,
  CheckCircle,
  Schedule,
  Cancel,
  Edit,
  Visibility,
  NotificationsActive,
  Dashboard as DashboardIcon,
  TrendingUp
} from '@mui/icons-material';
import { toast } from 'react-toastify';
import api from '../services/api';

const AdminDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tabValue, setTabValue] = useState(0);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [detailsDialog, setDetailsDialog] = useState(false);
  const [stats, setStats] = useState({});

  useEffect(() => {
    fetchAppointments();
    fetchStats();
  }, []);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const response = await api.get('/admin/appointments');
      if (response.data.success) {
        setAppointments(response.data.data.appointments || []);
      }
    } catch (error) {
      console.error('Failed to fetch appointments:', error);
      toast.error('Failed to load appointments');
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await api.get('/admin/dashboard-stats');
      if (response.data.success) {
        setStats(response.data.data.stats || {});
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  };

  const updateAppointmentStatus = async (appointmentId, status) => {
    try {
      const response = await api.put(`/admin/appointments/${appointmentId}/status`, { status });
      if (response.data.success) {
        toast.success(`Appointment ${status} successfully`);
        fetchAppointments();
      }
    } catch (error) {
      toast.error('Failed to update appointment status');
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

  const filterAppointments = (status) => {
    const today = new Date();
    return appointments.filter(appointment => {
      const appointmentDate = new Date(appointment.appointmentDate);
      
      switch (status) {
        case 'today':
          return appointmentDate.toDateString() === today.toDateString();
        case 'upcoming':
          return appointmentDate > today && ['pending', 'confirmed'].includes(appointment.status);
        case 'pending':
          return appointment.status === 'pending';
        case 'completed':
          return appointment.status === 'completed';
        default:
          return true;
      }
    });
  };

  const tabLabels = ['All', 'Today', 'Upcoming', 'Pending', 'Completed'];

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading appointments...
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom fontWeight={700}>
          🌟 Jyotirvid Kuldeep Paliwal - Admin Dashboard
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Manage your astrology consultations and appointments
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {[
          { title: 'Today\'s Appointments', value: filterAppointments('today').length, icon: <CalendarToday />, color: 'primary' },
          { title: 'Pending Approvals', value: filterAppointments('pending').length, icon: <Schedule />, color: 'warning' },
          { title: 'This Month Revenue', value: `₹${(stats.monthlyRevenue || 0).toLocaleString()}`, icon: <TrendingUp />, color: 'success' },
          { title: 'Total Consultations', value: stats.totalAppointments || 0, icon: <CheckCircle />, color: 'info' }
        ].map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar
                    sx={{
                      bgcolor: `${stat.color}.light`,
                      color: `${stat.color}.main`,
                      width: 56,
                      height: 56,
                      mr: 2
                    }}
                  >
                    {stat.icon}
                  </Avatar>
                  <Box>
                    <Typography variant="h4" component="div" fontWeight={700}>
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {stat.title}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Tabs */}
      <Paper sx={{ mb: 3 }}>
        <Tabs
          value={tabValue}
          onChange={(e, newValue) => setTabValue(newValue)}
          variant="fullWidth"
          indicatorColor="primary"
        >
          {tabLabels.map((label, index) => (
            <Tab 
              key={index} 
              label={
                <Badge 
                  badgeContent={filterAppointments(['all', 'today', 'upcoming', 'pending', 'completed'][index]).length} 
                  color="primary"
                >
                  {label}
                </Badge>
              } 
            />
          ))}
        </Tabs>
      </Paper>

      {/* Appointments Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Client Details</TableCell>
              <TableCell>Date & Time</TableCell>
              <TableCell>Consultation Type</TableCell>
              <TableCell>Package</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filterAppointments(['all', 'today', 'upcoming', 'pending', 'completed'][tabValue]).map((appointment) => (
              <TableRow key={appointment._id} sx={{ '&:hover': { bgcolor: 'action.hover' } }}>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                      <Person />
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle2" fontWeight={600}>
                        {appointment.user?.firstName} {appointment.user?.lastName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {appointment.user?.email}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        📞 {appointment.user?.phone}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" fontWeight={600}>
                    📅 {new Date(appointment.appointmentDate).toLocaleDateString('en-IN', {
                      weekday: 'short',
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    ⏰ {appointment.appointmentTime}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" fontWeight={600}>
                    {appointment.consultationType}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip 
                    label={appointment.package} 
                    size="small" 
                    color="secondary"
                    variant="outlined"
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="h6" color="success.main" fontWeight={600}>
                    ₹{appointment.amount?.toLocaleString()}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {appointment.paymentStatus}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                    color={getStatusColor(appointment.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1}>
                    <Button
                      size="small"
                      startIcon={<Visibility />}
                      onClick={() => {
                        setSelectedAppointment(appointment);
                        setDetailsDialog(true);
                      }}
                    >
                      View
                    </Button>
                    
                    {appointment.status === 'pending' && (
                      <>
                        <Button
                          size="small"
                          variant="contained"
                          color="success"
                          startIcon={<CheckCircle />}
                          onClick={() => updateAppointmentStatus(appointment._id, 'confirmed')}
                        >
                          Confirm
                        </Button>
                        <Button
                          size="small"
                          variant="outlined"
                          color="error"
                          startIcon={<Cancel />}
                          onClick={() => updateAppointmentStatus(appointment._id, 'cancelled')}
                        >
                          Cancel
                        </Button>
                      </>
                    )}
                    
                    {appointment.status === 'confirmed' && (
                      <Button
                        size="small"
                        variant="contained"
                        color="primary"
                        startIcon={<VideoCall />}
                        onClick={() => window.open(`/video-call/${appointment._id}`, '_blank')}
                      >
                        Join Call
                      </Button>
                    )}
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Appointment Details Dialog */}
      <Dialog 
        open={detailsDialog} 
        onClose={() => setDetailsDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Appointment Details
        </DialogTitle>
        <DialogContent>
          {selectedAppointment && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>Client Information</Typography>
                <Typography><strong>Name:</strong> {selectedAppointment.user?.firstName} {selectedAppointment.user?.lastName}</Typography>
                <Typography><strong>Email:</strong> {selectedAppointment.user?.email}</Typography>
                <Typography><strong>Phone:</strong> {selectedAppointment.user?.phone}</Typography>
                <Typography><strong>DOB:</strong> {selectedAppointment.user?.dateOfBirth ? new Date(selectedAppointment.user.dateOfBirth).toLocaleDateString() : 'Not provided'}</Typography>
                <Typography><strong>Birth Time:</strong> {selectedAppointment.user?.timeOfBirth || 'Not provided'}</Typography>
                <Typography><strong>Birth Place:</strong> {selectedAppointment.user?.placeOfBirth?.city}, {selectedAppointment.user?.placeOfBirth?.state}</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>Appointment Details</Typography>
                <Typography><strong>Date:</strong> {new Date(selectedAppointment.appointmentDate).toLocaleDateString()}</Typography>
                <Typography><strong>Time:</strong> {selectedAppointment.appointmentTime}</Typography>
                <Typography><strong>Consultation Type:</strong> {selectedAppointment.consultationType}</Typography>
                <Typography><strong>Package:</strong> {selectedAppointment.package}</Typography>
                <Typography><strong>Duration:</strong> {selectedAppointment.duration} minutes</Typography>
                <Typography><strong>Amount:</strong> ₹{selectedAppointment.amount?.toLocaleString()}</Typography>
                <Typography><strong>Status:</strong> {selectedAppointment.status}</Typography>
              </Grid>
              {selectedAppointment.clientQuestions && selectedAppointment.clientQuestions.length > 0 && (
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom>Client Questions</Typography>
                  {selectedAppointment.clientQuestions.map((question, index) => (
                    <Typography key={index} paragraph>
                      <strong>Q{index + 1}:</strong> {question}
                    </Typography>
                  ))}
                </Grid>
              )}
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDetailsDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AdminDashboard;
