import { useContext } from "react"
import { AuthContext } from "../provider"

const useAuthContext = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuthContext must be called within AuthProvider')
    }

  return context;
}

export {useAuthContext}