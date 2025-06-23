import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Card, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

import DevolucaoForm from './components/DevolucaoForm';
import * as movimentacaoService from '../../services/movimentacaoService.js'; // ajuste o caminho se necessário
import { getErrorMessage } from '../../utils/handleApiError.js'; // caso tenha utilitário para mensagens de erro
import LoadingOverlayBar from '../../components/loading-overlay/LoadingOverlay.jsx'; // se usar loading bar
import { useLoadingBar } from '../../contexts/LoadingBarContext.jsx';

function DevolucaoFormPage() {
  const { id } = useParams(); // caso queira editar um empréstimo existente
  const isEditMode = Boolean(id);
  const [movimentacao, setMovimentacao] = useState(null);
  const navigate = useNavigate();
  const { isVisible, showLoadingBar, hideLoadingBar } = useLoadingBar();

  useEffect(() => {
    if (isEditMode && id) {
      buscarMovimentacao();
    }
  }, [id]);

  async function buscarMovimentacao() {
    try {
      showLoadingBar();
      const { data } = await movimentacaoService.buscarPorId(id);
      setMovimentacao(data);
    } catch (error) {
      toast.error(getErrorMessage(error, 'Erro ao carregar movimentação para edição'));
    } finally {
      hideLoadingBar();
    }
  }

  const handleSave = async (formData) => {
    try {
      showLoadingBar();

      const payload = {
        usuarioId: Number(formData.usuarioId),
        exemplarId: Number(formData.exemplarId),
        dataFim: formData.dataFim,
        etapa: 'devolucao', // ou ajuste conforme sua lógica
      };

const apiPromise = isEditMode
  ? movimentacaoService.atualizar(id, { ...payload, etapa: 'devolucao' })  // editar devolução OK
  : movimentacaoService.registrarDevolucao(payload);                       // novo: chama o endpoint de devolução

      await toast.promise(
        apiPromise,
        {
          pending: isEditMode ? 'Atualizando devolução...' : 'Criando devolução...',
          success: isEditMode ? 'Devolução atualizada com sucesso!' : 'Devolução criada com sucesso!',
          error: {
            render({ data }) {
              return getErrorMessage(data, 'Falha ao salvar devolução');
            },
          },
        }
      );

      const data = await apiPromise;
      navigate('/movimentacoes/devolucoes/nova');
    } catch (error) {
      // erro tratado no toast.promise
    } finally {
      hideLoadingBar();
    }
  };

  return (
    <Container>
      <Card className="card-form">
        <Card.Header as="h5">
          {isEditMode ? 'Editar Devolução' : 'Nova Devolução'}
        </Card.Header>
        <Card.Body>
          <LoadingOverlayBar show={isVisible} />
          {/* Só renderiza o formulário após os dados de edição serem carregados */}
          {(!isEditMode || movimentacao) && (
            <DevolucaoForm movimentacao={movimentacao} onSave={handleSave} />
          )}
        </Card.Body>
      </Card>

      <div className="page-action mt-3">

      </div>
    </Container>
  );
}

export default DevolucaoFormPage;
