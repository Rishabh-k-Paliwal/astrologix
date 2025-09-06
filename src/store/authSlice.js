import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';

// Safe function to get user from localStorage
const getUserFromStorage = () => {
  try {
    const user = localStorage.getItem('user');
    if (!user || user === 'undefined') return null;
    const parsedUser = JSON.parse(user);
    console.log('🔍 User from localStorage:', parsedUser);
    return parsedUser;
  } catch (error) {
    console.warn('Failed to parse user from localStorage:', error);
    localStorage.removeItem('user');
    return null;
  }
};

// Async thunks for API calls
export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      console.log('🚀 Attempting login for:', email);
      const response = await api.post('/auth/login', { email, password });
      
      console.log('✅ Login API Response:', response.data);
      console.log('👤 User Role:', response.data.data.user.role);
      
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.data.user));
      
      return response.data;
    } catch (error) {
      console.error('❌ Login failed:', error.response?.data);
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      console.log('🚀 Attempting registration for:', userData.email);
      const response = await api.post('/auth/register', userData);
      console.log('✅ Registration successful');
      return response.data;
    } catch (error) {
      console.error('❌ Registration failed:', error.response?.data);
      return rejectWithValue(error.response?.data?.message || 'Registration failed');
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  'auth/getCurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      console.log('🔄 Fetching current user...');
      const response = await api.get('/auth/me');
      console.log('✅ Current user fetched:', response.data.user);
      return response.data.user;
    } catch (error) {
      console.error('❌ Failed to get current user:', error.response?.data);
      return rejectWithValue(error.response?.data?.message || 'Failed to get user');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: getUserFromStorage(),
    token: localStorage.getItem('token') || null,
    isLoading: false,
    error: null,
    isAuthenticated: !!localStorage.getItem('token'),
  },
  reducers: {
    logout: (state) => {
      console.log('🚪 Logging out user');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    // ✅ Add manual state update for debugging
    setUser: (state, action) => {
      console.log('👤 Setting user manually:', action.payload);
      state.user = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
  },
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(loginUser.pending, (state) => {
        console.log('⏳ Login pending...');
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log('✅ Login fulfilled with payload:', action.payload);
        console.log('👤 Setting user to state:', action.payload.data.user);
        
        state.isLoading = false;
        state.user = action.payload.data.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;
        
        console.log('🎯 Final auth state after login:', {
          user: state.user,
          role: state.user?.role,
          isAuthenticated: state.isAuthenticated
        });
      })
      .addCase(loginUser.rejected, (state, action) => {
        console.log('❌ Login rejected:', action.payload);
        state.isLoading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      })
      // Register cases
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Get current user cases
      .addCase(getCurrentUser.pending, (state) => {
        console.log('⏳ Getting current user...');
        state.isLoading = true;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        console.log('✅ Current user updated:', action.payload);
        state.isLoading = false;
        state.user = action.payload;
        
        try {
          localStorage.setItem('user', JSON.stringify(action.payload));
        } catch (error) {
          console.warn('Failed to save user to localStorage:', error);
        }
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        console.log('❌ Get current user failed:', action.payload);
        state.isLoading = false;
        state.error = action.payload;
        
        // If user fetch fails, might be invalid token
        if (action.payload?.includes('401') || action.payload?.includes('token')) {
          console.log('🔑 Invalid token detected, clearing auth state');
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          state.user = null;
          state.token = null;
          state.isAuthenticated = false;
        }
      });
  },
});

export const { logout, clearError, setUser } = authSlice.actions;
export default authSlice.reducer;
