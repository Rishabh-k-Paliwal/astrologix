import React from 'react';
import VideoCall from '../components/video/VideoCall';

const TestVideoCall = () => {
  // Mock appointment data for testing
  const mockAppointment = {
    _id: 'test-appointment-123',
    appointmentDate: new Date(),
    appointmentTime: '18:00',
    consultationType: 'Career Consultation',
    package: 'Premium Reading'
  };

  // Mock meeting URL (replace with your actual Daily domain)
  const mockMeetingUrl = 'https://your-subdomain.daily.co/test-room-' + Date.now();

  return (
    <div>
      <h2>Video Call Test</h2>
      <p>Meeting URL: {mockMeetingUrl}</p>
      {/* Pass props directly to VideoCall component */}
      <VideoCall 
        appointment={mockAppointment}
        meetingUrl={mockMeetingUrl}
      />
    </div>
  );
};

export default TestVideoCall;
