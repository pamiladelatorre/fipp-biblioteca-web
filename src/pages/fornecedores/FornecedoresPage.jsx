import { useState, useEffect } from 'react';
import { Stack, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import * as fornecedorService from '../../services/fornecedorService.js';
import { useDebounce } from '../../hooks/useDebounce.js';
import { useLoading } from '../../hooks/useLoading.js';
import { getErrorMessage } from '../../utils/handleApiError.js';
import FornecedorFilters from './components/FornecedorFilters.jsx';
import LoadingBar from '../../components/loading-bar/LoadingBar.jsx';
import FornecedoresTable from './components/FornecedoresTable.jsx';

function FornecedoresPage(){
    const [fornecedores, setFornecedores] = useState([]);
    const [filters, setFilters] = useState({ cnpj: '', razaoSocial: '', representante: '', telefone: '', email: '', ativo: '' });
    const debouncedFilter = useDebounce(filters, 500);
    const { loading, startLoading, stopLoading } = useLoading();
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
        setFilters({ cnpj: '', razaoSocial: '', representante: '', telefone: '', email: '', ativo: '' });
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
        startLoading();
        fornecedorService.listar(filters).then((response) => {
            setFornecedores(response?.data || []);
        }).catch((error) => {
            toast.error(getErrorMessage(error, 'Erro ao buscar fornecedores'));
        }).finally(() => {
            stopLoading();
        });
    };



    const handleGerarExcel = async () => {
    try {
        const response = await fetch('http://localhost:3000/api/relatorios/fornecedores/excel');
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'fornecedores.xlsx';
        a.click();
        window.URL.revokeObjectURL(url);
    } catch (error) {
        toast.error('Erro ao gerar Excel');
        console.error(error);
    }
};

const handleGerarPDF = async () => {
    try {
        const response = await fetch('http://localhost:3000/api/relatorios/fornecedores/pdf');
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'fornecedores.pdf';
        a.click();
        window.URL.revokeObjectURL(url);
    } catch (error) {
        toast.error('Erro ao gerar PDF');
        console.error(error);
    }
};





    

    return(
        <Stack>
            <div className="page-header-action">
                <Button onClick={() => navigate('/cadastros/fornecedores/novo')}>
                    <i className="bi bi-plus-lg"></i> Novo
                </Button>

                <Button variant="success" onClick={handleGerarExcel}>
                        <i className="bi bi-file-earmark-excel"></i> Excel
                </Button>
                <Button variant="danger" onClick={handleGerarPDF}>
                <i className="bi bi-file-earmark-pdf"></i> PDF
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
                {loading && <LoadingBar />}
                <FornecedoresTable 
                    fornecedores={fornecedores} 
                    onEdit={handleEdit} 
                    onToggleAtivo={handleToggleAtivo} 
                />
            </div>
        </Stack>
    );
};

export default FornecedoresPage;