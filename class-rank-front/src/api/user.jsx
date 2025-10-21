import { BASE_API } from "../utils/constants";

export async function loginApi(formValue) {

    try 
    {
        const url = `${BASE_API}/auth/login/`;
        const params = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formValue),
    };

    const response = await fetch(url, params);

        if (response.status !== 200)
        {
            throw new Error("Usuario o contraseña incorrectos");
        }
        
    const result = await response.json();
    return result;
    }

    catch (error) 
    {
        console.error("Error al iniciar sesión:", error);
        throw error;
    }


}

export async function getMeApi(token) {
    try {
        const url = `${BASE_API}/auth/me/`;
        const params = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };

        const response = await fetch(url, params);

        if (response.status === 403) {
            throw new Error("No autorizado. Verifica tu token.");
        }

        const result = await response.json();
        return result;
    } 
    catch (error) 
    {
        throw error;
    }
}

export async function getUsersApi(token)
{
    try
    {
        const url = `${BASE_API}/users/`;
        const params = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };

        const response = await fetch(url, params);
        const result = await response.json();
        return result;
    } 
    catch (error) 
    {
        throw error;
    }
}

export async function createUserApi(token, formValue)
{
    try{
        const url = `${BASE_API}/users/`;
        const params = {
            method: "POST",
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${token}`,
            },
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

export async function deleteUserApi(token, userId)
{
    try{
        const url = `${BASE_API}/users/${userId}/`;
        const params = {
            method: "DELETE",
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };
        const response = await fetch(url, params);
        if (response.status !== 204){
            const result = await response.json();
            throw result;
        }
        return true;
    }
    catch (error){
        throw error;
    }
}

export async function updateUserApi(token, userId, formValue)
{
    try{
        const url = `${BASE_API}/users/${userId}/`;
        const params = {
            method: "PUT",
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${token}`,
            },
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
