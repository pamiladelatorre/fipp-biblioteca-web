import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Card, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

import { getErrorMessage } from '../../utils/handleApiError.js';
import AutorForm from './components/AutorForm.jsx';
import * as autorService from '../../services/autorService.js';

function AutorFormPage(){
    const { id } = useParams();
    const isEditMode = Boolean(id);
    const [autorFormData, setAutorFormData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (isEditMode && id) {
            buscarAutor();
        }
    }, [id]);

    const buscarAutor = async () => {
        try {
            const { data:dados } = await autorService.buscarPorId(id);
            setAutorFormData(dados);
        } catch (error) {
            toast.error(getErrorMessage(error, 'Erro ao carregar autor para edição'));
        }
    };

    // Atualiza ou cria uma autor
    const handleSave = async (autor) => {
        const apiPromise = isEditMode
            ? autorService.atualizar(autor.id, autor)
            : autorService.criar(autor);

        // Exibe feedback ao usuário
        toast.promise(apiPromise, {
            pending: autor.id ? 'Atualizando autor...' : 'Criando autor...',
            success: autor.id ? 'Autor atualizada com sucesso!' : 'Autor criada com sucesso!',
            error: {
                render({ data }) {
                    return getErrorMessage(data, 'Falha ao salvar dados');
                }
            }
        });

        try {
            await apiPromise;
            setAutorFormData(null); // esvazia dados da autor atual
            // buscarCategorias(); // atualiza a lista
        } catch (_) {
            // erro já tratado pelo toast.promise
        }
    };

    return(
        <Container>
            <Card className='card-form'>
                <Card.Header as={'h5'}>
                    {isEditMode ? 'Editar Autor' : 'Nova autor'}
                </Card.Header>
                <Card.Body>
                    <AutorForm autor={autorFormData} onSave={handleSave} />
                </Card.Body>
            </Card>

            <div className="page-action d-flex justify-content-end gap-2">
                <Button variant='secondary' type='button' onClick={() => navigate('/cadastros/autores')}>
                    <i className="bi bi-arrow-left"></i> Voltar
                </Button>
                <Button variant='success' type='submit' onClick={handleSave}>
                    <i className="bi bi-check-lg"></i> Salvar
                </Button>
            </div>
        </Container>
    );
};

export default AutorFormPage;