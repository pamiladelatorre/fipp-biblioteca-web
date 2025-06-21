import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Card, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

import { getErrorMessage } from '../../utils/handleApiError.js';
import ExemplarForm from './components/ExemplarForm';
import * as exemplarService from '../../services/exemplarService.js';
import { useLoadingBar } from '../../contexts/LoadingBarContext.jsx';
import LoadingOverlayBar from '../../components/loading-overlay/LoadingOverlay.jsx';

function ExemplarFormPage(){
    const { id } = useParams();
    const [exemplarFormData, setExemplarFormData] = useState(null);
    const { isVisible, showLoadingBar, hideLoadingBar } = useLoadingBar();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            buscarExemplar();
        }
    }, [id]);

    const buscarExemplar = async () => {
        try {
            showLoadingBar();
            const { data:dados } = await exemplarService.buscarPorId(id);
            setExemplarFormData(dados);
        } catch (error) {
            toast.error(getErrorMessage(error, 'Erro ao carregar exemplar para edição'));
        } finally {
            hideLoadingBar();
        }
    };

    // Atualiza o estado de um exemplar
    const handleSaveEstado = async (estado) => {
        const apiPromise = exemplarService.atualizarEstado(id, estado)

        // Exibe feedback ao usuário
        toast.promise(apiPromise, {
            pending: 'Atualizando estado...',
            success: 'Estado do exemplar atualizado com sucesso!',
            error: {
                render({ data }) {
                    return getErrorMessage(data, 'Falha ao atualizar estado');
                }
            }
        });

        try {
            await apiPromise;
            await buscarExemplar();
        } catch (_) {
            // erro já tratado pelo toast.promise
        }
    };

    const handleSaveBaixa = async (exemplar) => {
        const apiPromise = exemplarService.baixar(exemplar.id, exemplar);

        // Exibe feedback ao usuário
        toast.promise(apiPromise, {
            pending: 'Baixando o exemplar...',
            success: 'Exemplar baixado com sucesso!',
            error: {
                render({ data }) {
                    return getErrorMessage(data, 'Falha ao baixar exemplar');
                }
            }
        });

        try {
            await apiPromise;
            await buscarExemplar();
        } catch (_) {
            // erro já tratado pelo toast.promise
        }
    };

    return(
        <Container>
            <Card className='card-form'>
                <Card.Header as={'h5'}>Exemplar</Card.Header>
                <Card.Body>
                    {<LoadingOverlayBar show={isVisible} />}
                    <ExemplarForm exemplar={exemplarFormData} onSaveEstado={handleSaveEstado} onSaveBaixa={handleSaveBaixa} />
                </Card.Body>
            </Card>

            <div className="page-action">
                <Button variant='secondary' type='button' onClick={() => navigate('/acervos/exemplares')}>
                    <i className="bi bi-arrow-left"></i> Voltar
                </Button>
            </div>
        </Container>
    );
};

export default ExemplarFormPage;