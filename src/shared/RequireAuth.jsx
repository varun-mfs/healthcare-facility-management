import { useAuthState } from 'react-firebase-hooks/auth';
import { FirebaseAuth } from '../lib/firebase/index';
import { Navigate } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';


const RequireAuth = ({ children }) => {

  const [user, loading, error] = useAuthState(FirebaseAuth);

  if (loading) {
    return <LoadingSpinner />
  }

  console.log("🚀 ~ file: RequireAuth.jsx:16 ~ RequireAuth ~ user:", user)


  // navigate to login page if user is null
  if (!user) {
    // TODO: fix this login issue
    return <Navigate to='/login' replace />  // replace: replace the current entry in the history stack instead of adding a new one.
  }

  return children;
}

export default RequireAuth;