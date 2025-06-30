import React, { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser, getAuthToken, clearAuthToken, User } from "../services/authService";
import { ReactChildren } from "../../../App";

interface IAuthContext {
    user: User | null;
    token: string;
    isLoading: boolean;
    setUser: (user: User | null) => void;
    setToken: (token: string) => void;
    clearAuth: () => void;
    clearToken: () => void;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

const AuthProvider: React.FC<ReactChildren> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState(getAuthToken());
    const [isLoading, setIsLoading] = useState(true);

    const clearAuth = () => {
        setUser(null);
        setToken("");
        clearAuthToken();
    };

    const clearToken = () => {
        clearAuth();
    };

    useEffect(() => {
        const initAuth = async () => {
            if (token) {
                try {
                    const currentUser = await getCurrentUser();
                    setUser(currentUser);
                } catch (error) {
                    console.error("Error getting current user:", error);
                    clearAuth();
                }
            }
            setIsLoading(false);
        };

        initAuth();
    }, [token]);

    const value: IAuthContext = {
        user,
        token,
        isLoading,
        setUser,
        setToken,
        clearAuth,
        clearToken,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
export const useAuth = () => useContext(AuthContext);