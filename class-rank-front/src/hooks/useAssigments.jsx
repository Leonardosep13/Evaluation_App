import { useState } from "react";
import { getAssigmentsApi } from "../api/assigments";

export function useAssigments() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [teacherQualifications, setTeacherQualifications] = useState(null);

    const getTeacherQualifications = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await getAssigmentsApi();
            setTeacherQualifications(response);
            setLoading(false);
        }
        catch (error) {
            setError(error);
            setLoading(false);
        }
    };

    return {
        loading,
        error,
        teacherQualifications,
        getTeacherQualifications
    };
}