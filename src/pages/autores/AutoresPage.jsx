import { useState, useEffect } from 'react';
import { Stack, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import * as autorService from '../../services/autorService.js';
import { useDebounce } from '../../hooks/useDebounce.js';
import { useLoading } from '../../hooks/useLoading.js';
import { getErrorMessage } from '../../utils/handleApiError.js';
import AutorFilters from './components/AutorFilters.jsx';
import AutoresTable from './components/AutoresTable.jsx';
import LoadingBar from '../../components/loading-bar/LoadingBar.jsx';

function AutoresPage(){
    const [autores, setAutores] = useState([]);
    const [filters, setFilters] = useState({
        nome: '',
        nacionalidade: '',
        ativo: '',
    });
    const debouncedFilter = useDebounce(filters, 500);
    const { loading, startLoading, stopLoading } = useLoading();
    const navigate = useNavigate();

    // Faz uma busca no banco com base no filtro (com debounce aplicado)
    useEffect(() => {
            buscarAutores(debouncedFilter);
    }, [debouncedFilter]);

    // Atualiza useState do filtro
    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

    const handleClearFilters = () => {
        setFilters({ nome: '', nacionalidade: '', ativo: '' });
    };
    
    // Preenche o formulário com os dados do banco ao clicar em editar
    const handleEdit = async (autorId) => {
        navigate(`/cadastros/autores/${autorId}`);
    };

    // Altera o status ativo da autor
    const handleToggleAtivo = async (autor) => {
        const dadosAtualizados = { ativo: !autor.ativo };
        const apiPromise = autorService.atualizarAtivo(autor.id, dadosAtualizados);

        toast.promise(apiPromise, {
            pending: `${dadosAtualizados.ativo ? 'Ativando' : 'Inativando'} autor...`,
            success: `Autor ${dadosAtualizados.ativo ? 'ativada' : 'inativada'} com sucesso!`,
            error: {
                render({ data }) {
                    return getErrorMessage(data, 'Falha ao alterar status');
                }
            }
        });
    
        try {
            await apiPromise;
            buscarAutores();
        } catch (_) {
            // erro já tratado pelo toast.promise
        }        
    };

    // Carrega a lista de autores, com ou sem filtro
    const buscarAutores = (filters = {}) => {
        startLoading();
        autorService.listar(filters).then((response) => {
            setAutores(response?.data || []);
        }).catch((error) => {
            toast.error(getErrorMessage(error, 'Erro ao buscar autores'));
        }).finally(() => {
            stopLoading();
        });
    };

    return(
        <Stack>
            <div className="page-header-action">
                <Button onClick={() => navigate('/cadastros/autores/novo')}>
                    <i className="bi bi-plus-lg"></i> Novo
                </Button>
            </div>
            <div>
                <AutorFilters 
                    filters={filters} 
                    onFilterChange={handleFilterChange} 
                    onClearFilters={handleClearFilters} 
                />
            </div>
            <div>
                 {loading && <LoadingBar />}
                <AutoresTable 
                    autores={autores} 
                    onEdit={handleEdit} 
                    onToggleAtivo={handleToggleAtivo} 
                />
            </div>
        </Stack>
    );
};

export default AutoresPage;