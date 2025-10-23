import { getMeApi, getUsersApi, createUserApi, deleteUserApi, updateUserApi } from '../api/user';
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
            setError(null);
            const response = await getUsersApi(auth.token.access);
            setUsers(response);
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    };

    const createUser = async (formValue) => {
        try {
            setLoading(true);
            setError(null);
            const response = await createUserApi(auth.token.access, formValue);
            setLoading(false);
            return response;
        } catch (error) {
            setError(error);
            setLoading(false);
            throw error;
        }
    };

    const deleteUser = async (userId) => {
        try{
            setLoading(true);
            setError(null);
            const response = await deleteUserApi(auth.token.access, userId);
            setLoading(false);
            return response;
        }
        catch (error){
            setError(error);
            setLoading(false);
            throw error;
        }
    };

    const updateUser = async (userId, formValue) => {
        try{
            setLoading(true);
            setError(null);
            const response = await updateUserApi(auth.token.access, userId, formValue);
            setLoading(false);
            return response;
        }
        catch (error){
            setError(error);
            setLoading(false);
            throw error;
        }
    };

    return {
        loading,
        error,
        users,
        getMeData,
        getUsers,
        createUser,
        deleteUser,
        updateUser,
    };
}