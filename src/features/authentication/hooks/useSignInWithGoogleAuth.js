import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { FirebaseAuth } from "../../../lib/firebase";

const useSignInWithGoogleAuth = () => {

    const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(FirebaseAuth);

    return { signInWithGoogle, gUser, gLoading, gError };
}

export { useSignInWithGoogleAuth };