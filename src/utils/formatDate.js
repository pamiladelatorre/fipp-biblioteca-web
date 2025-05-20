/**
 * Formata uma data para o padrão brasileiro (DD/MM/AAAA)
 * @param {string|Date} date
 * @returns {string|null}
 */
function formatDateToBR(date)  {
    if (!date) return null;

    const parsedDate = new Date(date);
    if (isNaN(parsedDate)) return null;

    return parsedDate.toLocaleDateString('pt-BR');
};

/**
 * Formata uma data com hora para o padrão brasileiro (DD/MM/AAAA HH:MM:SS)
 * @param {string|Date} date
 * @returns {string|null}
 */
function formatDateTimeToBR(date) {
    if (!date) return null;

    const parsedDate = new Date(date);
    if (isNaN(parsedDate)) return null;

    const datePart = formatDateToBR(parsedDate);
    const timePart = parsedDate.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });

    return `${datePart} ${timePart}`;
};

export {
    formatDateToBR,
    formatDateTimeToBR
};