import { useState, useEffect } from 'react';
import { Stack, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import * as usuarioService from '../../services/usuarioService.js';
import { useDebounce } from '../../hooks/useDebounce.js';
import { useLoading } from '../../hooks/useLoading.js';
import { getErrorMessage } from '../../utils/handleApiError.js';
import UsuarioFilters from './components/UsuarioFilters.jsx';
import UsuariosTable from './components/UsuariosTable.jsx';

function UsuariosPage(){
    const [usuarios, setUsuarios] = useState([]);
    const [filters, setFilters] = useState({
        nome: '',
        ativo: '',
    });
    const debouncedFilter = useDebounce(filters, 500);
    const { loading, start, stop } = useLoading();
    const navigate = useNavigate();

    // Faz uma busca no banco com base no filtro (com debounce aplicado)
    useEffect(() => {
            buscarUsuarios(debouncedFilter);
    }, [debouncedFilter]);

    // Atualiza useState do filtro
    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

    const handleClearFilters = () => {
        setFilters({ nome: '', ativo: '' });
    };
    
    // Preenche o formulário com os dados do banco ao clicar em editar
    const handleEdit = async (usuarioId) => {
        navigate(`/usuarios/${usuarioId}`);
    };

    // Altera o status ativo da usuário
    const handleToggleAtivo = async (usuario) => {
        const dadosAtualizados = { ativo: !usuario.ativo };
        const apiPromise = usuarioService.atualizarAtivo(usuario.id, dadosAtualizados);

        toast.promise(apiPromise, {
            pending: `${dadosAtualizados.ativo ? 'Ativando' : 'Inativando'} usuário...`,
            success: `Usuário ${dadosAtualizados.ativo ? 'ativada' : 'inativada'} com sucesso!`,
            error: {
                render({ data }) {
                    return getErrorMessage(data, 'Falha ao alterar status');
                }
            }
        });
    
        try {
            await apiPromise;
            buscarUsuarios();
        } catch (_) {
            // erro já tratado pelo toast.promise
        }        
    };

    // Carrega a lista de usuários, com ou sem filtro
    const buscarUsuarios = (filters = {}) => {
        start();
        usuarioService.listar(filters).then((response) => {
            setUsuarios(response?.data || []);
        }).catch((error) => {
            toast.error(getErrorMessage(error, 'Erro ao buscar usuários'));
        }).finally(() => {
            stop();
        });
    };

    return(
        <Stack>
            <div className="page-header-action">
                <Button onClick={() => navigate('/usuarios/novo')}>
                    <i className="bi bi-plus-lg"></i> Novo
                </Button>
            </div>
            <div>
                <UsuarioFilters 
                    filters={filters} 
                    onFilterChange={handleFilterChange} 
                    onClearFilters={handleClearFilters} 
                />
            </div>
            <div>
                <UsuariosTable 
                    usuarios={usuarios} 
                    loading={loading} 
                    onEdit={handleEdit} 
                    onToggleAtivo={handleToggleAtivo} 
                />
            </div>
        </Stack>
    );
};

export default UsuariosPage;