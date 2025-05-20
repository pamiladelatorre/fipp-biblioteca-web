export function useConfirmationDialog(message = "Tem certeza?") {
    const confirm = async (callback) => {
        if (window.confirm(message)) {
            await callback();
        }
    };

    return confirm;
}

// Exemplo
// const confirmToggle = useConfirmationDialog("Deseja alterar o status da categoria?");
// const handleToggleStatus = (categoria) => {
//     confirmToggle(() => toggleStatus(categoria));
// };
