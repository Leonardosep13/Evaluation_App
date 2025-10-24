import { useState } from "react"
import { useAuth } from "./useAuth";
import { getSubjectsApi, createSubjectApi, deleteSubjectApi} from "../api/subject";

export function useSubject() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [subjects, setSubjects] = useState(null);
    const { auth } = useAuth();

    const getSubjects = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await getSubjectsApi(auth.token.access);
            setSubjects(response);
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    };

    const createSubject = async (formValue) => {
        try {
            setLoading(true);
            setError(null);
            const response = await createSubjectApi(auth.token.access, formValue);
            setLoading(false);
            return response;
        }
        catch (error) { 
            setError(error);
            setLoading(false);
            throw error;
        }
    };

    const deleteSubject = async (subjectId) => {
        try{
            setLoading(true);
            setError(null);
            const response = await deleteSubjectApi(auth.token.access, subjectId);
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
        subjects,
        getSubjects,
        createSubject,
        deleteSubject,
    };

}
