import { useState } from "react"
import { getSubjectsApi, createSubjectApi, deleteSubjectApi, updateSubjectApi} from "../api/subject";

export function useSubject() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [subjects, setSubjects] = useState(null);

    const getSubjects = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await getSubjectsApi();
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
            const response = await createSubjectApi(formValue);
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
            const response = await deleteSubjectApi(subjectId);
            setLoading(false);
            return response;
        }
        catch (error){
            setError(error);
            setLoading(false);
            throw error;
        }
    };

    const updateSubject = async (subjectId, formValue) => {
        try{
            setLoading(true);
            setError(null);
            const response = await updateSubjectApi(subjectId, formValue);
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
        updateSubject,
    };

}
