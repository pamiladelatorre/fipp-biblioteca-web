const BASE_URL = 'http://localhost:3000/api';
const BASE_URL_PUBLIC = 'http://localhost:3000';

// Requisições autenticadas (JWT)
export const apiFetch = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  
  const config = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, config);

  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem('token');
      console.warn('Token inválido ou expirado. Redirecionando para login...');
      window.location.href = '/login';
    }

    let errorData;
    try {
      errorData = await response.json();
    } catch {
      errorData = { message: 'Erro genérico' };
    }

    console.error(`Erro na requisição pública: ${response.status}`)
    throw {
      status: response.status,
      message: errorData.message || 'Erro ao processar requisição',
      details: errorData
    };
  }

  // Retorna vazio se for 204 No Content
  if (response.status === 204) {
    return null;
  }

  return response.json();
};

// Requisições públicas (sem JWT)
export const publicFetch = async (endpoint, options = {}) => {
  const config = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  };

  const response = await fetch(`${BASE_URL_PUBLIC}${endpoint}`, config);

  if (!response.ok) {

    let errorData;
    try {
      errorData = await response.json();
    } catch {
      errorData = { message: 'Erro genérico' };
    }

    console.error(`Erro na requisição pública: ${response.status}`)
    throw {
      status: response.status,
      message: errorData.message || 'Erro ao processar requisição pública',
      details: errorData
    };
  }

  // Retorna vazio se for 204 No Content
  if (response.status === 204) {
    return null;
  }

  return response.json();
};