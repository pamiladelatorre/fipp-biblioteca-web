import { apiFetch } from '../utils/httpClients';

// Lista infrações com filtros opcionais (ex: { filtro: 'acervo' })
export const listar = async (filters = {}) => {
    const queryString = new URLSearchParams(filters).toString();
    const url = queryString ? `/infracoes?${queryString}` : '/infracoes';

    return await apiFetch(url);
};
