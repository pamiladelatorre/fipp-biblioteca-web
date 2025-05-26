import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Card, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import LoadingSpinner from '../../components/loading-spinner/LoadingSpinner.jsx';
import { useLoading } from '../../hooks/useLoading.js';

import { getErrorMessage } from '../../utils/handleApiError.js';
import FornecedorForm from './components/FornecedorForm';
import * as fornecedorService from '../../services/fornecedorService.js';

function FornecedorFormPage(){
    const { id } = useParams();
    const isEditMode = Boolean(id);
    const [fornecedorFormData, setFornecedorFormData] = useState(null);
    const { loading, start, stop } = useLoading();
    const [reload, setReload] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (isEditMode && id) {
            buscarFornecedor();
        }
    }, [id, reload]);

    const buscarFornecedor = async () => {
        try {
            start();
            const { data:dados } = await fornecedorService.buscarPorId(id);
            setFornecedorFormData(dados);
        } catch (error) {
            toast.error(getErrorMessage(error, 'Erro ao carregar fornecedor para edição'));
        }finally{
            stop();
        }
    };

    // Atualiza ou cria um fornecedor
    const handleSave = async (fornecedor) => {
        const apiPromise = isEditMode
            ? fornecedorService.atualizar(fornecedor.id, fornecedor)
            : fornecedorService.criar(fornecedor);

        // Exibe feedback ao fornecedor
        toast.promise(apiPromise, {
            pending: fornecedor.id ? 'Atualizando fornecedor...' : 'Criando fornecedor...',
            success: fornecedor.id ? 'Fornecedor atualizado com sucesso!' : 'Fornecedor criado com sucesso!',
            error: {
                render({ data }) {
                    return getErrorMessage(data, 'Falha ao salvar dados');
                }
            }
        });

        try {
            const { data } = await apiPromise;
            if (isEditMode) {
                setReload(prev => !prev); // força o useEffect a recarregar os dados
            } else {
                navigate(`/cadastros/fornecedores/${data.id}`); // para novo cadastro
            }
        } catch (_) {
            // erro já tratado pelo toast.promise
        }
    };

    if (loading) return <LoadingSpinner message="Carregando o fornecedor..." />;

    return(
        <Container>
            <Card className='card-form'>
                <Card.Header as={'h5'}>
                    {isEditMode ? 'Editar Fornecedor' : 'Nova Fornecedor'}
                </Card.Header>
                <Card.Body>
                    <FornecedorForm fornecedor={fornecedorFormData} onSave={handleSave} />
                </Card.Body>
            </Card>

            <div className="page-action">
                <Button variant='secondary' type='button' onClick={() => navigate('/cadastros/fornecedores')}>
                    <i className="bi bi-arrow-left"></i> Voltar
                </Button>
                <Button variant='success' type='submit' form="fornecedor-form">
                    <i className="bi bi-check-lg"></i> Salvar
                </Button>
            </div>
        </Container>
    );
};

export default FornecedorFormPage;