import { createContext } from 'react';
import { useUser } from '../hooks';
const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const { user, loading, error } = useUser();

    return (
        <AuthContext.Provider value={{ user, loading, error }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthProvider, AuthContext }