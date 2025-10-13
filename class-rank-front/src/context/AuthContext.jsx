import React, { createContext, useEffect, useState } from 'react';
import { getToken, setToken, removeToken } from '../api/token';
import { useUser } from '../hooks/useUser';

export const AuthContext = createContext({
    user: null,
    login: () => null,
    logout: () => {},
});

export function AuthProvider(props) {
    const { children } = props;
    const [ auth, setAuth] = useState(undefined)
    const { getMeData } = useUser();

    const login = async (token) => {
        setToken(token);
        const me = await getMeData(token.access);
        setAuth({me,token});
    }

    const logout = () => {
        if (auth) {
            removeToken();
            setAuth(null);
        }
    }

    useEffect(() => {
        (async () => {
            const token = getToken();
            if (token)
            {
                const me = await getMeData(token.access);
                setAuth({me,token});
                console.log(auth)
            }
            else
                setAuth(null);

        })();
    }, [getMeData]);

    const valueContext = {
        auth,
        login,
        logout,
    }

    if (auth === undefined) return null; 

return (
    <AuthContext.Provider value={valueContext}> 
        {children} 
    </AuthContext.Provider>
    );
}