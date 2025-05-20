import { publicFetch } from "../utils/httpClients.js";

export const login = async (email, password) => {
    const body = JSON.stringify({ email, senha: password });
    return await publicFetch('/auth/login', {
        method: 'POST', 
        body,
    });
};

export const logout = () => {
    localStorage.removeItem('token');
};
