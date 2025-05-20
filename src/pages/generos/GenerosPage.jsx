import { useState, useEffect } from 'react';
import { Stack, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import * as generoService from '../../services/generoService.js';
import { useDebounce } from '../../hooks/useDebounce.js';
import { useLoading } from '../../hooks/useLoading.js';
import { getErrorMessage } from '../../utils/handleApiError.js';
import GeneroFilters from './components/GeneroFilters.jsx';
import GenerosTable from './components/GenerosTable.jsx';

function GenerosPage(){
    const [generos, setGeneros] = useState([]);
    const [filters, setFilters] = useState({
        descricao: '',
        ativo: '',
    });
    const debouncedFilter = useDebounce(filters, 500);
    const { loading, start, stop } = useLoading();
    const navigate = useNavigate();

    // Faz uma busca no banco com base no filtro (com debounce aplicado)
    useEffect(() => {
            buscarGeneros(debouncedFilter);
    }, [debouncedFilter]);

    // Atualiza useState do filtro
    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

    const handleClearFilters = () => {
        setFilters({ descricao: '', ativo: '' });
    };
    
    // Preenche o formulário com os dados do banco ao clicar em editar
    const handleEdit = async (generoId) => {
        navigate(`/cadastros/generos/${generoId}`);
    };

    // Altera o status ativo da genero
    const handleToggleAtivo = async (genero) => {
        const dadosAtualizados = { ativo: !genero.ativo };
        const apiPromise = generoService.atualizarAtivo(genero.id, dadosAtualizados);

        toast.promise(apiPromise, {
            pending: `${dadosAtualizados.ativo ? 'Ativando' : 'Inativando'} genero...`,
            success: `Genero ${dadosAtualizados.ativo ? 'ativada' : 'inativada'} com sucesso!`,
            error: {
                render({ data }) {
                    return getErrorMessage(data, 'Falha ao alterar status');
                }
            }
        });
    
        try {
            await apiPromise;
            buscarGeneros();
        } catch (_) {
            // erro já tratado pelo toast.promise
        }        
    };

    // Carrega a lista de generos, com ou sem filtro
    const buscarGeneros = (filters = {}) => {
        start();
        generoService.listar(filters).then((response) => {
            
            setGeneros(response.data || []);
        }).catch((error) => {
            toast.error(getErrorMessage(error, 'Erro ao buscar generos'));
        }).finally(() => {
            stop();
        });
    };

    return(
        <Stack>
            <div className="page-header-action">
                <Button onClick={() => navigate('/cadastros/generos/novo')}>
                    <i className="bi bi-plus-lg"></i> Novo
                </Button>
            </div>
            <div>
                <GeneroFilters 
                    filters={filters} 
                    onFilterChange={handleFilterChange} 
                    onClearFilters={handleClearFilters} 
                />
            </div>
            <div>
                <GenerosTable 
                    generos={generos} 
                    loading={loading} 
                    onEdit={handleEdit} 
                    onToggleAtivo={handleToggleAtivo} 
                />
            </div>
        </Stack>
    );
};

export default GenerosPage;