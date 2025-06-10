import { apiFetch } from '../utils/httpClients';

// Lista movimentações com filtros opcionais (ex: { filtro: 'acervo' })
export const listar = async (filters = {}) => {
    const queryString = new URLSearchParams(filters).toString();
    const url = queryString ? `/movimentacoes-exemplar?${queryString}` : '/movimentacoes-exemplar';

    return await apiFetch(url);
};
