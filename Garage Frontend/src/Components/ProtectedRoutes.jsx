import { useAuth } from '../UserContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>; // or a spinner

  return user ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
