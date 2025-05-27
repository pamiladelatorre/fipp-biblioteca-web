import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Card, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

import { getErrorMessage } from '../../utils/handleApiError.js';
import MotivoBaixaForm from './components/MotivoBaixaForm';
import * as motivoBaixaService from '../../services/motivoBaixaService.js';
import { useLoadingBar } from '../../contexts/LoadingBarContext.jsx';
import LoadingOverlayBar from '../../components/loading-overlay/LoadingOverlay.jsx';

function MotivoBaixaFormPage(){
    const { id } = useParams();
    const isEditMode = Boolean(id);
    const [motivoBaixaFormData, setMotivoBaixaFormData] = useState(null);
    const { isVisible, showLoadingBar, hideLoadingBar } = useLoadingBar();
    const navigate = useNavigate();

    useEffect(() => {
        if (isEditMode && id) {
            buscarMotivoBaixa();
        }
    }, [id]);

    const buscarMotivoBaixa = async () => {
        try {
            showLoadingBar();
            const { data:dados } = await motivoBaixaService.buscarPorId(id);
            setMotivoBaixaFormData(dados);
        } catch (error) {
            toast.error(getErrorMessage(error, 'Erro ao carregar motivo baixa para edição'));
        } finally {
            hideLoadingBar();
        }
    };

    // Atualiza ou cria um motivo baixa
    const handleSave = async (motivoBaixa) => {
        const apiPromise = isEditMode
            ? motivoBaixaService.atualizar(motivoBaixa.id, motivoBaixa)
            : motivoBaixaService.criar(motivoBaixa);

        // Exibe feedback ao usuário
        toast.promise(apiPromise, {
            pending: motivoBaixa.id ? 'Atualizando motivo baixa...' : 'Criando motivo baixa...',
            success: motivoBaixa.id ? 'Motivo baixa atualizado com sucesso!' : 'Motivo baixa criado com sucesso!',
            error: {
                render({ data }) {
                    return getErrorMessage(data, 'Falha ao salvar dados');
                }
            }
        });

        try {
            const { data } = await apiPromise;
            navigate(`/cadastros/motivos-baixa/${data.id}`);
        } catch (_) {
            // erro já tratado pelo toast.promise
        }
    };

    return(
        <Container>
            <Card className='card-form'>
                <Card.Header as={'h5'}>
                    {isEditMode ? 'Editar Motivo Baixa' : 'Nova Motivo Baixa'}
                </Card.Header>
                <Card.Body>
                    {<LoadingOverlayBar show={isVisible} />}
                    <MotivoBaixaForm motivoBaixa={motivoBaixaFormData} onSave={handleSave} />
                </Card.Body>
            </Card>

            <div className="page-action">
                <Button variant='secondary' type='button' onClick={() => navigate('/cadastros/motivos-baixa')}>
                    <i className="bi bi-arrow-left"></i> Voltar
                </Button>
                <Button variant='success' type='submit' form="motivo-baixa-form">
                    <i className="bi bi-check-lg"></i> Salvar
                </Button>
            </div>
        </Container>
    );
};

export default MotivoBaixaFormPage;