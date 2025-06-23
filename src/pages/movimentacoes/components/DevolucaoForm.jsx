import { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';


import * as usuarioService from '../../../services/usuarioService.js';
import * as exemplarService from '../../../services/exemplarService.js';

function DevolucaoForm({ movimentacao = {}, onSave }) {
    const [formData, setFormData] = useState({
        usuarioId: '',
        exemplarId: '',
        DataFim: '',
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
  onSave({
    exemplarId: formData.exemplarId,
    usuarioId: formData.usuarioId
  });
};

const handleUsuarioChange = async (selected) => {
    const usuarioId = selected?.value || '';
    setFormData(prev => ({ ...prev, usuarioId, exemplarId: '' }));

    if (usuarioId) {
        try {
            const { data } = await usuarioService.listarExemplaresEmprestados(usuarioId);
            setExemplares(data);
        } catch (error) {
            console.error('Erro ao carregar exemplares emprestados:', error);
            setExemplares([]);
        }
    } else {
        setExemplares([]);
    }
};


    return (
        <Form onSubmit={handleSubmit}>
     <Form.Group className="mb-3">
    <Form.Label>Usuário</Form.Label>
    <Select
        name="usuarioId"
        options={usuarios.map(u => ({ value: u.id, label: u.nome }))}
        value={
            formData.usuarioId
                ? { value: formData.usuarioId, label: usuarios.find(u => u.id === formData.usuarioId)?.nome }
                : null
        }
        onChange={handleUsuarioChange}
        isClearable
        placeholder="Selecione ou digite o nome do usuário"
    />
</Form.Group>


    <Form.Group className="mb-3">
        <Form.Label>Exemplar</Form.Label>
        <Select
            name="exemplarId"
            options={exemplares.map(e => ({
                value: e.id,
                label: `${e.acervo?.titulo || 'Sem título'} (${e.codigo || 'Sem código'})`
            }))}
            value={exemplares.find(e => e.id === formData.exemplarId) && {
                value: formData.exemplarId,
                label: exemplares.find(e => e.id === formData.exemplarId)?.acervo?.titulo || 'Sem título'
            }}
            onChange={(selected) =>
                setFormData(prev => ({ ...prev, exemplarId: selected?.value || '' }))
            }
            isClearable
            placeholder="Selecione ou digite o exemplar"
        />
    </Form.Group>


            <Form.Group className="mb-3">
                <Form.Label>Data da devolução</Form.Label>
                <Form.Control
                    type="date"
                    name="dataFim"
                    value={formData.dataFim}
                    onChange={handleChange}
                    required
                />
            </Form.Group>

            <div className="page-action">
                <Button variant='secondary' type='button' onClick={() => navigate('/movimentacoes/devolucoes')}>
                    <i className="bi bi-arrow-left"></i> Voltar
                </Button>
                <Button variant='success' type='submit' className="ms-2">
                    
                    <i className="bi bi-check-lg"></i> Salvar
                    
                </Button>
            </div>
        </Form>
    );


}



export default DevolucaoForm;
