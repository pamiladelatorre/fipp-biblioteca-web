import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Card, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

import { getErrorMessage } from '../../utils/handleApiError.js';
import DoadorForm from './components/DoadorForm';
import * as doadorService from '../../services/doadorService.js';
import { useLoadingBar } from '../../contexts/LoadingBarContext.jsx';
import LoadingOverlayBar from '../../components/loading-overlay/LoadingOverlay.jsx';

function DoadorFormPage() {
    const { id } = useParams();
    const isEditMode = Boolean(id);
    const [doadorFormData, setDoadorFormData] = useState(null);
    const { isVisible, showLoadingBar, hideLoadingBar } = useLoadingBar();
    const navigate = useNavigate();

    useEffect(() => {
        if (isEditMode && id) {
            buscarDoador();
        }
    }, [id]);

    const buscarDoador = async () => {
        try {
            showLoadingBar();
            const { data:dados } = await doadorService.buscarPorId(id);
            setDoadorFormData(dados);
        } catch (error) {
            toast.error(getErrorMessage(error, 'Erro ao carregar doador para edição'));
        } finally {
            hideLoadingBar();
        }
    };

    const handleSave = async (doador) => {
        const apiPromise = isEditMode
            ? doadorService.atualizar(doador.id, doador)
            : doadorService.criar(doador);

        // Exibe feedback ao usuário
        toast.promise(apiPromise, {
            pending: doador.id ? 'Atualizando doador...' : 'Criando doador...',
            success: doador.id ? 'Doador atualizado com sucesso!' : 'Doador criado com sucesso!',
            error: {
                render({ data }) {
                    return getErrorMessage(data, 'Falha ao salvar dados');
                }
            }
        });

        try {
            const { data } = await apiPromise;
            navigate(`/cadastros/doadores/${data.id}`);
        } catch (_) {
            // erro já tratado pelo toast.promise
        }
    };

    return (
          <Container>
            <Card className='card-form'>
                <Card.Header as={'h5'}>
                    {isEditMode ? 'Editar Doador' : 'Novo Doador'}
                </Card.Header>
                <Card.Body>
                    {<LoadingOverlayBar show={isVisible} />}
                    <DoadorForm doador={doadorFormData} onSave={handleSave} />
                </Card.Body>
            </Card>

            <div className="page-action d-flex justify-content-end gap-2">
                <Button variant='secondary' type='button' onClick={() => navigate('/cadastros/doadores')}>
                    <i className="bi bi-arrow-left"></i> Voltar
                </Button>
                <Button variant='success' type='submit' form="doador-form">
                    <i className="bi bi-check-lg"></i> Salvar
                </Button>
            </div>
        </Container>
    );
};

export default DoadorFormPage;