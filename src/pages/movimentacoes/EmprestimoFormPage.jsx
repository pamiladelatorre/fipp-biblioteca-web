import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Card, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

import EmprestimoForm from './components/EmprestimoForm';
import * as movimentacaoService from '../../services/movimentacaoService.js'; // ajuste o caminho se necessário
import { getErrorMessage } from '../../utils/handleApiError.js'; // caso tenha utilitário para mensagens de erro
import LoadingOverlayBar from '../../components/loading-overlay/LoadingOverlay.jsx'; // se usar loading bar
import { useLoadingBar } from '../../contexts/LoadingBarContext.jsx';

function EmprestimoFormPage() {
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
  const payload = {
    usuarioId: Number(formData.usuarioId),
    exemplarId: Number(formData.exemplarId),
    data_inicio: formData.dataEmprestimo,
    etapa: 'emprestimo',
    status: 'ativa', 
  };

  console.log('Dados salvos:', payload);

  try {
    await movimentacaoService.criar(payload);
    toast.success('Empréstimo salvo com sucesso!');
    navigate('/emprestimos');
  } catch (error) {
    console.error('Erro ao salvar movimentação:', error);
    toast.error(getErrorMessage(error, 'Erro ao salvar empréstimo'));
  }
};




  return (
    <Container>
      <Card className="card-form">
        <Card.Header as="h5">
          {isEditMode ? 'Editar Empréstimo' : 'Novo Empréstimo'}
        </Card.Header>
        <Card.Body>
          <LoadingOverlayBar show={isVisible} />
          {/* Só renderiza o formulário após os dados de edição serem carregados */}
          {(!isEditMode || movimentacao) && (
            <EmprestimoForm movimentacao={movimentacao} onSave={handleSave} />
          )}
        </Card.Body>
      </Card>

      <div className="page-action mt-3">

      </div>
    </Container>
  );
}

export default EmprestimoFormPage;
