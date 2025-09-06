const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Protect routes - verify JWT token
const auth = async (req, res, next) => {
  try {
    let token;
    
    // Check if token exists in Authorization header or cookies
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.token) {
      token = req.cookies.token;
    }
    
    // Check if no token
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. No token provided.',
        code: 'NO_TOKEN'
      });
    }
    
    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Get user from token with additional security checks
      const user = await User.findById(decoded.id)
        .select('-password')
        .lean(); // Use lean() for better performance
      
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Token is valid but user not found',
          code: 'USER_NOT_FOUND'
        });
      }
      
      if (!user.isActive) {
        return res.status(401).json({
          success: false,
          message: 'User account is deactivated',
          code: 'ACCOUNT_DEACTIVATED'
        });
      }
      
      // Check if user is email verified (optional)
      if (!user.isEmailVerified && process.env.REQUIRE_EMAIL_VERIFICATION === 'true') {
        return res.status(401).json({
          success: false,
          message: 'Please verify your email address',
          code: 'EMAIL_NOT_VERIFIED'
        });
      }
      
      // Add user to request object
      req.user = user;
      next();
      
    } catch (jwtError) {
      // Handle specific JWT errors
      let message = 'Invalid token';
      let code = 'INVALID_TOKEN';
      
      if (jwtError.name === 'TokenExpiredError') {
        message = 'Token has expired';
        code = 'TOKEN_EXPIRED';
      } else if (jwtError.name === 'JsonWebTokenError') {
        message = 'Malformed token';
        code = 'MALFORMED_TOKEN';
      }
      
      return res.status(401).json({
        success: false,
        message,
        code
      });
    }
    
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error in authentication',
      code: 'SERVER_ERROR'
    });
  }
};

// Enhanced Admin only middleware
const adminOnly = async (req, res, next) => {
  try {
    // Check if user is authenticated first
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required',
        code: 'AUTH_REQUIRED'
      });
    }

    // Check if user is admin by role OR by email (for Kuldeep ji)
    const adminEmails = [
      'jyotirvid.kp@gmail.com',
      'kuldeep@astrology.com',
      process.env.ADMIN_EMAIL
    ].filter(Boolean); // Remove undefined values
    
    const isAdmin = req.user.role === 'admin' || adminEmails.includes(req.user.email);
    
    if (!isAdmin) {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Admin privileges required.',
        code: 'ADMIN_REQUIRED'
      });
    }
    
    // Add admin flag for convenience
    req.isAdmin = true;
    next();
    
  } catch (error) {
    console.error('Admin middleware error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error in admin check',
      code: 'SERVER_ERROR'
    });
  }
};

// Enhanced Client only middleware
const clientOnly = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required',
        code: 'AUTH_REQUIRED'
      });
    }
    
    // Allow both client and admin roles (admin can act as client)
    const allowedRoles = ['client', 'admin'];
    
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Client privileges required.',
        code: 'CLIENT_REQUIRED'
      });
    }
    
    next();
    
  } catch (error) {
    console.error('Client middleware error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error in client check',
      code: 'SERVER_ERROR'
    });
  }
};

// Enhanced role-based middleware (flexible)
const requireRole = (...allowedRoles) => {
  return async (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Authentication required',
          code: 'AUTH_REQUIRED'
        });
      }
      
      if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({
          success: false,
          message: `Access denied. Required role: ${allowedRoles.join(' or ')}`,
          code: 'INSUFFICIENT_ROLE'
        });
      }
      
      next();
      
    } catch (error) {
      console.error('Role middleware error:', error);
      res.status(500).json({
        success: false,
        message: 'Server error in role check',
        code: 'SERVER_ERROR'
      });
    }
  };
};

// Generate JWT Token with enhanced options
const generateToken = (id, options = {}) => {
  const payload = { id };
  
  const tokenOptions = {
    expiresIn: options.expiresIn || process.env.JWT_EXPIRE || '30d',
    issuer: process.env.JWT_ISSUER || 'astrology-app',
    audience: process.env.JWT_AUDIENCE || 'astrology-users'
  };
  
  return jwt.sign(payload, process.env.JWT_SECRET, tokenOptions);
};

// Enhanced token response with security headers
const sendTokenResponse = (user, statusCode, res, message = 'Success') => {
  // Generate token
  const token = generateToken(user._id);
  
  // Cookie options
  const cookieOptions = {
    expires: new Date(
      Date.now() + (process.env.JWT_COOKIE_EXPIRE || 30) * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
    path: '/'
  };
  
  // Remove password from output
  const userResponse = {
    id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    fullName: user.fullName,
    email: user.email,
    phone: user.phone,
    role: user.role,
    isEmailVerified: user.isEmailVerified,
    avatar: user.avatar,
    totalConsultations: user.totalConsultations || 0,
    totalSpent: user.totalSpent || 0,
    dateOfBirth: user.dateOfBirth,
    timeOfBirth: user.timeOfBirth,
    placeOfBirth: user.placeOfBirth,
    gender: user.gender,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
  };
  
  res
    .status(statusCode)
    .cookie('token', token, cookieOptions)
    .json({
      success: true,
      message,
      token,
      expiresIn: process.env.JWT_EXPIRE || '30d',
      data: {
        user: userResponse
      }
    });
};

// Optional auth - doesn't fail if no token
const optionalAuth = async (req, res, next) => {
  try {
    let token;
    
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.token) {
      token = req.cookies.token;
    }
    
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id)
          .select('-password')
          .lean();
        
        if (user && user.isActive) {
          req.user = user;
        }
      } catch (error) {
        // Token invalid, but continue without user
        console.log('Invalid token in optional auth:', error.message);
      }
    }
    
    next();
  } catch (error) {
    console.error('Optional auth middleware error:', error);
    next(); // Continue even if error
  }
};

// Middleware to refresh token if it's close to expiry
const refreshTokenIfNeeded = async (req, res, next) => {
  try {
    if (req.user && req.headers.authorization) {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.decode(token);
      
      // If token expires in less than 7 days, send a new one
      const timeUntilExpiry = decoded.exp - (Date.now() / 1000);
      const sevenDaysInSeconds = 7 * 24 * 60 * 60;
      
      if (timeUntilExpiry < sevenDaysInSeconds) {
        const newToken = generateToken(req.user.id);
        res.setHeader('X-New-Token', newToken);
      }
    }
    
    next();
  } catch (error) {
    console.error('Token refresh error:', error);
    next(); // Continue even if error
  }
};

// Rate limiting middleware for auth routes
const authRateLimit = (maxAttempts = 5, windowMs = 15 * 60 * 1000) => {
  const attempts = new Map();
  
  return (req, res, next) => {
    const clientId = req.ip || req.connection.remoteAddress;
    const now = Date.now();
    
    if (!attempts.has(clientId)) {
      attempts.set(clientId, { count: 1, resetTime: now + windowMs });
      return next();
    }
    
    const clientAttempts = attempts.get(clientId);
    
    if (now > clientAttempts.resetTime) {
      clientAttempts.count = 1;
      clientAttempts.resetTime = now + windowMs;
      return next();
    }
    
    if (clientAttempts.count >= maxAttempts) {
      return res.status(429).json({
        success: false,
        message: 'Too many authentication attempts. Please try again later.',
        code: 'RATE_LIMIT_EXCEEDED',
        retryAfter: Math.ceil((clientAttempts.resetTime - now) / 1000)
      });
    }
    
    clientAttempts.count++;
    next();
  };
};

module.exports = {
  auth,
  adminOnly,
  clientOnly,
  requireRole,
  generateToken,
  sendTokenResponse,
  optionalAuth,
  refreshTokenIfNeeded,
  authRateLimit
};
