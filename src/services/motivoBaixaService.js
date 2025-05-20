import { apiFetch } from '../utils/httpClients';

// Cria um novo motivo baixa
export const criar = async (dados) => {
    return await apiFetch('/motivos-baixa', {
        method: 'POST',
        body: JSON.stringify(dados)
    });
};

// Lista motivos baixa com filtros opcionais (ex: { filtro: 'nome' })
export const listar = async (filters = {}) => {
    const queryString = new URLSearchParams(filters).toString();
    const url = queryString ? `/motivos-baixa?${queryString}` : '/motivos-baixa';

    return await apiFetch(url);
};

// Busca um motivo baixa pelo ID
export const buscarPorId = async (id) => {
    return await apiFetch(`/motivos-baixa/${id}`);
};

// Atualiza os dados de um motivo baixa existente
export const atualizar = async (id, dados) => {
    return await apiFetch(`/motivos-baixas/${id}`, {
        method: 'PUT',
        body: JSON.stringify(dados)
    });
};

// Atualiza apenas o status "ativo" do motivo baixa
export const atualizarAtivo = async (id, dados) => {
    return await apiFetch(`/motivos-baixa/${id}/ativo`, {
        method: 'PATCH',
        body: JSON.stringify(dados)
    });
};