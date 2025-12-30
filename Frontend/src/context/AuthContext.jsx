import { createContext, useState, useEffect, useContext } from 'react';
import { api } from '../utils/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                // Decode token payload (base64)
                const payload = JSON.parse(atob(token.split('.')[1]));
                // Check if expired (exp is in seconds)
                if (Date.now() >= payload.exp * 1000) {
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    setUser(null);
                } else {
                    const storedUser = JSON.parse(localStorage.getItem('user'));
                    if (storedUser) setUser(storedUser);
                }
            } catch (e) {
                // If decoding fails, clear everything
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                setUser(null);
            }
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        const data = await api.post('/auth/login', { email, password });
        if (data.success) {
            localStorage.setItem('token', data.data.token);
            localStorage.setItem('user', JSON.stringify(data.data.user));
            setUser(data.data.user);
            return { success: true };
        }
        return { success: false, message: data.message };
    };

    const register = async (email, password, role) => {
        const data = await api.post('/auth/register', { email, password, role });
        return data;
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
