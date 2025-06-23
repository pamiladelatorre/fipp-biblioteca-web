import { apiFetch } from '../utils/httpClients';

// Cria uma nova entrada
export const criar = async (dados) => {
    return await apiFetch('/entradas-acervo', {
        method: 'POST',
        body: JSON.stringify(dados)
    });
};

// Lista entradas de acervo com filtros opcionais (ex: { filtro: 'nome' })
export const listar = async (filters = {}) => {
    const queryString = new URLSearchParams(filters).toString();
    const url = queryString ? `/entradas-acervo?${queryString}` : '/entradas-acervo';

    return await apiFetch(url);
};

// Busca uma entrada pelo ID
export const buscarPorId = async (id) => {
    return await apiFetch(`/entradas-acervo/${id}`);
};

// Atualiza os dados de uma entrada existente
export const atualizar = async (id, dados) => {
    return await apiFetch(`/entradas-acervo/${id}`, {
        method: 'PUT',
        body: JSON.stringify(dados)
    });
};
