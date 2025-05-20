import { apiFetch } from '../utils/httpClients';

// Cria um novo fornecedor
export const criar = async (dados) => {
    return await apiFetch('/fornecedores', {
        method: 'POST',
        body: JSON.stringify(dados)
    });
};

// Lista fornecedores com filtros opcionais (ex: { filtro: 'nome' })
export const listar = async (filters = {}) => {
    const queryString = new URLSearchParams(filters).toString();
    const url = queryString ? `/fornecedores?${queryString}` : '/fornecedores';

    return await apiFetch(url);
};

// Busca um fornecedor pelo ID
export const buscarPorId = async (id) => {
    return await apiFetch(`/fornecedores/${id}`);
};

// Atualiza os dados de um fornecedor existente
export const atualizar = async (id, dados) => {
    return await apiFetch(`/fornecedores/${id}`, {
        method: 'PUT',
        body: JSON.stringify(dados)
    });
};

// Atualiza apenas o status "ativo" do fornecedor
export const atualizarAtivo = async (id, dados) => {
    return await apiFetch(`/fornecedores/${id}/ativo`, {
        method: 'PATCH',
        body: JSON.stringify(dados)
    });
};