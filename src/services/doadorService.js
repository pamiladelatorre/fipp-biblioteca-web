import { apiFetch } from '../utils/httpClients';

// Cria um novo doador
export const criar = async (dados) => {
    return await apiFetch('/doadores', {
        method: 'POST',
        body: JSON.stringify(dados)
    });
};

// Lista doadores com filtros opcionais (ex: { filtro: 'nome' })
export const listar = async (filters = {}) => {
    const queryString = new URLSearchParams(filters).toString();
    const url = queryString ? `/doadores?${queryString}` : '/doadores';

    return await apiFetch(url);
};

/* Busca um doador pelo ID
//export const buscarAtivos = async () => {
    return await apiFetch('/doadores/ativos');
};
*/
// Busca um doador pelo ID
export const buscarPorId = async (id) => {
    return await apiFetch(`/doadores/${id}`);
};

// Atualiza os dados de um doador existente
export const atualizar = async (id, dados) => {
    return await apiFetch(`/doadores/${id}`, {
        method: 'PUT',
        body: JSON.stringify(dados)
    });
};

// Atualiza apenas o status "ativo" do doador
export const atualizarAtivo = async (id, dados) => {
    return await apiFetch(`/doadores/${id}/ativo`, {
        method: 'PATCH',
        body: JSON.stringify(dados)
    });
};