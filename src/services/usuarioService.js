import { apiFetch } from '../utils/httpClients';

// Cria um novo usuario
export const criar = async (dados) => {
    return await apiFetch('/usuarios', {
        method: 'POST',
        body: JSON.stringify(dados)
    });
};

// Lista motivos baixa com filtros opcionais (ex: { filtro: 'nome' })
export const listar = async (filters = {}) => {
    const queryString = new URLSearchParams(filters).toString();
    const url = queryString ? `/usuarios?${queryString}` : '/usuarios';

    return await apiFetch(url);
};

// Busca um usuario pelo ID
export const buscarPorId = async (id) => {
    return await apiFetch(`/usuarios/${id}`);
};

// Atualiza os dados de um usuario existente
export const atualizar = async (id, dados) => {
    return await apiFetch(`/usuarios/${id}`, {
        method: 'PUT',
        body: JSON.stringify(dados)
    });
};

// Atualiza apenas o status "ativo" do usuario
export const atualizarAtivo = async (id, dados) => {
    return await apiFetch(`/usuarios/${id}/ativo`, {
        method: 'PATCH',
        body: JSON.stringify(dados)
    });
};