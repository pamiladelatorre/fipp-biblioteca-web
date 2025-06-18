import { apiFetch } from '../utils/httpClients';

// Lista movimentações com filtros opcionais (ex: { filtro: 'acervo' })
export const listar = async (filters = {}) => {
  const queryString = new URLSearchParams(filters).toString();
  const url = queryString ? `/movimentacoes-exemplar?${queryString}` : '/movimentacoes-exemplar';
  return await apiFetch(url);
};

// Busca movimentação por ID
export const buscarPorId = async (id) => {
  return await apiFetch(`/movimentacoes-exemplar/${id}`);
};

// Cria nova movimentação (ex: empréstimo)
export const criar = async (dados) => {
  return await apiFetch('/movimentacoes-exemplar', {
    method: 'POST',
    body: JSON.stringify(dados),
  });
};

// Atualiza movimentação existente por ID
export const atualizar = async (id, dados) => {
  return await apiFetch(`/movimentacoes-exemplar/${id}`, {
    method: 'PUT',
    body: JSON.stringify(dados),
  });
};

// Remove movimentação por ID (opcional)
export const remover = async (id) => {
  return await apiFetch(`/movimentacoes-exemplar/${id}`, {
    method: 'DELETE',
  });
};
