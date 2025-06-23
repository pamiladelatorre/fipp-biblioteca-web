import { apiFetch } from '../utils/httpClients';

const BASE_URL = '/movimentacoes-exemplar';

// Lista movimentações com filtros opcionais (ex: { filtro: 'acervo' })
export const listar = async (filters = {}) => {
  const queryString = new URLSearchParams(filters).toString();
  const url = queryString ? `${BASE_URL}?${queryString}` : BASE_URL;
  return await apiFetch(url);
};

// Busca movimentação por ID
export const buscarPorId = async (id) => {
  return await apiFetch(`${BASE_URL}/${id}`);
};

// Cria nova movimentação (ex: empréstimo)
export const criar = async (dados) => {
  return await apiFetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dados),
  });
};

// Atualiza movimentação existente por ID
export const atualizar = async (id, dados) => {
  return await apiFetch(`${BASE_URL}/devolucao`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dados),
  });
};

// Remove movimentação por ID
export const remover = async (id) => {
  return await apiFetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  });
};
// Registra devolução - chama PUT ou POST no endpoint correto
export const registrarDevolucao = async (dados) => {
  return await apiFetch(`${BASE_URL}/devolucao`, {
    method: 'PUT', // ou 'POST' conforme o backend
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dados),
  });
};
// Renova movimentação (empréstimo) por ID
export const renovar = async (id) => {
  return await apiFetch(`${BASE_URL}/${id}/renovar`, {
    method: 'PUT',
  });
};

