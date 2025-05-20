import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Card, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

import { getErrorMessage } from '../../utils/handleApiError.js';
import GeneroForm from './components/GeneroForm';
import * as generoService from '../../services/generoService.js';

function GeneroFormPage(){
    const { id } = useParams();
    const isEditMode = Boolean(id);
    const [generoFormData, setGeneroFormData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (isEditMode && id) {
            buscarGenero();
        }
    }, [id]);

    const buscarGenero = async () => {
        try {
            const { data:dados } = await generoService.buscarPorId(id);
            setGeneroFormData(dados);
        } catch (error) {
            toast.error(getErrorMessage(error, 'Erro ao carregar genero para edição'));
        }
    };

    // Atualiza ou cria um genero
    const handleSave = async (genero) => {
        const apiPromise = isEditMode
            ? generoService.atualizar(genero.id, genero)
            : generoService.criar(genero);

        // Exibe feedback ao usuário
        toast.promise(apiPromise, {
            pending: genero.id ? 'Atualizando genero...' : 'Criando genero...',
            success: genero.id ? 'Genero atualizado com sucesso!' : 'Genero criado com sucesso!',
            error: {
                render({ data }) {
                    return getErrorMessage(data, 'Falha ao salvar dados');
                }
            }
        });

        try {
            await apiPromise;
            setGeneroFormData(null); // esvazia dados da categoria atual
            // buscarCategorias(); // atualiza a lista
        } catch (_) {
            // erro já tratado pelo toast.promise
        }
    };

    return(
        <Container>
            <Card className='card-form'>
                <Card.Header as={'h5'}>
                    {isEditMode ? 'Editar Genero' : 'Nova Genero'}
                </Card.Header>
                <Card.Body>
                    <GeneroForm genero={generoFormData} onSave={handleSave} />
                </Card.Body>
            </Card>

            <div className="page-action">
                <Button variant='secondary' type='button' onClick={() => navigate('/cadastros/generos')}>
                    <i className="bi bi-arrow-left"></i> Voltar
                </Button>
                <Button variant='success' type='submit' onClick={handleSave}>
                    <i className="bi bi-check-lg"></i> Salvar
                </Button>
            </div>
        </Container>
    );
};

export default GeneroFormPage;