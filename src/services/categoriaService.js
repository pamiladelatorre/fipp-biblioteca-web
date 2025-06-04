import { apiFetch } from '../utils/httpClients';

// Cria uma nova categoria
export const criar = async (dados) => {
    return await apiFetch('/categorias', {
        method: 'POST',
        body: JSON.stringify(dados)
    });
};

// Lista categorias com filtros opcionais (ex: { filtro: 'nome' })
export const listar = async (filters = {}) => {
    const queryString = new URLSearchParams(filters).toString();
    const url = queryString ? `/categorias?${queryString}` : '/categorias';

    return await apiFetch(url);
};

// Busca um categorias ativas
export const buscarAtivas = async () => {
    return await apiFetch('/categorias/ativas');
};

// Busca uma categoria pelo ID
export const buscarPorId = async (id) => {
    return await apiFetch(`/categorias/${id}`);
};

// Atualiza os dados de uma categoria existente
export const atualizar = async (id, dados) => {
    return await apiFetch(`/categorias/${id}`, {
        method: 'PUT',
        body: JSON.stringify(dados)
    });
};

// Atualiza apenas o status "ativo" da categoria
export const atualizarAtivo = async (id, dados) => {
    return await apiFetch(`/categorias/${id}/ativo`, {
        method: 'PATCH',
        body: JSON.stringify(dados)
    });
};