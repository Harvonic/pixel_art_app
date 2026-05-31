import { createContext, useContext, useEffect, useState } from "react";
import {
    getCurrentUser,
    login as loginRequest,
    logout as logoutRequest,
} from "../api/auth.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    async function loginUser(formData) {
        const user = await loginRequest(formData);
        setUser(user);

        return user;
    }

    async function logoutUser() {
        await logoutRequest();
        setUser(null);
    }

    useEffect(() => {

        async function checkSession() {
            try {
                const currentUser = await getCurrentUser();
                setUser(currentUser);

            } catch (err) {
                setUser(null);
            } finally {
                setIsLoading(false);
            }
        }

        checkSession();
    }, []);

    return (
        <AuthContext.Provider value={{ user, isLoading, loginUser, logoutUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}

