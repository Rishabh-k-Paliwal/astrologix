// API Endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    ME: '/auth/me',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
  },
  APPOINTMENTS: {
    CREATE: '/appointments',
    GET_AVAILABLE_SLOTS: '/appointments/available-slots',
    MY_APPOINTMENTS: '/appointments/my-appointments',
    UPDATE: '/appointments',
    DELETE: '/appointments',
  },
};

// Service packages
export const SERVICE_PACKAGES = [
  {
    id: 'basic',
    name: 'Basic Consultation',
    duration: 30,
    price: 999,
    description: 'Quick insights into your current situation',
    features: [
      '30-minute video consultation',
      'Basic birth chart reading',
      'Current planetary influences',
      'Immediate guidance'
    ]
  },
  {
    id: 'premium',
    name: 'Premium Consultation',
    duration: 45,
    price: 1499,
    description: 'Detailed analysis with remedies',
    features: [
      '45-minute video consultation',
      'Detailed birth chart analysis',
      'Career & relationship insights',
      'Remedies and suggestions',
      'Follow-up support'
    ]
  },
  {
    id: 'detailed',
    name: 'Detailed Consultation',
    duration: 60,
    price: 1999,
    description: 'Complete life analysis and guidance',
    features: [
      '60-minute video consultation',
      'Complete life path analysis',
      'Yearly predictions',
      'Gemstone recommendations',
      'Written report included',
      '7-day follow-up support'
    ]
  }
];

// Routes
export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  SERVICES: '/services',
  CONTACT: '/contact',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  BOOKING: '/booking',
  MY_APPOINTMENTS: '/my-appointments',
  VIDEO_CALL: '/video-call',
  ADMIN: '/admin',
};

// Add this to your existing constants.js
export const CONSULTATION_TYPES = [
  { id: 'birth-chart', name: 'Birth Chart Reading', description: 'Complete analysis of your birth chart' },
  { id: 'career', name: 'Career Guidance', description: 'Professional and career-related insights' },
  { id: 'marriage', name: 'Marriage & Relationships', description: 'Love, marriage, and relationship guidance' },
  { id: 'health', name: 'Health Astrology', description: 'Health-related astrological insights' },
  { id: 'finance', name: 'Financial Astrology', description: 'Money and investment guidance' },
  { id: 'general', name: 'General Consultation', description: 'General life guidance and predictions' },
];

// Working time slots (5 PM to 8 PM)
export const TIME_SLOTS = [
  { time: '17:00', label: '5:00 PM - 5:30 PM', duration: 30 },
  { time: '17:30', label: '5:30 PM - 6:00 PM', duration: 30 },
  { time: '18:00', label: '6:00 PM - 6:30 PM', duration: 30 },
  { time: '18:30', label: '6:30 PM - 7:00 PM', duration: 30 },
  { time: '19:00', label: '7:00 PM - 7:30 PM', duration: 30 },
  { time: '19:30', label: '7:30 PM - 8:00 PM', duration: 30 },
];
