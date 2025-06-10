import { apiFetch } from '../utils/httpClients';

// Cria uma nova assinatura
export const criar = async (dados) => {
    return await apiFetch('/assinaturas', {
        method: 'POST',
        body: JSON.stringify(dados)
    });
};

// Lista assinaturas com filtros opcionais (ex: { filtro: 'descricao' })
export const listar = async (filters = {}) => {
    const queryString = new URLSearchParams(filters).toString();
    const url = queryString ? `/assinaturas?${queryString}` : '/assinaturas';

    return await apiFetch(url);
};

// Busca uma assinatura pelo ID
export const buscarPorId = async (id) => {
    return await apiFetch(`/assinaturas/${id}`);
};

// Atualiza os dados de uma assinatura existente
export const atualizar = async (id, dados) => {
    return await apiFetch(`/assinaturas/${id}`, {
        method: 'PUT',
        body: JSON.stringify(dados)
    });
};

// Atualiza apenas o status "ativo" da assinatura
export const atualizarAtivo = async (id, dados) => {
    return await apiFetch(`/assinaturas/${id}/ativo`, {
        method: 'PATCH',
        body: JSON.stringify(dados)
    });
};
