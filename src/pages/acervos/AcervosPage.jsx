import { useState, useEffect } from 'react';
import { Stack, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import * as acervoService from '../../services/acervoService.js';
import { useDebounce } from '../../hooks/useDebounce.js';
import { useLoading } from '../../hooks/useLoading.js';
import { getErrorMessage } from '../../utils/handleApiError.js';
import AcervoFilters from './components/AcervoFilters.jsx';
import AcervosTable from './components/AcervosTable.jsx';

function AcervosPage(){
    const [acervos, setAcervos] = useState([]);
    const [filters, setFilters] = useState({
        titulo: '',
        ativo: '',
    });
    const debouncedFilter = useDebounce(filters, 500);
    const { loading, start, stop } = useLoading();
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
        setFilters({ titulo: '', ativo: '' });
    };
    
    // Preenche o formulário com os dados do banco ao clicar em editar
    const handleEdit = async (arcevoId) => {
        navigate(`/cadastros/acervos/${arcevoId}`);
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
        start();
        acervoService.listar(filters).then((response) => {
            setAcervos(response.data || []);
        }).catch((error) => {
            toast.error(getErrorMessage(error, 'Erro ao buscar acervos'));
        }).finally(() => {
            stop();
        });
    };

    return(
        <Stack>
            <div className="page-header-action">
                <Button onClick={() => navigate('/cadastros/acervos/novo')}>
                    <i className="bi bi-plus-lg"></i> Novo
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
                <AcervosTable 
                    acervos={acervos} 
                    loading={loading} 
                    onEdit={handleEdit} 
                    onToggleAtivo={handleToggleAtivo} 
                />
            </div>
        </Stack>
    );
};

export default AcervosPage;