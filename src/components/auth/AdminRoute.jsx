import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  
  console.log('🔍 AdminRoute Check:', {
    isAuthenticated,
    user: user,
    role: user?.role,
    email: user?.email
  });

  if (!isAuthenticated) {
    console.log('❌ Not authenticated - redirecting to login');
    return <Navigate to="/login" replace />;
  }
  
  if (user?.role !== 'admin') {
    console.log('❌ Not admin user - redirecting to home');
    return <Navigate to="/" replace />;
  }
  
  console.log('✅ Admin access granted - rendering admin dashboard');
  return children;
};

export default AdminRoute;
