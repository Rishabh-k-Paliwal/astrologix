import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import DailyIframe from '@daily-co/daily-js';
import { 
  useDaily, 
  useParticipantIds, 
  useLocalParticipant,
  useScreenShare,
  useDailyEvent
} from '@daily-co/daily-react-hooks';
import {
  Box,
  Container,
  Paper,
  Button,
  Typography,
  IconButton,
  Alert,
  CircularProgress,
  Grid,
  Card,
  CardContent
} from '@mui/material';
import {
  Videocam,
  VideocamOff,
  Mic,
  MicOff,
  CallEnd,
  ScreenShare,
  StopScreenShare,
  Settings
} from '@mui/icons-material';
import { toast } from 'react-toastify';
import api from '../../services/api';

const DailyVideoCall = () => {
  const { appointmentId } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);

  const [callObject, setCallObject] = useState(null);
  const [roomUrl, setRoomUrl] = useState(null);
  const [meetingToken, setMeetingToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [appointment, setAppointment] = useState(null);
  const [callStarted, setCallStarted] = useState(false);

  // Daily React Hooks
  const daily = useDaily();
  const participantIds = useParticipantIds();
  const localParticipant = useLocalParticipant();
  const { isSharingScreen, startScreenShare, stopScreenShare } = useScreenShare();

  // Initialize Daily call
  useEffect(() => {
    const initializeCall = async () => {
      try {
        setIsLoading(true);
        
        // Get appointment details
        const appointmentRes = await api.get(`/appointments/${appointmentId}`);
        setAppointment(appointmentRes.data.data.appointment);

        // Create room if it doesn't exist
        let roomData;
        if (!appointmentRes.data.data.appointment.videoCall?.roomName) {
          const roomRes = await api.post(`/video-call/create-room/${appointmentId}`);
          roomData = roomRes.data.data;
        } else {
          roomData = appointmentRes.data.data.appointment.videoCall;
        }

        // Get meeting token
        const tokenRes = await api.get(`/video-call/meeting-token/${appointmentId}`);
        const { token, roomUrl: url } = tokenRes.data.data;

        setMeetingToken(token);
        setRoomUrl(url);

        // Create Daily call object
        const dailyCall = DailyIframe.createCallObject({
          videoSource: true,
          audioSource: true
        });

        setCallObject(dailyCall);
        setIsLoading(false);

      } catch (error) {
        console.error('❌ Failed to initialize call:', error);
        toast.error('Failed to initialize video call');
        navigate('/dashboard');
      }
    };

    if (appointmentId) {
      initializeCall();
    }

    return () => {
      if (callObject) {
        callObject.destroy();
      }
    };
  }, [appointmentId, navigate]);

  // Join call when ready
  const joinCall = useCallback(async () => {
    if (callObject && roomUrl && meetingToken) {
      try {
        await callObject.join({
          url: roomUrl,
          token: meetingToken
        });
        
        // Mark call as started
        await api.put(`/video-call/call-status/${appointmentId}`, { status: 'started' });
        setCallStarted(true);
        toast.success('🎥 Joined video consultation!');
        
      } catch (error) {
        console.error('❌ Failed to join call:', error);
        toast.error('Failed to join call');
      }
    }
  }, [callObject, roomUrl, meetingToken, appointmentId]);

  // Leave call
  const leaveCall = useCallback(async () => {
    if (callObject) {
      try {
        await callObject.leave();
        await api.put(`/video-call/call-status/${appointmentId}`, { status: 'ended' });
        toast.success('Call ended successfully');
        navigate('/dashboard');
      } catch (error) {
        console.error('❌ Failed to leave call:', error);
        navigate('/dashboard');
      }
    }
  }, [callObject, appointmentId, navigate]);

  // Toggle camera
  const toggleCamera = useCallback(() => {
    if (callObject) {
      callObject.setLocalVideo(!localParticipant?.video);
    }
  }, [callObject, localParticipant]);

  // Toggle microphone
  const toggleMicrophone = useCallback(() => {
    if (callObject) {
      callObject.setLocalAudio(!localParticipant?.audio);
    }
  }, [callObject, localParticipant]);

  // Handle screen share toggle
  const toggleScreenShare = useCallback(() => {
    if (isSharingScreen) {
      stopScreenShare();
    } else {
      startScreenShare();
    }
  }, [isSharingScreen, startScreenShare, stopScreenShare]);

  // Event listeners
  useDailyEvent('joined-meeting', () => {
    console.log('✅ Joined meeting successfully');
  });

  useDailyEvent('left-meeting', () => {
    console.log('👋 Left meeting');
    navigate('/dashboard');
  });

  useDailyEvent('participant-joined', (event) => {
    console.log('👤 Participant joined:', event.participant.user_name);
    toast.success(`${event.participant.user_name} joined the consultation`);
  });

  useDailyEvent('participant-left', (event) => {
    console.log('👤 Participant left:', event.participant.user_name);
    toast.info(`${event.participant.user_name} left the consultation`);
  });

  useDailyEvent('error', (event) => {
    console.error('❌ Daily error:', event);
    toast.error('Video call error occurred');
  });

  if (isLoading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4, textAlign: 'center' }}>
        <CircularProgress size={60} />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Preparing your consultation room...
        </Typography>
      </Container>
    );
  }

  if (!callStarted) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom>
            🌟 Ready for Your Consultation?
          </Typography>
          
          {appointment && (
            <Card sx={{ mb: 3, textAlign: 'left' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>Appointment Details:</Typography>
                <Typography>📅 {new Date(appointment.appointmentDate).toLocaleDateString()}</Typography>
                <Typography>⏰ {appointment.appointmentTime}</Typography>
                <Typography>🔮 {appointment.consultationType}</Typography>
                <Typography>📦 {appointment.package} Package</Typography>
                <Typography>💰 ₹{appointment.amount?.toLocaleString()}</Typography>
              </CardContent>
            </Card>
          )}

          <Alert severity="info" sx={{ mb: 3 }}>
            Your video consultation room is ready. Click "Join Consultation" to begin your session with Jyotirvid Kuldeep Paliwal.
          </Alert>

          <Button
            variant="contained"
            size="large"
            onClick={joinCall}
            startIcon={<Videocam />}
            sx={{ mr: 2 }}
          >
            Join Consultation
          </Button>

          <Button
            variant="outlined"
            size="large"
            onClick={() => navigate('/dashboard')}
          >
            Cancel
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Paper sx={{ p: 2, textAlign: 'center', zIndex: 1000 }}>
        <Typography variant="h6">
          🌟 Astrology Consultation - {appointment?.consultationType}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {participantIds.length} participant(s) in call
        </Typography>
      </Paper>

      {/* Video Area */}
      <Box sx={{ flex: 1, position: 'relative' }}>
        {/* Daily.co will render videos here */}
        <div 
          id="daily-video-container" 
          style={{ 
            width: '100%', 
            height: '100%',
            backgroundColor: '#000'
          }}
        />
      </Box>

      {/* Controls */}
      <Paper sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
          <IconButton
            onClick={toggleMicrophone}
            color={localParticipant?.audio ? 'primary' : 'error'}
            sx={{ 
              backgroundColor: localParticipant?.audio ? 'primary.main' : 'error.main',
              color: 'white',
              '&:hover': {
                backgroundColor: localParticipant?.audio ? 'primary.dark' : 'error.dark'
              }
            }}
          >
            {localParticipant?.audio ? <Mic /> : <MicOff />}
          </IconButton>

          <IconButton
            onClick={toggleCamera}
            color={localParticipant?.video ? 'primary' : 'error'}
            sx={{
              backgroundColor: localParticipant?.video ? 'primary.main' : 'error.main',
              color: 'white',
              '&:hover': {
                backgroundColor: localParticipant?.video ? 'primary.dark' : 'error.dark'
              }
            }}
          >
            {localParticipant?.video ? <Videocam /> : <VideocamOff />}
          </IconButton>

          <IconButton
            onClick={toggleScreenShare}
            color={isSharingScreen ? 'secondary' : 'primary'}
            sx={{
              backgroundColor: isSharingScreen ? 'secondary.main' : 'grey.600',
              color: 'white',
              '&:hover': {
                backgroundColor: isSharingScreen ? 'secondary.dark' : 'grey.700'
              }
            }}
          >
            {isSharingScreen ? <StopScreenShare /> : <ScreenShare />}
          </IconButton>

          <IconButton
            onClick={leaveCall}
            sx={{
              backgroundColor: 'error.main',
              color: 'white',
              '&:hover': {
                backgroundColor: 'error.dark'
              }
            }}
          >
            <CallEnd />
          </IconButton>
        </Box>
      </Paper>
    </Box>
  );
};

export default DailyVideoCall;
