import { useState, useEffect } from 'react';
import { Stack, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import * as infracaoService from '../../services/infracaoService.js';
import { useDebounce } from '../../hooks/useDebounce.js';
import { useLoading } from '../../hooks/useLoading.js';
import { getErrorMessage } from '../../utils/handleApiError.js';
import InfracaoFilters from './components/InfracaoFilters.jsx';
import InfracoesTable from './components/InfracoesTable.jsx';
import LoadingBar from '../../components/loading-bar/LoadingBar.jsx';

function InfracoesPage(){
    const [infracoes, setInfracoes] = useState([]);
    const [filters, setFilters] = useState({
        usuario: '',
        tipoInfracao: '',
        grauInfracao: '',
        status: ''
    });
    const debouncedFilter = useDebounce(filters, 500);
    const { loading, startLoading, stopLoading } = useLoading();
    const navigate = useNavigate();

    // Faz uma busca no banco com base no filtro (com debounce aplicado)
    useEffect(() => {
            buscarInfracoes(debouncedFilter);
    }, [debouncedFilter]);

    // Atualiza useState do filtro
    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

    const handleClearFilters = () => {
        setFilters({ usuario: '', tipoInfracao: '', grauInfracao: '', status: '' });
    };
    
    // Ver mais detalhes de infrações
    const handleEdit= async (infracaoId) => {
  navigate(`${infracaoId}`);


    };

    // Carrega a lista de infrações, com ou sem filtro
    const buscarInfracoes = (filters = {}) => {
        startLoading();
        infracaoService.listar(filters).then((response) => {
            setInfracoes(response?.data || []);
        }).catch((error) => {
            toast.error(getErrorMessage(error, 'Erro ao buscar usuários'));
        }).finally(() => {
            stopLoading();
        });
    };

    return(
        <Stack>
            <div className="page-header-action">
                <Button onClick={() => navigate('/usuarios/infracoes/novo')}>
                    <i className="bi bi-plus-lg"></i> Nova
                </Button>
            </div>
            <div>
                <InfracaoFilters 
                    filters={filters} 
                    onFilterChange={handleFilterChange} 
                    onClearFilters={handleClearFilters} 
                />
            </div>
            <div>
                {loading && <LoadingBar />}
                <InfracoesTable 
                    infracoes={infracoes} 
                    onEdit={handleEdit}
                />
            </div>
        </Stack>
    );
};

export default InfracoesPage;