import { apiFetch } from '../utils/httpClients';

// Lista exemplares com filtros opcionais (ex: { filtro: 'acervo' })
export const listar = async (filters = {}) => {
    const queryString = new URLSearchParams(filters).toString();
    const url = queryString ? `/exemplares?${queryString}` : '/exemplares';

    return await apiFetch(url);
};
