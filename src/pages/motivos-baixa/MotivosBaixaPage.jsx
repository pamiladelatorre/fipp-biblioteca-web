import { useState, useEffect } from 'react';
import { Stack, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import * as motivoBaixaService from '../../services/motivoBaixaService.js';
import { useDebounce } from '../../hooks/useDebounce.js';
import { useLoading } from '../../hooks/useLoading.js';
import { getErrorMessage } from '../../utils/handleApiError.js';
import MotivoBaixaFilters from './components/MotivoBaixaFilters.jsx';
import MotivosBaixaTable from './components/MotivosBaixaTable.jsx';

function MotivosBaixaPage(){
    const [motivosBaixa, setMotivosBaixa] = useState([]);
    const [filters, setFilters] = useState({
        descricao: '',
        ativo: '',
    });
    const debouncedFilter = useDebounce(filters, 500);
    const { loading, start, stop } = useLoading();
    const navigate = useNavigate();

    // Faz uma busca no banco com base no filtro (com debounce aplicado)
    useEffect(() => {
            buscarMotivosBaixa(debouncedFilter);
    }, [debouncedFilter]);

    // Atualiza useState do filtro
    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

    const handleClearFilters = () => {
        setFilters({ descricao: '', ativo: '' });
    };
    
    // Preenche o formulário com os dados do banco ao clicar em editar
    const handleEdit = async (motivoBaixaId) => {
        navigate(`/cadastros/motivos-baixa/${motivoBaixaId}`);
    };

    // Altera o status ativo da motivo baixa
    const handleToggleAtivo = async (motivoBaixa) => {
        const dadosAtualizados = { ativo: !motivoBaixa.ativo };
        const apiPromise = motivoBaixaService.atualizarAtivo(motivoBaixa.id, dadosAtualizados);

        toast.promise(apiPromise, {
            pending: `${dadosAtualizados.ativo ? 'Ativando' : 'Inativando'} motivo baixa...`,
            success: `Motivo baixa ${dadosAtualizados.ativo ? 'ativada' : 'inativada'} com sucesso!`,
            error: {
                render({ data }) {
                    return getErrorMessage(data, 'Falha ao alterar status');
                }
            }
        });
    
        try {
            await apiPromise;
            buscarMotivosBaixa();
        } catch (_) {
            // erro já tratado pelo toast.promise
        }        
    };

    // Carrega a lista de motivos baixa, com ou sem filtro
    const buscarMotivosBaixa = (filters = {}) => {
        start();
        motivoBaixaService.listar(filters).then((response) => {
            setMotivosBaixa(response?.data || []);
        }).catch((error) => {
            toast.error(getErrorMessage(error, 'Erro ao buscar motivos baixa'));
        }).finally(() => {
            stop();
        });
    };

    return(
        <Stack>
            <div className="page-header-action">
                <Button onClick={() => navigate('/cadastros/motivos-baixa/novo')}>
                    <i className="bi bi-plus-lg"></i> Novo
                </Button>
            </div>
            <div>
                <MotivoBaixaFilters 
                    filters={filters} 
                    onFilterChange={handleFilterChange} 
                    onClearFilters={handleClearFilters} 
                />
            </div>
            <div>
                <MotivosBaixaTable 
                    motivosBaixa={motivosBaixa} 
                    loading={loading} 
                    onEdit={handleEdit} 
                    onToggleAtivo={handleToggleAtivo} 
                />
            </div>
        </Stack>
    );
};

export default MotivosBaixaPage;