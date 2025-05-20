/**
 * Extrai mensagem amigável de erro de uma exceção lançada por apiFetch
 * Pode ser usada em toast, logs ou exibição genérica
 */
export function getErrorMessage(error, fallbackMessage = 'Erro genérico') {
    if (!error) return fallbackMessage;
  
    if (typeof error === 'string') return error;
  
    if (typeof error.message === 'string') return error.message;
  
    if (error.details?.message) return error.details.message;
  
    return fallbackMessage;
  }
  