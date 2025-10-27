import { useState } from "react";
import { getStudentsApi } from "../api/student";
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

    return {
        loading,
        error,
        students,
        getStudents,
    };
}