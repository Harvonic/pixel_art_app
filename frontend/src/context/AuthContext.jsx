import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser } from "../api/auth.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        async function checkSession() {
            const currentUser = await getCurrentUser();
            setUser(currentUser);
            setIsLoading(false);
        }

        checkSession();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, isLoading}}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}

