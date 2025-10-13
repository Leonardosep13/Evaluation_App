import { getMeApi } from '../api/user';

export function useUser() {
    const getMeData = async (token) => {
        try {
            const response = await getMeApi(token);
            return response;
        } catch (error) {
            throw error;
        }
    };

    return { getMeData };
}