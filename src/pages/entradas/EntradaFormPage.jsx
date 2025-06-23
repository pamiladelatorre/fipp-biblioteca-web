import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Card, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

import { getErrorMessage } from '../../utils/handleApiError.js';
import EntradaForm from './components/EntradaForm';
import * as entradaService from '../../services/entradaService.js';
import { useLoadingBar } from '../../contexts/LoadingBarContext.jsx';
import LoadingOverlayBar from '../../components/loading-overlay/LoadingOverlay.jsx';

function EntradaFormPage(){
    const { id } = useParams();
    const isEditMode = Boolean(id);
    const [entradaFormData, setEntradaFormData] = useState(null);
    const { isVisible, showLoadingBar, hideLoadingBar } = useLoadingBar();
    const navigate = useNavigate();

    useEffect(() => {
        if (isEditMode && id) {
            buscarEntrada();
        }
    }, [id]);

    const buscarEntrada = async () => {
        try {
            showLoadingBar();
            const { data:dados } = await entradaService.buscarPorId(id);
            console.log(dados)
            setEntradaFormData(dados);
        } catch (error) {
            toast.error(getErrorMessage(error, 'Erro ao carregar acervo para edição'));
        } finally {
            hideLoadingBar();
        }
    };

    // Atualiza ou cria uma entrada
    const handleSave = async (entrada) => {
        const apiPromise = isEditMode
            ? entradaService.atualizar(entrada.id, entrada)
            : entradaService.criar(entrada);

        // Exibe feedback ao usuário
        toast.promise(apiPromise, {
            pending: entrada.id ? 'Atualizando entrada...' : 'Criando entrada...',
            success: entrada.id ? 'Entrada atualizada com sucesso!' : 'Entrada criada com sucesso!',
            error: {
                render({ data }) {
                    return getErrorMessage(data, 'Falha ao salvar dados');
                }
            }
        });

        try {
            await apiPromise;
            navigate(`/acervos/entradas/${data.id}`);
        } catch (_) {
            // erro já tratado pelo toast.promise
        }
    };

    return(
        <Container>
            <Card className='card-form'>
                <Card.Header as={'h5'}>
                    {isEditMode ? 'Entrada' : 'Nova Entrada'}
                </Card.Header>
                <Card.Body>
                    {<LoadingOverlayBar show={isVisible} />}
                    <EntradaForm entrada={entradaFormData} onSave={handleSave} />
                </Card.Body>
            </Card>

            <div className="page-action">
                <Button variant='secondary' type='button' onClick={() => navigate('/acervos/entradas')}>
                    <i className="bi bi-arrow-left"></i> Voltar
                </Button>
                <Button variant='success' type='submit' form="entrada-form">
                    <i className="bi bi-check-lg"></i> Salvar
                </Button>
            </div>
        </Container>
    );
};

export default EntradaFormPage;