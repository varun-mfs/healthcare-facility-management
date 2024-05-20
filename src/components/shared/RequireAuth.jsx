import { useAuthState } from 'react-firebase-hooks/auth';
import { FirebaseAuth } from '../../firebase/config';
import { Navigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';


const RequireAuth = ({ children }) => {

  const [user, loading, error] = useAuthState(FirebaseAuth);

  if (loading && !user) {
    return <p><CircularProgress/> Loading...</p>
  }

  // if user, go to home page
  // if (user) {
  //   return <Navigate to='./' replace />;
  // }

  // navigate to login page if user is null
  if (!user) {
    return <Navigate to='/login' replace />  // replace: replace the current entry in the history stack instead of adding a new one.
  }

  return children;
}

export default RequireAuth;