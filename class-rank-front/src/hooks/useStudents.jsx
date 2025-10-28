import { useState } from "react";
import { getStudentsApi, createStudentApi, deleteStudentApi } from "../api/student";
import { useAuth } from "./useAuth";

export function useStudents() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [students, setStudents] = useState(null);
    const { auth } = useAuth();

    const getStudents = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await getStudentsApi(auth.token.access);
            setStudents(response);
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    };

    const createStudents = async (formValue) => {
        try {
            setLoading(true);
            setError(null);
            const response = await createStudentApi(auth.token.access, formValue);
            setLoading(false);
            return response;
        }
        catch (error) { 
            setError(error);
            setLoading(false);
            throw error;
        }
    };

    const deleteStudents = async (studentId) => {
        try{
            setLoading(true);
            setError(null);
            const response = await deleteStudentApi(auth.token.access, studentId);
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
        students,
        getStudents,
        createStudents,
        deleteStudents,
    };
}