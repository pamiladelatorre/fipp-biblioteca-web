import { apiFetch } from '../utils/httpClients';

// Cria um novo genero
export const criar = async (dados) => {
    return await apiFetch('/generos', {
        method: 'POST',
        body: JSON.stringify(dados)
    });
};

// Lista generos com filtros opcionais (ex: { filtro: 'nome' })
export const listar = async (filters = {}) => {
    const queryString = new URLSearchParams(filters).toString();
    const url = queryString ? `/generos?${queryString}` : '/generos';

    return await apiFetch(url);
};

// Busca um genero pelo ID
export const buscarPorId = async (id) => {
    return await apiFetch(`/generos/${id}`);
};

// Atualiza os dados de um genero existente
export const atualizar = async (id, dados) => {
    return await apiFetch(`/generos/${id}`, {
        method: 'PUT',
        body: JSON.stringify(dados)
    });
};

// Atualiza apenas o status "ativo" do genero
export const atualizarAtivo = async (id, dados) => {
    return await apiFetch(`/generos/${id}/ativo`, {
        method: 'PATCH',
        body: JSON.stringify(dados)
    });
};