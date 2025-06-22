import { useEffect, useState, Select } from 'react';
import { Form, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';


import * as usuarioService from '../../../services/usuarioService.js';
import * as exemplarService from '../../../services/exemplarService.js';

function EmprestimoForm({ movimentacao = {}, onSave }) {
  const [formData, setFormData] = useState({
    usuarioId: '',
    exemplarId: '',
    dataInicio: '', // ajustado aqui
    ...movimentacao,
  });

  const [usuarios, setUsuarios] = useState([]);
  const [exemplares, setExemplares] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    carregarUsuarios();
    carregarExemplares();
  }, []);

  const carregarUsuarios = async () => {
    try {
      const { data } = await usuarioService.listar();
      setUsuarios(data);
    } catch (error) {
      console.error('Erro ao carregar usuários:', error);
    }
  };

  const carregarExemplares = async () => {
    try {
      const { data } = await exemplarService.listar();
      setExemplares(data);
    } catch (error) {
      console.error('Erro ao carregar exemplares:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Dados para salvar:', formData);
    onSave(formData);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Usuário</Form.Label>
        <Form.Select
          name="usuarioId"
          value={formData.usuarioId}
          onChange={handleChange}
          required
        >
          <option value="">Selecione o usuário</option>
          {usuarios.map((u) => (
            <option key={u.id} value={u.id}>
              {u.nome}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

<Form.Group className="mb-3">
  <Form.Label>Exemplar</Form.Label>
  <Form.Select
    name="exemplarId"
    value={formData.exemplarId}
    onChange={handleChange}
    required
  >
    <option value="">Selecione o exemplar</option>
    {exemplares.map((e) => (
      <option
        key={e.id}
        value={e.id}
        disabled={e.status !== 'disponivel'}
      >
        {e.acervo?.titulo || 'Sem título'} ({e.tombo || 'Sem tombo'}) - {e.status || 'Sem status'}
      </option>
    ))}
  </Form.Select>
</Form.Group>


      <Form.Group className="mb-3">
        <Form.Label>Data do Empréstimo</Form.Label>
        <Form.Control
          type="date"
          name="dataInicio" // aqui ajustado para o nome correto
          value={formData.dataInicio}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <div className="page-action">
        <Button variant="secondary" type="button" onClick={() => navigate('/movimentacoes')}>
          <i className="bi bi-arrow-left"></i> Voltar
        </Button>
        <Button variant="success" type="submit" className="ms-2">
          <i className="bi bi-check-lg"></i> Salvar
        </Button>
      </div>
    </Form>
  );
}

export default EmprestimoForm;
