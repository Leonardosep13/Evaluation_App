import { BASE_API } from "../utils/constants";

export async function getStudentsApi()
{
    try{
        const url = `${BASE_API}/academics/students/`;
        const params = {
            method: 'GET',
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
    catch (error){
        throw error;
    }
}

export async function createStudentApi(formValue)
{
    try{
        const url = `${BASE_API}/academics/students/`;
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

export async function deleteStudentApi(studentId)
{
    try{
        const url = `${BASE_API}/academics/students/${studentId}/`;
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

export async function updateStudentApi(studentId, formValue)
{
    try{
        const url = `${BASE_API}/academics/students/${studentId}/`;
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