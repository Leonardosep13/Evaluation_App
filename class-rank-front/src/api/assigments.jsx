import { BASE_API } from "../utils/constants";

export async function getAssigmentsApi() {
    try {
        const url = `${BASE_API}/academics/teacher-qualifications/`;
        const params = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        };
        const response = await fetch(url, params);
        if (response.status !== 200) {
            const result = await response.json();
            throw result;
        }
        const result = await response.json();
        return result;
    }
    catch (error) 
    {
        throw error;
    }
}