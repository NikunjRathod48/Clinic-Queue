import { createContext, useContext, useEffect, useState } from "react";
import api from "../utils/api";

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used within Authprovider")
    }

    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            try {
                const payload = JSON.parse(atob(token.split('.')[1]));
                setUser(payload);
            } catch (error) {
                console.log(error)
                localStorage.removeItem("token");
            }
        }

        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const response = await api.post("/auth/login", {
                email,
                password
            });
            

            if (!response.data.error) {
                const token = response.data.token;
                localStorage.setItem("token", token);

                const payload = JSON.parse(atob(token.split('.')[1]));
                setUser(payload);

                return { success: true };
            }
            else{
                return{
                    success : false,
                    message : response.data.message
                }
            }
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || "Login Failed"
            }
        }
    }

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    )
}