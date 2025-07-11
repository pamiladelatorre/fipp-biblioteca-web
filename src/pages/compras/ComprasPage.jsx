import { useState, useEffect } from 'react';
import { Stack, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import * as compraService from '../../services/compraService.js';
import { useDebounce } from '../../hooks/useDebounce.js';
import { useLoading } from '../../hooks/useLoading.js';
import { getErrorMessage } from '../../utils/handleApiError.js';
import CompraFilters from './components/CompraFilters.jsx';
import ComprasTable from './components/ComprasTable.jsx';
import LoadingBar from '../../components/loading-bar/LoadingBar.jsx';

function ComprasPage(){
    const [compras, setCompras] = useState([]);
    const [filters, setFilters] = useState({
        cnpj: '',
        razaoSocial: '',
        tipoPagamento: '',
        tipoProduto: '',
        empenho: '',
        status: ''
    });
    const debouncedFilter = useDebounce(filters, 500);
    const { loading, startLoading, stopLoading } = useLoading();
    const navigate = useNavigate();

    // Faz uma busca no banco com base no filtro (com debounce aplicado)
    useEffect(() => {
            buscarCompras(debouncedFilter);
    }, [debouncedFilter]);

    // Atualiza useState do filtro
    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

    const handleClearFilters = () => {
        setFilters({ cnpj: '', razaoSocial: '', tipoPagamento: '', tipoProduto: '', empenho: '', status: '' });
    };
    
    // Ver mais detalhes do compras
    const handleView = async (compraId) => {
        navigate(`/compras/${compraId}`);
    };

    // Carrega a lista de compras, com ou sem filtro
    const buscarCompras = (filters = {}) => {
        startLoading();
        compraService.listar(filters).then((response) => {
            setCompras(response?.data || []);
        }).catch((error) => {
            toast.error(getErrorMessage(error, 'Erro ao buscar compras'));
        }).finally(() => {
            stopLoading();
        });
    };

    return(
        <Stack>
            <div className="page-header-action">
                <Button onClick={() => navigate('/compras/nova')}>
                    <i className="bi bi-plus-lg"></i> Nova
                </Button>
            </div>
            <div>
                <CompraFilters 
                    filters={filters} 
                    onFilterChange={handleFilterChange} 
                    onClearFilters={handleClearFilters} 
                />
            </div>
            <div>
                {loading && <LoadingBar />}
                <ComprasTable 
                    compras={compras} 
                    onView={handleView} 
                />
            </div>
        </Stack>
    );
};

export default ComprasPage;