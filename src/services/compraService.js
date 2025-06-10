import { apiFetch } from '../utils/httpClients';

// Lista compras com filtros opcionais (ex: { filtro: 'acervo' })
export const listar = async (filters = {}) => {
    const queryString = new URLSearchParams(filters).toString();
    const url = queryString ? `/compras?${queryString}` : '/compras';

    return await apiFetch(url);
};
