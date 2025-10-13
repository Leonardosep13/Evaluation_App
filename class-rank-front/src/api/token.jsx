import { TOKEN } from "../utils/constants";

export function setToken(token) {
    localStorage.setItem(TOKEN, JSON.stringify(token)); 
}

export function getToken() {
    const token = localStorage.getItem(TOKEN);
    return token ? JSON.parse(token) : null; 
}

export function removeToken() {
    localStorage.removeItem(TOKEN);
}