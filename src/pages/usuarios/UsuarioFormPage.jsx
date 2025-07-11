import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Card, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

import { getErrorMessage } from '../../utils/handleApiError.js';
import UsuarioForm from './components/UsuarioForm';
import * as usuarioService from '../../services/usuarioService.js';
import { useLoadingBar } from '../../contexts/LoadingBarContext.jsx';
import LoadingOverlayBar from '../../components/loading-overlay/LoadingOverlay.jsx';

function UsuarioFormPage(){
    const { id } = useParams();
    const isEditMode = Boolean(id);
    const [usuarioFormData, setUsuarioFormData] = useState(null);
    const { isVisible, showLoadingBar, hideLoadingBar } = useLoadingBar();
    const navigate = useNavigate();

    useEffect(() => {
        if (isEditMode && id) {
            buscarUsuario();
        }
    }, [id]);

    const buscarUsuario = async () => {
        try {
            showLoadingBar();
            const { data:dados } = await usuarioService.buscarPorId(id);
            setUsuarioFormData(dados);
        } catch (error) {
            toast.error(getErrorMessage(error, 'Erro ao carregar usuário para edição'));
        } finally{
            hideLoadingBar();
        }
    };

    // Atualiza ou cria um usuário
    const handleSave = async (usuario) => {
        const apiPromise = isEditMode
            ? usuarioService.atualizar(usuario.id, usuario)
            : usuarioService.criar(usuario);

        // Exibe feedback ao usuário
        toast.promise(apiPromise, {
            pending: usuario.id ? 'Atualizando usuário...' : 'Criando usuário...',
            success: usuario.id ? 'Usuário atualizado com sucesso!' : 'Usuário criado com sucesso!',
            error: {
                render({ data }) {
                    return getErrorMessage(data, 'Falha ao salvar dados');
                }
            }
        });

        try {
            const { data } = await apiPromise;
            navigate(`/usuarios/${data.id}`);
        } catch (_) {
            // erro já tratado pelo toast.promise
        }
    };

    return(
        <Container>
            <Card className='card-form'>
                <Card.Header as={'h5'}>
                    {isEditMode ? 'Editar Usuário' : 'Nova Usuário'}
                </Card.Header>
                <Card.Body>
                    {<LoadingOverlayBar show={isVisible} />}
                    <UsuarioForm usuario={usuarioFormData} onSave={handleSave} />
                </Card.Body>
            </Card>

            <div className="page-action">
                <Button variant='secondary' type='button' onClick={() => navigate('/usuarios')}>
                    <i className="bi bi-arrow-left"></i> Voltar
                </Button>
                <Button variant='success' type='submit' form="usuario-form">
                    <i className="bi bi-check-lg"></i> Salvar
                </Button>
            </div>


            
        </Container>
    );
};

export default UsuarioFormPage;