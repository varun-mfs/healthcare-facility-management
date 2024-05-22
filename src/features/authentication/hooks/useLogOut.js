import { FirebaseAuth } from "../../../lib/firebase";
import { useSignOut } from "react-firebase-hooks/auth";

const useLogOut = () => {

    const [signOut, loading, error] = useSignOut(FirebaseAuth);

    return { logOut: signOut, loading, error };
}

export { useLogOut };