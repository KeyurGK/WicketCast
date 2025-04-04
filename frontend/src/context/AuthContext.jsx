// AuthContext.js
import { createContext, useContext, useState } from "react";
import { useGoogleLogin, googleLogout } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { setLocalStorage, removeLocalStorage } from "../utils/localStorage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const login = useGoogleLogin({
        onSuccess: (response) => {
            // console.log("Google response:", response);
            setLocalStorage("access_token", response.access_token); // Store token
            setIsAuthenticated(true); // Update auth status
            navigate("/home"); // Navigate after successful login
        },
        onError: () => {
            console.log("Login failed");
        },
    });

    const logout = () => {
        googleLogout();
        removeLocalStorage("access_token");
        setIsAuthenticated(false);
        navigate("/"); // Navigate to landing page after logout
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook to use auth context
export const useAuth = () => useContext(AuthContext);
