import { BASE_API } from '../utils/constants';

interface LoginFormData {
  email_teacher: string;
  password: string;
}

interface LoginResponse {
  refresh: string;
  access: string;
}

export async function loginApi(formData: LoginFormData): Promise<LoginResponse> {
        const url = `${BASE_API}/auth/login/`;
        const params = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        };
        const response: Response = await fetch(url, params);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result: LoginResponse = await response.json();
        return result;
    }
