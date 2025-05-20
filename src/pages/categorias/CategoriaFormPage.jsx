import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Card, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

import { getErrorMessage } from '../../utils/handleApiError.js';
import CategoriaForm from './components/CategoriaForm';
import * as categoriaService from '../../services/categoriaService.js';

function CategoriaFormPage(){
    const { id } = useParams();
    const isEditMode = Boolean(id);
    const [categoriaFormData, setCategoriaFormData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (isEditMode && id) {
            buscarCategoria();
        }
    }, [id]);

    const buscarCategoria = async () => {
        try {
            const { data:dados } = await categoriaService.buscarPorId(id);
            setCategoriaFormData(dados);
        } catch (error) {
            toast.error(getErrorMessage(error, 'Erro ao carregar categoria para edição'));
        }
    };

    // Atualiza ou cria uma categoria
    const handleSave = async (categoria) => {
        const apiPromise = isEditMode
            ? categoriaService.atualizar(categoria.id, categoria)
            : categoriaService.criar(categoria);

        // Exibe feedback ao usuário
        toast.promise(apiPromise, {
            pending: categoria.id ? 'Atualizando categoria...' : 'Criando categoria...',
            success: categoria.id ? 'Categoria atualizada com sucesso!' : 'Categoria criada com sucesso!',
            error: {
                render({ data }) {
                    return getErrorMessage(data, 'Falha ao salvar dados');
                }
            }
        });

        try {
            await apiPromise;
            setCategoriaFormData(null); // esvazia dados da categoria atual
            // buscarCategorias(); // atualiza a lista
        } catch (_) {
            // erro já tratado pelo toast.promise
        }
    };

    return(
        <Container>
            <Card className='card-form'>
                <Card.Header as={'h5'}>
                    {isEditMode ? 'Editar Categoria' : 'Nova Categoria'}
                </Card.Header>
                <Card.Body>
                    <CategoriaForm categoria={categoriaFormData} onSave={handleSave} />
                </Card.Body>
            </Card>

            <div className="page-action">
                <Button variant='secondary' type='button' onClick={() => navigate('/cadastros/categorias')}>
                    <i className="bi bi-arrow-left"></i> Voltar
                </Button>
                <Button variant='success' type='submit' onClick={handleSave}>
                    <i className="bi bi-check-lg"></i> Salvar
                </Button>
            </div>
        </Container>
    );
};

export default CategoriaFormPage;