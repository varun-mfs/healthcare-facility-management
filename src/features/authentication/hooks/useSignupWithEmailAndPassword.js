import { FirebaseAuth } from "../../../lib/firebase";
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';

const useSignupWithEmailAndPassword = () => {
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(FirebaseAuth);

    return {
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    }
}

export { useSignupWithEmailAndPassword }