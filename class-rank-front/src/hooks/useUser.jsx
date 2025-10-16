import { getMeApi, getUsersApi } from '../api/user';
import { useState } from 'react';
import { useAuth } from './useAuth';

export function useUser() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [users, setUsers] = useState(null);
    const { auth } = useAuth();

    const getMeData = async (token) => {
        try {
            const response = await getMeApi(token);
            return response;
        } catch (error) {
            throw error;
        }
    };

    const getUsers = async () => {
        try {
            setLoading(true);
            const response = await getUsersApi(auth.token.access);
            setUsers(response);
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    };

    return {
        loading,
        error,
        users,
        getMeData,
        getUsers,
    };
}