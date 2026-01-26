import { Navigate, useLocation } from 'react-router-dom';
import { authService } from '../services/api';

function ProtectedRoute({ children }) {
  const location = useLocation();
  const isAuthenticated = authService.isAuthenticated();

  if (!isAuthenticated) {
    // Redirect to login, but save the attempted URL
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return children;
}

export default ProtectedRoute;
