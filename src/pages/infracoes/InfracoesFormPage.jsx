import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Card, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

import { getErrorMessage } from '../../utils/handleApiError.js';
import InfracaoForm from './components/InfracaoForm.jsx';
import * as infracaoService from '../../services/infracaoService.js';
import { useLoadingBar } from '../../contexts/LoadingBarContext.jsx';
import LoadingOverlayBar from '../../components/loading-overlay/LoadingOverlay.jsx';


function InfracoesFormPage() {
    const { id } = useParams();
    const isEditMode = Boolean(id);
    const navigate = useNavigate();
    const [infracoesFormData, setInfracoesFormData] = useState(null);
    const { isVisible, showLoadingBar, hideLoadingBar } = useLoadingBar();

    useEffect(() => {
        if ( isEditMode && id) {
            buscarInfracoes();
        }
    }, [id]);


    const buscarInfracoes = () => {
        showLoadingBar();
        infracaoService.buscar(id).then((response) => {
            setInfracoesFormData(response?.data);
        }).catch((error) => {
            toast.error(getErrorMessage(error, 'Erro ao buscar infração'));
        }).finally(() => {
            hideLoadingBar();
        });
    };

      const handleSave = async (infracao) => {
          const apiPromise = isEditMode
              ? infracaoService.atualizar(infracao.id, infracao)
              : infracaoService.criar(infracao);
  
          // Exibe feedback ao usuário
          toast.promise(apiPromise, {
              pending: infracao.id ? 'Atualizando Infracoes...' : 'Criando Infracoes...',
              success: infracao.id ? 'Infração atualizado com sucesso!' : 'Infração criado com sucesso!',
              error: {
                  render({ data }) {
                      return getErrorMessage(data, 'Falha ao salvar dados');
                  }
              }
          });
  
          try {
              const { data } = await apiPromise;
              navigate(`/usuarios/infracoes`);	
          } catch (_) {
              // erro já tratado pelo toast.promise
          }
      };

        return (
          <Container>
            <Card className='card-form'>
                <Card.Header as={'h5'}>
                    {isEditMode ? 'Editar Infração' : 'Nova Infração'}
                </Card.Header>
                <Card.Body>
                    {<LoadingOverlayBar show={isVisible} />}
                    <InfracaoForm infracao={infracoesFormData} onSave={handleSave} />
                </Card.Body>
            </Card>

            <div className="page-action d-flex justify-content-end gap-2">
                <Button variant='secondary' type='button' onClick={() => navigate('/cadastros/infracaos')}>
                    <i className="bi bi-arrow-left"></i> Voltar
                </Button>
                <Button variant='success' type='submit' form="infracao-form">
                    <i className="bi bi-check-lg"></i> Salvar
                </Button>
            </div>
        </Container>
    );
};

export default InfracoesFormPage;