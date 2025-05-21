import { useState, useEffect } from 'react';
import { Stack, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import * as categoriaService from '../../services/categoriaService.js';
import { useDebounce } from '../../hooks/useDebounce.js';
import { useLoading } from '../../hooks/useLoading.js';
import { getErrorMessage } from '../../utils/handleApiError.js';
import CategoriaFilters from './components/CategoriaFilters.jsx';
import CategoriasTable from './components/CategoriasTable.jsx';

function CategoriasPage(){
    const [categorias, setCategorias] = useState([]);
    const [filters, setFilters] = useState({
        descricao: '',
        ativo: '',
    });
    const debouncedFilter = useDebounce(filters, 500);
    const { loading, start, stop } = useLoading();
    const navigate = useNavigate();

    // Faz uma busca no banco com base no filtro (com debounce aplicado)
    useEffect(() => {
            buscarCategorias(debouncedFilter);
    }, [debouncedFilter]);

    // Atualiza useState do filtro
    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

    const handleClearFilters = () => {
        setFilters({ descricao: '', ativo: '' });
    };
    
    // Preenche o formulário com os dados do banco ao clicar em editar
    const handleEdit = async (categoriaId) => {
        navigate(`/cadastros/categorias/${categoriaId}`);
    };

    // Altera o status ativo da categoria
    const handleToggleAtivo = async (categoria) => {
        const dadosAtualizados = { ativo: !categoria.ativo };
        const apiPromise = categoriaService.atualizarAtivo(categoria.id, dadosAtualizados);

        toast.promise(apiPromise, {
            pending: `${dadosAtualizados.ativo ? 'Ativando' : 'Inativando'} categoria...`,
            success: `Categoria ${dadosAtualizados.ativo ? 'ativada' : 'inativada'} com sucesso!`,
            error: {
                render({ data }) {
                    return getErrorMessage(data, 'Falha ao alterar status');
                }
            }
        });
    
        try {
            await apiPromise;
            buscarCategorias();
        } catch (_) {
            // erro já tratado pelo toast.promise
        }        
    };

    // Carrega a lista de categorias, com ou sem filtro
    const buscarCategorias = (filters = {}) => {
        start();
        categoriaService.listar(filters).then((response) => {
            setCategorias(response?.data || []);
        }).catch((error) => {
            toast.error(getErrorMessage(error, 'Erro ao buscar categorias'));
        }).finally(() => {
            stop();
        });
    };

    return(
        <Stack>
            <div className="page-header-action">
                <Button onClick={() => navigate('/cadastros/categorias/nova')}>
                    <i className="bi bi-plus-lg"></i> Nova
                </Button>
            </div>
            <div>
                <CategoriaFilters 
                    filters={filters} 
                    onFilterChange={handleFilterChange} 
                    onClearFilters={handleClearFilters} 
                />
            </div>
            <div>
                <CategoriasTable 
                    categorias={categorias} 
                    loading={loading} 
                    onEdit={handleEdit} 
                    onToggleAtivo={handleToggleAtivo} 
                />
            </div>
        </Stack>
    );
};

export default CategoriasPage;