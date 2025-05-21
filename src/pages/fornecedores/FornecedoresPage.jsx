import { useState, useEffect } from 'react';
import { Stack, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import * as fornecedorService from '../../services/fornecedorService.js';
import { useDebounce } from '../../hooks/useDebounce.js';
import { useLoading } from '../../hooks/useLoading.js';
import { getErrorMessage } from '../../utils/handleApiError.js';
import FornecedorFilters from './components/FornecedorFilters.jsx';
import FornecedoresTable from './components/FornecedoresTable.jsx';

function FornecedoresPage(){
    const [fornecedores, setFornecedores] = useState([]);
    const [filters, setFilters] = useState({
        razaoSocial: '',
        ativo: '',
    });
    const debouncedFilter = useDebounce(filters, 500);
    const { loading, start, stop } = useLoading();
    const navigate = useNavigate();

    // Faz uma busca no banco com base no filtro (com debounce aplicado)
    useEffect(() => {
            buscarFornecedores(debouncedFilter);
    }, [debouncedFilter]);

    // Atualiza useState do filtro
    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

    const handleClearFilters = () => {
        setFilters({ razaoSocial: '', ativo: '' });
    };
    
    // Preenche o formulário com os dados do banco ao clicar em editar
    const handleEdit = async (fornecedorId) => {
        navigate(`/cadastros/fornecedores/${fornecedorId}`);
    };

    // Altera o status ativo da fornecedor
    const handleToggleAtivo = async (fornecedor) => {
        const dadosAtualizados = { ativo: !fornecedor.ativo };
        const apiPromise = fornecedorService.atualizarAtivo(fornecedor.id, dadosAtualizados);

        toast.promise(apiPromise, {
            pending: `${dadosAtualizados.ativo ? 'Ativando' : 'Inativando'} fornecedor...`,
            success: `Fornecedor ${dadosAtualizados.ativo ? 'ativada' : 'inativada'} com sucesso!`,
            error: {
                render({ data }) {
                    return getErrorMessage(data, 'Falha ao alterar status');
                }
            }
        });
    
        try {
            await apiPromise;
            buscarFornecedores();
        } catch (_) {
            // erro já tratado pelo toast.promise
        }        
    };

    // Carrega a lista de fornecedores, com ou sem filtro
    const buscarFornecedores = (filters = {}) => {
        start();
        fornecedorService.listar(filters).then((response) => {
            setFornecedores(response?.data || []);
        }).catch((error) => {
            toast.error(getErrorMessage(error, 'Erro ao buscar fornecedores'));
        }).finally(() => {
            stop();
        });
    };

    return(
        <Stack>
            <div className="page-header-action">
                <Button onClick={() => navigate('/cadastros/fornecedores/novo')}>
                    <i className="bi bi-plus-lg"></i> Novo
                </Button>
            </div>
            <div>
                <FornecedorFilters 
                    filters={filters} 
                    onFilterChange={handleFilterChange} 
                    onClearFilters={handleClearFilters} 
                />
            </div>
            <div>
                <FornecedoresTable 
                    fornecedores={fornecedores} 
                    loading={loading} 
                    onEdit={handleEdit} 
                    onToggleAtivo={handleToggleAtivo} 
                />
            </div>
        </Stack>
    );
};

export default FornecedoresPage;