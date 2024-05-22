import { FirebaseAuth } from "../../../lib/firebase";
import { useSignInWithEmailAndPassword as useFirebaseSignInWithEmailAndPassword } from "react-firebase-hooks/auth";

const useSignInWithEmailAndPassword = () => {

    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useFirebaseSignInWithEmailAndPassword(FirebaseAuth);


    return { signInWithEmailAndPassword, user, loading, error };
}

export { useSignInWithEmailAndPassword }