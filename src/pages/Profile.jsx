import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  Avatar,
  Paper,
  Chip,
  Divider,
  Alert,
  CircularProgress,
  Stack,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import {
  Edit,
  Save,
  Cancel,
  CameraAlt,
  Person,
  Email,
  Phone,
  LocationOn,
  Cake,
  Schedule,
  Star,
  Security
} from '@mui/icons-material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import api from '../services/api';
import { getCurrentUser } from '../store/authSlice';

const Profile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [avatarDialog, setAvatarDialog] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    dateOfBirth: null,
    timeOfBirth: '',
    gender: '',
    placeOfBirth: {
      city: '',
      state: '',
      country: 'India'
    }
  });

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        phone: user.phone || '',
        dateOfBirth: user.dateOfBirth ? dayjs(user.dateOfBirth) : null,
        timeOfBirth: user.timeOfBirth || '',
        gender: user.gender || '',
        placeOfBirth: {
          city: user.placeOfBirth?.city || '',
          state: user.placeOfBirth?.state || '',
          country: user.placeOfBirth?.country || 'India'
        }
      });
    }
  }, [user]);

  const handleInputChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      
      const updateData = {
        ...formData,
        dateOfBirth: formData.dateOfBirth ? dayjs(formData.dateOfBirth).format('YYYY-MM-DD') : null
      };

      const response = await api.put('/user/profile', updateData);
      
      if (response.data.success) {
        toast.success('Profile updated successfully!');
        dispatch(getCurrentUser());
        setEditing(false);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size must be less than 5MB');
      return;
    }

    try {
      setUploadingAvatar(true);
      const formData = new FormData();
      formData.append('avatar', file);

      const response = await api.post('/user/avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.success) {
        toast.success('Avatar updated successfully!');
        dispatch(getCurrentUser());
        setAvatarDialog(false);
      }
    } catch (error) {
      toast.error('Failed to upload avatar');
    } finally {
      setUploadingAvatar(false);
    }
  };

  if (!user) {
    return (
      <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading profile...
        </Typography>
      </Container>
    );
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Container maxWidth="md" sx={{ py: 4 }}>
        {/* Header */}
        <Paper elevation={2} sx={{ p: 4, mb: 4, textAlign: 'center' }}>
          <Box sx={{ position: 'relative', display: 'inline-block', mb: 3 }}>
            <Avatar
              src={user.avatar}
              sx={{
                width: 120,
                height: 120,
                fontSize: '3rem',
                bgcolor: 'primary.main',
                border: '4px solid',
                borderColor: 'background.paper',
                boxShadow: 4
              }}
            >
              {user.firstName?.[0]}{user.lastName?.[0]}
            </Avatar>
            <IconButton
              sx={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                bgcolor: 'primary.main',
                color: 'white',
                '&:hover': { bgcolor: 'primary.dark' }
              }}
              onClick={() => setAvatarDialog(true)}
            >
              <CameraAlt />
            </IconButton>
          </Box>

          <Typography variant="h4" gutterBottom fontWeight={700}>
            {user.firstName} {user.lastName}
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            {user.email}
          </Typography>
          
          <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 2 }}>
            <Chip 
              icon={<Star />} 
              label={`${user.totalConsultations || 0} Consultations`} 
              color="primary" 
            />
            <Chip 
              icon={<Person />} 
              label={user.role === 'client' ? 'Valued Client' : user.role} 
              color="success" 
            />
          </Stack>

          <Button
            variant={editing ? 'outlined' : 'contained'}
            startIcon={editing ? <Cancel /> : <Edit />}
            onClick={() => setEditing(!editing)}
            sx={{ mt: 3 }}
          >
            {editing ? 'Cancel' : 'Edit Profile'}
          </Button>
        </Paper>

        {/* Profile Form */}
        <Card>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h5" gutterBottom fontWeight={600} sx={{ mb: 3 }}>
              Personal Information
            </Typography>

            <Grid container spacing={3}>
              {/* Basic Information */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  disabled={!editing}
                  InputProps={{
                    startAdornment: <Person sx={{ mr: 1, color: 'text.secondary' }} />
                  }}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  disabled={!editing}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email Address"
                  value={user.email}
                  disabled
                  InputProps={{
                    startAdornment: <Email sx={{ mr: 1, color: 'text.secondary' }} />
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  disabled={!editing}
                  InputProps={{
                    startAdornment: <Phone sx={{ mr: 1, color: 'text.secondary' }} />
                  }}
                />
              </Grid>

              <Divider sx={{ width: '100%', my: 2 }} />

              {/* Astrological Information */}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom color="primary.main">
                  Birth Details (For Accurate Predictions)
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <DatePicker
                  label="Date of Birth"
                  value={formData.dateOfBirth}
                  onChange={(newValue) => handleInputChange('dateOfBirth', newValue)}
                  disabled={!editing}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      InputProps: {
                        startAdornment: <Cake sx={{ mr: 1, color: 'text.secondary' }} />
                      }
                    }
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Time of Birth"
                  value={formData.timeOfBirth}
                  onChange={(e) => handleInputChange('timeOfBirth', e.target.value)}
                  disabled={!editing}
                  placeholder="HH:MM (e.g., 14:30)"
                  InputProps={{
                    startAdornment: <Schedule sx={{ mr: 1, color: 'text.secondary' }} />
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  select
                  label="Gender"
                  value={formData.gender}
                  onChange={(e) => handleInputChange('gender', e.target.value)}
                  disabled={!editing}
                  SelectProps={{ native: true }}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </TextField>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Birth City"
                  value={formData.placeOfBirth.city}
                  onChange={(e) => handleInputChange('placeOfBirth.city', e.target.value)}
                  disabled={!editing}
                  InputProps={{
                    startAdornment: <LocationOn sx={{ mr: 1, color: 'text.secondary' }} />
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Birth State"
                  value={formData.placeOfBirth.state}
                  onChange={(e) => handleInputChange('placeOfBirth.state', e.target.value)}
                  disabled={!editing}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Birth Country"
                  value={formData.placeOfBirth.country}
                  onChange={(e) => handleInputChange('placeOfBirth.country', e.target.value)}
                  disabled={!editing}
                />
              </Grid>

              {editing && (
                <Grid item xs={12}>
                  <Alert severity="info" sx={{ mt: 2 }}>
                    <Typography variant="body2">
                      <strong>Important:</strong> Accurate birth details are essential for precise astrological predictions. 
                      Please ensure all information is correct.
                    </Typography>
                  </Alert>
                </Grid>
              )}

              {editing && (
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mt: 3 }}>
                    <Button
                      variant="contained"
                      startIcon={loading ? <CircularProgress size={20} /> : <Save />}
                      onClick={handleSave}
                      disabled={loading}
                      size="large"
                    >
                      {loading ? 'Saving...' : 'Save Changes'}
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<Cancel />}
                      onClick={() => setEditing(false)}
                      disabled={loading}
                      size="large"
                    >
                      Cancel
                    </Button>
                  </Box>
                </Grid>
              )}
            </Grid>
          </CardContent>
        </Card>

        {/* Privacy Notice */}
        <Paper elevation={1} sx={{ p: 3, mt: 3, bgcolor: 'background.default' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Security sx={{ color: 'primary.main', mr: 1 }} />
            <Typography variant="h6" fontWeight={600}>
              Privacy & Security
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary">
            All your personal information is kept strictly confidential and is only used for astrological 
            calculations and consultations. We follow traditional astrological ethics regarding client privacy.
          </Typography>
        </Paper>

        {/* Avatar Upload Dialog */}
        <Dialog open={avatarDialog} onClose={() => setAvatarDialog(false)}>
          <DialogTitle>Update Profile Picture</DialogTitle>
          <DialogContent>
            <Box sx={{ textAlign: 'center', py: 2 }}>
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="avatar-upload"
                type="file"
                onChange={handleAvatarUpload}
              />
              <label htmlFor="avatar-upload">
                <Button
                  variant="contained"
                  component="span"
                  startIcon={uploadingAvatar ? <CircularProgress size={20} /> : <CameraAlt />}
                  disabled={uploadingAvatar}
                  size="large"
                >
                  {uploadingAvatar ? 'Uploading...' : 'Choose Photo'}
                </Button>
              </label>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                Maximum file size: 5MB. Supported formats: JPG, PNG, GIF
              </Typography>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setAvatarDialog(false)}>Cancel</Button>
          </DialogActions>
        </Dialog>
      </Container>
    </LocalizationProvider>
  );
};

export default Profile;
