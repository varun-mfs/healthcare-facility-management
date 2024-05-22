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

  console.log("🚀 ~ file: CheckAuth.jsx:16 ~ CheckAuth ~ user:", user)


  console.log("🚀 ~ file: CheckAuth.jsx:19 ~ CheckAuth ~ location.pathname:", location.pathname)
  // navigate to login page if user is null
  if (!user && (location.pathname !== '/login' || location.pathname !== '/register')) {
    console.log("INSIDE IF$$$");
    // TODO: fix this login issue
    return <Navigate to='/login' replace />  // replace: replace the current entry in the history stack instead of adding a new one.
  }

  console.log("TRUE/FALSE", user && (location.pathname === "/login" || location.pathname === '/register'));
  if (user && (location.pathname === "/login" || location.pathname === '/register')) {
    console.log("NAvigating to HOME Page!")
    return <Navigate to="/" replace />
  }

  return children;
}

export default CheckAuth;