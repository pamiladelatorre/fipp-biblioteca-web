import { apiFetch } from '../utils/httpClients';

// Cria uma nova autor
export const criar = async (dados) => {
    return await apiFetch('/autores', {
        method: 'POST',
        body: JSON.stringify(dados)
    });
};

// Lista autores com filtros opcionais (ex: { filtro: 'nome' })
export const listar = async (filters = {}) => {
    const queryString = new URLSearchParams(filters).toString();
    const url = queryString ? `/autores?${queryString}` : '/autores';

    return await apiFetch(url);
};

// Busca uma autor pelo ID
export const buscarPorId = async (id) => {
    return await apiFetch(`/autores/${id}`);
};

// Atualiza os dados de uma autor existente
export const atualizar = async (id, dados) => {
    return await apiFetch(`/autores/${id}`, {
        method: 'PUT',
        body: JSON.stringify(dados)
    });
};

// Atualiza apenas o status "ativo" da autor
export const atualizarAtivo = async (id, dados) => {
    return await apiFetch(`/autores/${id}/ativo`, {
        method: 'PATCH',
        body: JSON.stringify(dados)
    });
};