import { BASE_API } from "../utils/constants";

export async function getSubjectsApi() {
    try {
        const url = `${BASE_API}/academics/subjects/`;
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

export async function createSubjectApi(formValue) {
    try{
        const url = `${BASE_API}/academics/subjects/`;
        const params = {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(formValue),
        };
        const response = await fetch(url, params);
        if (response.status !== 201){
            const result = await response.json();
            throw result;
        }
        const result = await response.json();
        return result;
    }
    catch (error){
        throw error;
    }
}

export async function deleteSubjectApi(subjectId) {
    try{
        const url = `${BASE_API}/academics/subjects/${subjectId}/`;
        const params = {
            method: "DELETE",
            headers: {
                "content-type": "application/json",
            },
            credentials: "include",
        };
        const response = await fetch(url, params);
        if (response.status !== 204){
            const result = await response.json();
            throw result;
        }
        return;
    }
    catch (error){
        throw error;
    }
}

export async function updateSubjectApi(subjectId, formValue) {
    try{
        const url = `${BASE_API}/academics/subjects/${subjectId}/`;
        const params = {
            method: "PUT",
            headers: {
                "content-type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(formValue),
        };
        const response = await fetch(url, params);
        if (response.status !== 200){
            const result = await response.json();
            throw result;
        }
        const result = await response.json();
        return result;
    }
    catch (error){
        throw error;
    }
}