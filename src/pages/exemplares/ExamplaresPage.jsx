import { useState, useEffect } from 'react';
import { Stack } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import * as exemplarService from '../../services/exemplarService.js';
import { useDebounce } from '../../hooks/useDebounce.js';
import { useLoading } from '../../hooks/useLoading.js';
import { getErrorMessage } from '../../utils/handleApiError.js';
import ExemplarFilters from './components/ExemplarFilters.jsx';
import ExemplaresTable from './components/ExemplaresTable.jsx';
import LoadingBar from '../../components/loading-bar/LoadingBar.jsx';

function ExemplaresPage(){
    const [exemplares, setExemplares] = useState([]);
    const [filters, setFilters] = useState({
        acervo: '',
        tombo: '',
        estado: '',
        status: ''
    });
    const debouncedFilter = useDebounce(filters, 500);
    const { loading, startLoading, stopLoading } = useLoading();
    const navigate = useNavigate();

    // Faz uma busca no banco com base no filtro (com debounce aplicado)
    useEffect(() => {
            buscarExemplares(debouncedFilter);
    }, [debouncedFilter]);

    // Atualiza useState do filtro
    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

    const handleClearFilters = () => {
        setFilters({ acervo: '', tombo: '', estado: '', status: '' });
    };
    
    // Ver mais detalhes do exemplar
    const handleView = async (exemplarId) => {
        navigate(`/acervos/exemplares/${exemplarId}`);
    };

    // Carrega a lista de exemplares, com ou sem filtro
    const buscarExemplares = (filters = {}) => {
        startLoading();
        exemplarService.listar(filters).then((response) => {
            setExemplares(response?.data || []);
        }).catch((error) => {
            toast.error(getErrorMessage(error, 'Erro ao buscar exemplares'));
        }).finally(() => {
            stopLoading();
        });
    };

    return(
        <Stack>
            <div className='mt-5'>
                <ExemplarFilters 
                    filters={filters} 
                    onFilterChange={handleFilterChange} 
                    onClearFilters={handleClearFilters} 
                />
            </div>
            <div>
                {loading && <LoadingBar />}
                <ExemplaresTable 
                    exemplares={exemplares} 
                    onView={handleView} 
                />
            </div>
        </Stack>
    );
};

export default ExemplaresPage;