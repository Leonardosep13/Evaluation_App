import { BASE_API } from "../utils/constants";

export async function getSubjectsApi(token) {
    try {
        const url = `${BASE_API}/subjects/`;
        const params = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
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
    