import { apiFetch } from '../utils/httpClients';

// Lista exemplares com filtros opcionais (ex: { filtro: 'acervo' })
export const listar = async (filters = {}) => {
    const queryString = new URLSearchParams(filters).toString();
    const url = queryString ? `/exemplares?${queryString}` : '/exemplares';

    return await apiFetch(url);
};

// Busca uma exemplar pelo ID
export const buscarPorId = async (id) => {
    return await apiFetch(`/exemplares/${id}`);
};

// Atualiza apenas o estado do exemplar
export const atualizarEstado = async (id, estado) => {
    return await apiFetch(`/exemplares/${id}/estado`, {
        method: 'PATCH',
        body: JSON.stringify({ estado: estado })
    });
};

// Baixa do exemplar existente
export const baixar = async (id, dados) => {
    return await apiFetch(`/exemplares/${id}/baixa`, {
        method: 'PUT',
        body: JSON.stringify(dados)
    });
};

