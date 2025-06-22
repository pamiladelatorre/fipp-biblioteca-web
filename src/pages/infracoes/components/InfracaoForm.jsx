import { useEffect, useState } from 'react';
import { Form, Row, Col, FloatingLabel, Button } from "react-bootstrap";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { infracaoSchema } from '../../../validations/infracaoValidation';
import { TipoInfracao as TipoEnum } from '../../../enums/TipoInfracao';
import { GrauInfracao as GrauEnum } from '../../../enums/GrauInfracao';
import { InfracaoStatus as StatusEnum } from '../../../enums/InfracaoStatus';
import * as usuarioService from '../../../services/usuarioService.js';

function InfracaoForm({ infracao, onSave }) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(infracaoSchema),
    defaultValues: {
      id: null,
      usuarioId: '',
      tipoInfracao: '',
      grauInfracao: '',
      status: '',
      motivo: '',
      dataInicio: '',
      dataFim: ''
    }
  });

  const [usuarios, setUsuarios] = useState([]);
  const emEdicao = !!infracao?.id;

  useEffect(() => {
    const carregarUsuarios = async () => {
      try {
        const res = await usuarioService.listar();
        setUsuarios(res?.data || []);
      } catch (error) {
        console.error('Erro ao carregar usuários:', error);
      }
    };

    carregarUsuarios();

    reset({
      id: infracao?.id || null,
      usuarioId: infracao?.usuarioId || '',
      tipoInfracao: infracao?.tipoInfracao || '',
      grauInfracao: infracao?.grauInfracao || '',
      status: infracao?.status || '',
      motivo: infracao?.motivo || '',
      dataInicio: infracao?.dataInicio?.split('T')[0] || '',
      dataFim: infracao?.dataFim?.split('T')[0] || ''
    });
  }, [infracao, reset]);

  const onSubmit = (data) => {
    onSave(data);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValue(name, value);
  };

  return (
    <Form id="infracao-form" onSubmit={handleSubmit(onSubmit)}>
      <Row>
        {/* Usuário */}
        <Col md={6}>
          <FloatingLabel label="Usuário" className="mb-3">
            {emEdicao ? (
              <Form.Control
                plaintext
                readOnly
                defaultValue={
                  usuarios.find((u) => u.id === infracao?.usuarioId)?.nome || ''
                }
              />
            ) : (
              <Form.Select
                name="usuarioId"
                {...register('usuarioId')}
                onChange={handleChange}
                isInvalid={!!errors.usuarioId}
              >
                <option value="">Selecione um Usuário</option>
                {usuarios.map((item) => (
                  <option key={item.id} value={item.id}>{item.nome}</option>
                ))}
              </Form.Select>
            )}
            <Form.Control.Feedback type="invalid">
              {errors.usuarioId?.message}
            </Form.Control.Feedback>
          </FloatingLabel>
        </Col>

        {/* Tipo de Infração */}
        <Col md={6}>
          <FloatingLabel label="Tipo da Infração" className="mb-3">
            {emEdicao ? (
              <Form.Control
                plaintext
                readOnly
                defaultValue={TipoEnum[infracao?.tipoInfracao] || ''}
              />
            ) : (
              <Form.Select
                name="tipoInfracao"
                {...register('tipoInfracao')}
                onChange={handleChange}
                isInvalid={!!errors.tipoInfracao}
              >
                <option value="">Selecione</option>
                {Object.entries(TipoEnum).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </Form.Select>
            )}
            <Form.Control.Feedback type="invalid">
              {errors.tipoInfracao?.message}
            </Form.Control.Feedback>
          </FloatingLabel>
        </Col>

        {/* Grau da Infração */}
        <Col md={6}>
          <FloatingLabel label="Grau da Infração" className="mb-3">
            {emEdicao ? (
              <Form.Control
                plaintext
                readOnly
                defaultValue={GrauEnum[infracao?.grauInfracao] || ''}
              />
            ) : (
              <Form.Select
                name="grauInfracao"
                {...register('grauInfracao')}
                onChange={handleChange}
                isInvalid={!!errors.grauInfracao}
              >
                <option value="">Selecione</option>
                {Object.entries(GrauEnum).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </Form.Select>
            )}
            <Form.Control.Feedback type="invalid">
              {errors.grauInfracao?.message}
            </Form.Control.Feedback>
          </FloatingLabel>
        </Col>

        {/* Status da Infração */}
        <Col md={6}>
          <FloatingLabel label="Status da Infração" className="mb-3">
            <Form.Select
              name="status"
              {...register('status')}
              onChange={handleChange}
              isInvalid={!!errors.status}
            >
              <option value="">Selecione</option>
              {Object.entries(StatusEnum).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.status?.message}
            </Form.Control.Feedback>
          </FloatingLabel>
        </Col>

        {/* Motivo */}
        <Col md={12}>
          <FloatingLabel label="Motivo da Infração" className="mb-3">
            {emEdicao ? (
              <Form.Control
                as="textarea"
                style={{ height: '100px' }}
                readOnly
                defaultValue={infracao?.motivo || ''}
              />
            ) : (
              <Form.Control
                as="textarea"
                style={{ height: '100px' }}
                {...register('motivo')}
                onChange={handleChange}
                isInvalid={!!errors.motivo}
                placeholder="Motivo da Infração"
              />
            )}
            <Form.Control.Feedback type="invalid">
              {errors.motivo?.message}
            </Form.Control.Feedback>
          </FloatingLabel>
        </Col>

        {/* Data Início */}
        <Col md={6}>
          <FloatingLabel label="Data Início" className="mb-3">
            {emEdicao ? (
              <Form.Control
                type="date"
                readOnly
                defaultValue={infracao?.dataInicio?.split('T')[0] || ''}
              />
            ) : (
              <Form.Control
                name="dataInicio"
                {...register('dataInicio')}
                onChange={handleChange}
                isInvalid={!!errors.dataInicio}
                type="date"
              />
            )}
            <Form.Control.Feedback type="invalid">
              {errors.dataInicio?.message}
            </Form.Control.Feedback>
          </FloatingLabel>
        </Col>

        {/* Data Fim */}
        <Col md={6}>
          <FloatingLabel label="Data Fim" className="mb-3">
            <Form.Control
              name="dataFim"
              {...register('dataFim')}
              onChange={handleChange}
              isInvalid={!!errors.dataFim}
              type="date"
            />
            <Form.Control.Feedback type="invalid">
              {errors.dataFim?.message}
            </Form.Control.Feedback>
          </FloatingLabel>
        </Col>
      </Row>


    </Form>
  );
}

export default InfracaoForm;
