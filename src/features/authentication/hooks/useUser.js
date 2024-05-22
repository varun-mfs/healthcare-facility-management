import { FirebaseAuth } from '../../../lib/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

const useUser = () => {
    const [user, loading, error] = useAuthState(FirebaseAuth);

    return { user, loading, error }
}

export { useUser }