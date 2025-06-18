import { apiFetch } from '../utils/httpClients';

// Lista infrações com filtros opcionais (ex: { filtro: 'acervo' })
export const listar = async (filters = {}) => {
    const queryString = new URLSearchParams(filters).toString();
    const url = queryString ? `/infracoes?${queryString}` : '/infracoes';

    return await apiFetch(url);
};
export const criar = async (dados) => {
    return await apiFetch('/infracoes', {
        method: 'POST',
        body: JSON.stringify(dados)
    });
};
export const atualizar = async (id, dados) => {
    return await apiFetch(`/infracoes/${id}`, {
        method: 'PUT',
        body: JSON.stringify(dados)
    });
};
export const buscarPorId = async (id) => {
    return await apiFetch(`/infracoes/${id}`);
};
