import { Navigate } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';
import { useAuthContext } from '../../features/authentication/hooks';
import { useLocation } from "react-router-dom";


const CheckAuth = ({ children }) => {
  const location = useLocation();

  const { user, loading, error } = useAuthContext();

  if (loading) {
    return <LoadingSpinner />
  }

  // navigate to login page if user is null
  if (!user && (location.pathname !== '/login' && location.pathname !== '/register')) {
    return <Navigate to='/login' replace />  // replace: replace the current entry in the history stack instead of adding a new one.
  }

  if (user && (location.pathname === "/login" || location.pathname === '/register')) {
    return <Navigate to="/" replace />
  }

  return children;
}

export default CheckAuth;