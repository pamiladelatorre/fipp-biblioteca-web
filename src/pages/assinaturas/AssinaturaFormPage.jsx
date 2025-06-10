import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Card, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

import { getErrorMessage } from '../../utils/handleApiError.js';
import AssinaturaForm from './components/AssinaturaForm.jsx';
import * as assinaturaService from '../../services/assinaturaService.js';
import { useLoadingBar } from '../../contexts/LoadingBarContext.jsx';
import LoadingOverlayBar from '../../components/loading-overlay/LoadingOverlay.jsx';
import * as fornecedorService from '../../services/fornecedorService.js';

function AssinaturaFormPage(){
    const { id } = useParams();
    const isEditMode = Boolean(id);
    const [assinaturaFormData, setAssinaturaFormData] = useState(null);
    const { isVisible, showLoadingBar, hideLoadingBar } = useLoadingBar();
    const [reload, setReload] = useState(false);
    const navigate = useNavigate();



    const [fornecedores, setFornecedores] = useState([]);

useEffect(() => {
    buscarFornecedores();
}, []);

const buscarFornecedores = async () => {
    try {
        const { data } = await fornecedorService.listar(); // ou listar(), dependendo do nome
        setFornecedores(data);
    } catch (error) {
        toast.error(getErrorMessage(error, 'Erro ao carregar fornecedores'));
    }
};




    useEffect(() => {
        if (isEditMode && id) {
            buscarAssinatura();
        }
    }, [id, reload]);



    const buscarAssinatura = async () => {
        try {
            showLoadingBar();
            const { data } = await assinaturaService.buscarPorId(id);
            setAssinaturaFormData(data);
console.log('Assinatura recebida para edição:', data);

        } catch (error) {
            toast.error(getErrorMessage(error, 'Erro ao carregar assinatura para edição'));
        } finally {
            hideLoadingBar();
        }
    };

    const handleSave = async (assinatura) => {
        const apiPromise = isEditMode
            ? assinaturaService.atualizar(assinatura.id, assinatura)
            : assinaturaService.criar(assinatura);

        toast.promise(apiPromise, {
            pending: assinatura.id ? 'Atualizando assinatura...' : 'Criando assinatura...',
            success: assinatura.id ? 'Assinatura atualizada com sucesso!' : 'Assinatura criada com sucesso!',
            error: {
                render({ data }) {
                    return getErrorMessage(data, 'Falha ao salvar dados');
                }
            }
        });

        try {
            const { data } = await apiPromise;
            if (isEditMode) {
                setReload(prev => !prev);
            } else {
                navigate(`/cadastros/assinaturas/${data.id}`);
            }
        } catch (_) {
            // erro já tratado
        }
    };

    return (
        <Container>
            <Card className='card-form'>
                <Card.Header as="h5">
                    {isEditMode ? 'Editar Assinatura' : 'Nova Assinatura'}
                </Card.Header>
<Card.Body>
    <LoadingOverlayBar show={isVisible} />
    <AssinaturaForm
        assinatura={assinaturaFormData}
        onSave={handleSave}
        fornecedores={fornecedores}
    />
</Card.Body>

            </Card>


            <div className="page-action">
                <Button variant="secondary" type="button" onClick={() => navigate('/cadastros/assinaturas')}>
                    <i className="bi bi-arrow-left"></i> Voltar
                </Button>
                <Button variant="success" type="submit" form="assinatura-form">
                    <i className="bi bi-check-lg"></i> Salvar
                </Button>
            </div>
        </Container>
    );
}

export default AssinaturaFormPage;
