import React, { createContext, useEffect, useState, useCallback } from 'react';
import { getToken, setToken, removeToken } from '../api/token';
import { getMeApi } from '../api/user';

export const AuthContext = createContext({
    user: null,
    login: () => null,
    logout: () => {},
});

export function AuthProvider(props) {
    const { children } = props;
    const [auth, setAuth] = useState(undefined);
    const [isLoading, setIsLoading] = useState(true);

    const getMeData = useCallback(async (token) => {
        try {
            const me = await getMeApi(token);
            return me;
        } catch (error) {
            console.error('Error getting user data:', error);
            throw error;
        }
    }, []);

    const login = async (token) => {
        try {
            setToken(token);
            const me = await getMeData(token.access);
            setAuth({ me, token });
        } catch (error) {
            console.error('Error during login:', error);
            removeToken();
            setAuth(null);
            throw error;
        }
    };

    const logout = () => {
        if (auth) {
            removeToken();
            setAuth(null);
        }
    };

    useEffect(() => {
        const initializeAuth = async () => {
            try {
                setIsLoading(true);
                const token = getToken();
                
                if (token) {
                    const me = await getMeData(token.access);
                    setAuth({ me, token });
                } else {
                    setAuth(null);
                }
            } catch (error) {
                console.error('Error initializing auth:', error);
                removeToken();
                setAuth(null);
            } finally {
                setIsLoading(false);
            }
        };

        initializeAuth();
    }, []);

    const valueContext = {
        auth,
        login,
        logout,
        isLoading,
    };

    if (isLoading) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="text-center">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Cargando...</span>
                    </div>
                    <p className="mt-2 text-muted">Verificando sesión...</p>
                </div>
            </div>
        );
    }

    return (
        <AuthContext.Provider value={valueContext}>
            {children}
        </AuthContext.Provider>
    );
}