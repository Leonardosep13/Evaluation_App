import { useState } from "react"
import { useAuth } from "./useAuth";

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

    return {
        loading,
        error,
        subjects,
        getSubjects,
    };

}
