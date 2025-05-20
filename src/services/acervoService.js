import { apiFetch } from '../utils/httpClients';

// Cria uma nova acervo
export const criar = async (dados) => {
    return await apiFetch('/acervos', {
        method: 'POST',
        body: JSON.stringify(dados)
    });
};

// Lista acervos com filtros opcionais (ex: { filtro: 'nome' })
export const listar = async (filters = {}) => {
    const queryString = new URLSearchParams(filters).toString();
    const url = queryString ? `/acervos?${queryString}` : '/acervos';

    return await apiFetch(url);
};

// Busca uma acervo pelo ID
export const buscarPorId = async (id) => {
    return await apiFetch(`/acervos/${id}`);
};

// Atualiza os dados de uma acervo existente
export const atualizar = async (id, dados) => {
    return await apiFetch(`/acervos/${id}`, {
        method: 'PUT',
        body: JSON.stringify(dados)
    });
};

// Atualiza apenas o status "ativo" da acervo
export const atualizarAtivo = async (id, dados) => {
    return await apiFetch(`/acervos/${id}/ativo`, {
        method: 'PATCH',
        body: JSON.stringify(dados)
    });
};