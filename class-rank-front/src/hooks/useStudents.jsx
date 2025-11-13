import { useState } from "react";
import { getStudentsApi, createStudentApi, deleteStudentApi, updateStudentApi } from "../api/student";

export function useStudents() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [students, setStudents] = useState(null);

    const getStudents = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await getStudentsApi();
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
            const response = await createStudentApi(formValue);
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
            const response = await deleteStudentApi(studentId);
            setLoading(false);
            return response;
        }
        catch (error){
            setError(error);
            setLoading(false);
            throw error;
        }
    };

    const UpdateStudent = async (studentId, formValue) => {
        try{
            setLoading(true);
            setError(null);
            const response = await updateStudentApi(studentId, formValue);
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
        UpdateStudent,
    };
}