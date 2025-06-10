import { useState, useEffect } from 'react';
import { Stack, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import * as assinaturaService from '../../services/assinaturaService.js';
import { useDebounce } from '../../hooks/useDebounce.js';
import { useLoading } from '../../hooks/useLoading.js';
import { getErrorMessage } from '../../utils/handleApiError.js';
import AssinaturaFilters from './components/AssinaturaFilters.jsx';
import LoadingBar from '../../components/loading-bar/LoadingBar.jsx';
import AssinaturasTable from './components/AssinaturasTable.jsx';

function AssinaturasPage(){
    const [assinaturas, setAssinaturas] = useState([]);
    const [filters, setFilters] = useState({ aluno: '', plano: '', dataInicio: '', ativo: '' });
    const debouncedFilter = useDebounce(filters, 500);
    const { loading, startLoading, stopLoading } = useLoading();
    const navigate = useNavigate();

    useEffect(() => {
        buscarAssinaturas(debouncedFilter);
    }, [debouncedFilter]);

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

    const handleClearFilters = () => {
        setFilters({ aluno: '', plano: '', dataInicio: '', ativo: '' });
    };

    const handleEdit = (assinaturaId) => {
        navigate(`/cadastros/assinaturas/${assinaturaId}`);
    };

    const handleToggleAtivo = async (assinatura) => {
        const dadosAtualizados = { ativo: !assinatura.ativo };
        const apiPromise = assinaturaService.atualizarAtivo(assinatura.id, dadosAtualizados);

        toast.promise(apiPromise, {
            pending: `${dadosAtualizados.ativo ? 'Ativando' : 'Inativando'} assinatura...`,
            success: `Assinatura ${dadosAtualizados.ativo ? 'ativada' : 'inativada'} com sucesso!`,
            error: {
                render({ data }) {
                    return getErrorMessage(data, 'Falha ao alterar status');
                }
            }
        });

        try {
            await apiPromise;
            buscarAssinaturas();
        } catch (_) {
            // erro tratado pelo toast
        }
    };

    const buscarAssinaturas = (filters = {}) => {
        startLoading();
        assinaturaService.listar(filters).then((response) => {
            setAssinaturas(response?.data || []);
        }).catch((error) => {
            toast.error(getErrorMessage(error, 'Erro ao buscar assinaturas'));
        }).finally(() => {
            stopLoading();
        });
    };

    return (
        <Stack>
            <div className="page-header-action">
                <Button onClick={() => navigate('/cadastros/assinaturas/novo')}>
                    <i className="bi bi-plus-lg"></i> Nova
                </Button>
            </div>
            <div>
                <AssinaturaFilters
                    filters={filters}
                    onFilterChange={handleFilterChange}
                    onClearFilters={handleClearFilters}
                />
            </div>
            <div>
                {loading && <LoadingBar />}
                <AssinaturasTable
                    assinaturas={assinaturas}
                    onEdit={handleEdit}
                    onToggleAtivo={handleToggleAtivo}
                />
            </div>
        </Stack>
    );
};

export default AssinaturasPage;
