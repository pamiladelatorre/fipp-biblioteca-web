import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Card, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

import { getErrorMessage } from '../../utils/handleApiError.js';
import AcervoForm from './components/AcervoForm';
import * as acervoService from '../../services/acervoService.js';

function AcervoFormPage(){
    const { id } = useParams();
    const isEditMode = Boolean(id);
    const [acervoFormData, setAcervoFormData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (isEditMode && id) {
            buscarAcervo();
        }
    }, [id]);

    const buscarAcervo = async () => {
        try {
            const { data:dados } = await acervoService.buscarPorId(id);
            setAcervoFormData(dados);
        } catch (error) {
            toast.error(getErrorMessage(error, 'Erro ao carregar acervo para edição'));
        }
    };

    // Atualiza ou cria uma acervo
    const handleSave = async (acervo) => {
        const apiPromise = isEditMode
            ? acervoService.atualizar(acervo.id, acervo)
            : acervoService.criar(acervo);

        // Exibe feedback ao usuário
        toast.promise(apiPromise, {
            pending: acervo.id ? 'Atualizando acervo...' : 'Criando acervo...',
            success: acervo.id ? 'Acervo atualizada com sucesso!' : 'Acervo criada com sucesso!',
            error: {
                render({ data }) {
                    return getErrorMessage(data, 'Falha ao salvar dados');
                }
            }
        });

        try {
            await apiPromise;
            setAcervoFormData(null); // esvazia dados da acervo atual
            // buscarCategorias(); // atualiza a lista
        } catch (_) {
            // erro já tratado pelo toast.promise
        }
    };

    return(
        <Container>
            <Card className='card-form'>
                <Card.Header as={'h5'}>
                    {isEditMode ? 'Editar Acervo' : 'Nova Acervo'}
                </Card.Header>
                <Card.Body>
                    <AcervoForm acervo={acervoFormData} onSave={handleSave} />
                </Card.Body>
            </Card>

            <div className="page-action">
                <Button variant='secondary' type='button' onClick={() => navigate('/acervos')}>
                    <i className="bi bi-arrow-left"></i> Voltar
                </Button>
                <Button variant='success' type='submit' onClick={handleSave}>
                    <i className="bi bi-check-lg"></i> Salvar
                </Button>
            </div>
        </Container>
    );
};

export default AcervoFormPage;