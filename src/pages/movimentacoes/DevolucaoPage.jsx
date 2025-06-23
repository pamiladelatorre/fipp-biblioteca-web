import { useState, useEffect } from 'react';
import { Stack, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import * as movimentacaoService from '../../services/movimentacaoService.js';
import { useDebounce } from '../../hooks/useDebounce.js';
import { useLoading } from '../../hooks/useLoading.js';
import { getErrorMessage } from '../../utils/handleApiError.js';   
import DevolucaoTable from './components/DevolucaoTable.jsx';
import LoadingBar from '../../components/loading-bar/LoadingBar.jsx';
import DevolucaoFilters from './components/DevolucaoFilters.jsx';

function DevolucaoPage(){
    const [movimentacoes, setMovimentacoes] = useState([]);
    const [filters, setFilters] = useState({
        acervo: '',
        usuario: '',
        etapa: '',
        status: ''
    });
    const debouncedFilter = useDebounce(filters, 500);
    const { loading, startLoading, stopLoading } = useLoading();
    const navigate = useNavigate();

    // Faz uma busca no banco com base no filtro (com debounce aplicado)
    useEffect(() => {
            buscarMovimentacoes(debouncedFilter);
    }, [debouncedFilter]);

    // Atualiza useState do filtro
    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

    const handleClearFilters = () => {
        setFilters({ acervo: '', usuario: '', etapa: '', status: '' });
    };
    
    // Ver mais detalhes do exemplares
    const handleView = async (movimentacaoId) => {
        navigate(`/movimentacoes/${movimentacaoId}`);
    };

    // Carrega a lista de usuários, com ou sem filtro
    const buscarMovimentacoes = (filters = {}) => {
        startLoading();
        movimentacaoService.listar(filters).then((response) => {
            setMovimentacoes(response?.data || []);
        }).catch((error) => {
            toast.error(getErrorMessage(error, 'Erro ao buscar movimentações'));
        }).finally(() => {
            stopLoading();
        });
    };
 


    return(
        <Stack>
            <div className="page-header-action">
                <Button onClick={() => navigate('/movimentacoes/devolucoes/nova')}>
                    <i className="bi bi-plus-lg"></i> Nova
                </Button>
            </div>
            <div>
                <DevolucaoFilters
                    filters={filters} 
                    onFilterChange={handleFilterChange} 
                    onClearFilters={handleClearFilters} 
                />
            </div>
            <div>
                {loading && <LoadingBar />}
                <DevolucaoTable
                    movimentacoes={movimentacoes} 
                    onView={handleView} 
                />
            </div>
        </Stack>
    );
};

export default DevolucaoPage;