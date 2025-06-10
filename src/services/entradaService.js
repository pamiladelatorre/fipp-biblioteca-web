import { apiFetch } from '../utils/httpClients';

// Lista entradas de acervo com filtros opcionais (ex: { filtro: 'nome' })
export const listar = async (filters = {}) => {
    const queryString = new URLSearchParams(filters).toString();
    const url = queryString ? `/entradas-acervo?${queryString}` : '/entradas-acervo';

    return await apiFetch(url);
};
