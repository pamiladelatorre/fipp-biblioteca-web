import { useState, useEffect } from 'react';
import { Stack, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import * as entradaService from '../../services/entradaService.js';
import { useDebounce } from '../../hooks/useDebounce.js';
import { useLoading } from '../../hooks/useLoading.js';
import { getErrorMessage } from '../../utils/handleApiError.js';
import EntradaFilters from './components/EntradaFilters.jsx';
import EntradasTable from './components/EntradasTable.jsx';
import LoadingBar from '../../components/loading-bar/LoadingBar.jsx';

function EntradasPage(){
    const [entradas, setEntradas] = useState([]);
    const [filters, setFilters] = useState({
        acervo: '',
        origem: '',
        contrato: '',
        empenho: '',
        doador: ''
    });
    const debouncedFilter = useDebounce(filters, 500);
    const { loading, startLoading, stopLoading } = useLoading();
    const navigate = useNavigate();

    // Faz uma busca no banco com base no filtro (com debounce aplicado)
    useEffect(() => {
            buscarEntradas(debouncedFilter);
    }, [debouncedFilter]);

    // Atualiza useState do filtro
    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

    const handleClearFilters = () => {
        setFilters({ acervo: '', origem: '', contrato: '', empenho: '', doador: '' });
    };
    
    // Ver mais detalhes do exemplares
    const handleView = async (entradaId) => {
        navigate(`/acervos/entradas/${entradaId}`);
    };

    // Carrega a lista de usuários, com ou sem filtro
    const buscarEntradas = (filters = {}) => {
        startLoading();
        entradaService.listar(filters).then((response) => {
            setEntradas(response?.data || []);
        }).catch((error) => {
            toast.error(getErrorMessage(error, 'Erro ao buscar usuários'));
        }).finally(() => {
            stopLoading();
        });
    };

    return(
        <Stack>
            <div className="page-header-action">
                <Button onClick={() => navigate('/acervos/entradas/novo')}>
                    <i className="bi bi-plus-lg"></i> Novo
                </Button>
            </div>
            <div>
                <EntradaFilters 
                    filters={filters} 
                    onFilterChange={handleFilterChange} 
                    onClearFilters={handleClearFilters} 
                />
            </div>
            <div>
                {loading && <LoadingBar />}
                <EntradasTable 
                    entradas={entradas} 
                    onView={handleView} 
                />
            </div>
        </Stack>
    );
};

export default EntradasPage;