import { useState, useEffect } from 'react';
import { Stack, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import * as acervoService from '../../services/acervoService.js';
import { useDebounce } from '../../hooks/useDebounce.js';
import { useLoading } from '../../hooks/useLoading.js';
import { getErrorMessage } from '../../utils/handleApiError.js';
import AcervoFilters from './components/AcervoFilters.jsx';
import LoadingBar from '../../components/loading-bar/LoadingBar.jsx';
import AcervosTable from './components/AcervosTable.jsx';

function AcervosPage(){
    const [acervos, setAcervos] = useState([]);
    const [filters, setFilters] = useState({
        titulo: '',
        editora: '',
        isbn: '',
        ativo: '',
    });
    const debouncedFilter = useDebounce(filters, 500);
    const { loading, startLoading, stopLoading } = useLoading();
    const navigate = useNavigate();

    // Faz uma busca no banco com base no filtro (com debounce aplicado)
    useEffect(() => {
            buscarAcervos(debouncedFilter);
    }, [debouncedFilter]);

    // Atualiza useState do filtro
    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

    const handleClearFilters = () => {
        setFilters({ titulo: '', editora: '', isbn: '', ativo: '' });
    };
    
    // Preenche o formulário com os dados do banco ao clicar em editar
    const handleEdit = async (arcevoId) => {
        navigate(`/acervos/${arcevoId}`);
    };

    // Altera o status ativo da arcevo
    const handleToggleAtivo = async (arcevo) => {
        const dadosAtualizados = { ativo: !arcevo.ativo };
        const apiPromise = acervoService.atualizarAtivo(arcevo.id, dadosAtualizados);

        toast.promise(apiPromise, {
            pending: `${dadosAtualizados.ativo ? 'Ativando' : 'Inativando'} arcevo...`,
            success: `Arcevo ${dadosAtualizados.ativo ? 'ativada' : 'inativada'} com sucesso!`,
            error: {
                render({ data }) {
                    return getErrorMessage(data, 'Falha ao alterar status');
                }
            }
        });
    
        try {
            await apiPromise;
            buscarAcervos();
        } catch (_) {
            // erro já tratado pelo toast.promise
        }        
    };

    // Carrega a lista de acervos, com ou sem filtro
    const buscarAcervos = (filters = {}) => {
        startLoading();
        acervoService.listar(filters).then((response) => {
            setAcervos(response?.data || []);
        }).catch((error) => {
            toast.error(getErrorMessage(error, 'Erro ao buscar acervos'));
        }).finally(() => {
            stopLoading();
        });
    };


        const handleGerarExcel = async () => {
    try {
        const response = await fetch('http://localhost:3000/api/relatorios/acervos/excel');
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'acervos.xlsx';
        a.click();
        window.URL.revokeObjectURL(url);
    } catch (error) {
        toast.error('Erro ao gerar Excel');
        console.error(error);
    }
};

const handleGerarPDF = async () => {
    try {
        const response = await fetch('http://localhost:3000/api/relatorios/acervos/pdf');
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'acervos.pdf';
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
                <Button onClick={() => navigate('/acervos/novo')}>
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
                <AcervoFilters 
                    filters={filters} 
                    onFilterChange={handleFilterChange} 
                    onClearFilters={handleClearFilters} 
                />
            </div>
            <div>
                {loading && <LoadingBar />}
                <AcervosTable 
                    acervos={acervos} 
                    onEdit={handleEdit} 
                    onToggleAtivo={handleToggleAtivo} 
                />
            </div>
        </Stack>
    );
};

export default AcervosPage;