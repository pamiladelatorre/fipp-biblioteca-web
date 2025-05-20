import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Card, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

import { getErrorMessage } from '../../utils/handleApiError.js';
import FornecedorForm from './components/FornecedorForm';
import * as fornecedorService from '../../services/fornecedorService.js';

function FornecedorFormPage(){
    const { id } = useParams();
    const isEditMode = Boolean(id);
    const [fornecedorFormData, setFornecedorFormData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (isEditMode && id) {
            buscarFornecedor();
        }
    }, [id]);

    const buscarFornecedor = async () => {
        try {
            const { data:dados } = await fornecedorService.buscarPorId(id);
            setFornecedorFormData(dados);
        } catch (error) {
            toast.error(getErrorMessage(error, 'Erro ao carregar fornecedor para edição'));
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
            await apiPromise;
            setFornecedorFormData(null); // esvazia dados da categoria atual
            // buscarCategorias(); // atualiza a lista
        } catch (_) {
            // erro já tratado pelo toast.promise
        }
    };

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
                <Button variant='success' type='submit' onClick={handleSave}>
                    <i className="bi bi-check-lg"></i> Salvar
                </Button>
            </div>
        </Container>
    );
};

export default FornecedorFormPage;