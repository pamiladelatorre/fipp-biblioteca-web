import { useState, useEffect } from 'react';
import { Stack, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import * as doadorService from '../../services/doadorService.js';
import { useDebounce } from '../../hooks/useDebounce.js';
import { useLoading } from '../../hooks/useLoading.js';
import { getErrorMessage } from '../../utils/handleApiError.js';
import DoadorFilters from './components/DoadorFilters.jsx';
import DoadoresTable from './components/DoadoresTable.jsx';
import LoadingBar from '../../components/loading-bar/LoadingBar.jsx';

function DoadoresPage() {
    const [doadores, setDoadores] = useState([]);
    const [filters, setFilters] = useState({
        nome: '',
        documento: '',
        ativo: ''
    });
    const debouncedFilter = useDebounce(filters, 500);
    const { loading, startLoading, stopLoading } = useLoading();
    const navigate = useNavigate();

    useEffect(() => {
        buscarDoadores(debouncedFilter);
    }, [debouncedFilter]);

        const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

    const handleClearFilters = () => {
        setFilters({ nome: '', documento: '', ativo: '' });
    };
    const handleEdit = async (doadorId) => {
        navigate(`/cadastros/doadores/${doadorId}`);
    };
 const handleToggleAtivo = async (doador) => {
    const dadosAtualizados = { ativo: !doador.ativo };
    const apiPromise = doadorService.atualizarAtivo(doador.id, dadosAtualizados);

    toast.promise(apiPromise, {
        pending: `${dadosAtualizados.ativo ? 'Ativando' : 'Inativando'} doador...`,
        success: `Doador ${dadosAtualizados.ativo ? 'ativado' : 'inativado'} com sucesso!`,
        error: {
            render({ data }) {
                return getErrorMessage(data, 'Falha ao alterar status');
            }
        }
    });

    try {
        await apiPromise;

        // Atualiza o estado local do doadores, modificando o ativo do doador alterado
        setDoadores((prevDoadores) =>
            prevDoadores.map((d) =>
                d.id === doador.id ? { ...d, ativo: dadosAtualizados.ativo } : d
            )
        );

    } catch (_) {
        // erro já tratado pelo toast.promise
    }
};

        const buscarDoadores =  (filters={}) => {
            startLoading();
            doadorService.listar(filters).then(res => {
                setDoadores(res?.data || []);
                stopLoading();
            }).catch(error => {
                toast.error(getErrorMessage(error, 'Erro ao carregar doadores'));
                stopLoading();
            });
        };
        
    return (
        <Stack>
            <div className="page-header-action">
              <Button onClick={() => navigate('/cadastros/doadores/novo')}>
                    <i className="bi bi-plus-lg"></i> Novo
                </Button>
            </div>
            <div>
                <DoadorFilters 
                    filters={filters} 
                    onFilterChange={handleFilterChange} 
                    onClearFilters={handleClearFilters} 
                />
            </div>
            <div>
                 {loading && <LoadingBar />}
                <DoadoresTable 
                    doadores={doadores} 
                    onEdit={handleEdit} 
                    onToggleAtivo={handleToggleAtivo} 
                />
            </div>
        </Stack>
    );
};

export default DoadoresPage;