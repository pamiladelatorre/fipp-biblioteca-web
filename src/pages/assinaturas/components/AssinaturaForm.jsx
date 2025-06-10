import { useEffect } from 'react';
import { Form, Row, Col, FloatingLabel } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

function AssinaturaForm({ assinatura, onSave, fornecedores }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm({
        defaultValues: {
        descricao: '',
        fornecedorId: '',
        periodicidade: '',
        numeroContrato: '',
        valor: '',
        dataInicio: '',
        dataFim: '',
        ativo: false,
    },
  });

  useEffect(() => {
    if (assinatura) {
        reset({
        descricao: assinatura.descricao || '',
        fornecedorId: assinatura.fornecedor_id || '',
        periodicidade: assinatura.periodicidade || '',
        numeroContrato: assinatura.numero_contrato || '',
        valor: assinatura.valor || '',
        dataInicio: assinatura.data_inicio
        ? new Date(assinatura.data_inicio).toISOString().slice(0, 10)
        : '',
        dataFim: assinatura.data_fim
        ? new Date(assinatura.data_fim).toISOString().slice(0, 10)
        : '',

        ativo: assinatura.ativo || false,
      });
    }
  }, [assinatura, reset]);

  const onSubmit = (data) => {
    // Ajusta o objeto para backend (camelCase -> snake_case)
    const dataToSave = {
      ...data,
      fornecedor_id: data.fornecedorId,
      numero_contrato: data.numeroContrato,
      data_inicio: data.dataInicio,
      data_fim: data.dataFim,
    };
    delete dataToSave.fornecedorId;
    delete dataToSave.numeroContrato;
    delete dataToSave.dataInicio;
    delete dataToSave.dataFim;

    onSave(dataToSave);
  };

  return (
    <Form id="assinatura-form" onSubmit={handleSubmit(onSubmit)}>
      <Row>
        <Col md={6}>
          <FloatingLabel label="Descrição*" className="mb-3">
            <Form.Control
              type="text"
              {...register('descricao', { required: 'Descrição é obrigatória' })}
              isInvalid={!!errors.descricao}
            />
            <Form.Control.Feedback type="invalid">{errors.descricao?.message}</Form.Control.Feedback>
          </FloatingLabel>
        </Col>

<Col md={6}>
  <FloatingLabel label="Fornecedor*" className="mb-3">
 <Form.Select
  {...register('fornecedorId', {
    required: 'Fornecedor é obrigatório',
    valueAsNumber: true, 
  })}
  isInvalid={!!errors.fornecedorId}
>
  <option value="">Selecione um fornecedor</option>
  {fornecedores.map((f) => (
    <option key={f.id} value={f.id}>
      {f.id}
    </option>
  ))}
</Form.Select>

    <Form.Control.Feedback type="invalid">
      {errors.fornecedorId?.message}
    </Form.Control.Feedback>
  </FloatingLabel>
</Col>

      </Row>

      <Row>
        <Col md={4}>
          <FloatingLabel label="Periodicidade*" className="mb-3">
            <Form.Select
              {...register('periodicidade', { required: 'Periodicidade é obrigatória' })}
              isInvalid={!!errors.periodicidade}
            >
              <option value="">Selecione</option>
              <option value="semanal">Semanal</option>
              <option value="mensal">Mensal</option>
              <option value="anual">Anual</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">{errors.periodicidade?.message}</Form.Control.Feedback>
          </FloatingLabel>
        </Col>

        <Col md={4}>
          <FloatingLabel label="Número do Contrato" className="mb-3">
            <Form.Control
              type="text"
              {...register('numeroContrato')}
              isInvalid={!!errors.numeroContrato}
            />
            <Form.Control.Feedback type="invalid">{errors.numeroContrato?.message}</Form.Control.Feedback>
          </FloatingLabel>
        </Col>

        <Col md={4}>
          <FloatingLabel label="Valor*" className="mb-3">
            <Form.Control
              type="number"
              step="0.01"
              {...register('valor', { required: 'Valor é obrigatório', valueAsNumber: true })}
              isInvalid={!!errors.valor}
            />
            <Form.Control.Feedback type="invalid">{errors.valor?.message}</Form.Control.Feedback>
          </FloatingLabel>
        </Col>
      </Row>




      <Row>
        <Col md={3}>
          <FloatingLabel label="Data Início*" className="mb-3">
            <Form.Control
            
              type="date"
              {...register('dataInicio', { required: 'Data início é obrigatória' })}
              isInvalid={!!errors.dataInicio}
            />
            <Form.Control.Feedback type="invalid">{errors.dataInicio?.message}</Form.Control.Feedback>
          </FloatingLabel>
        </Col>

        <Col md={3}>
          <FloatingLabel label="Data Fim" className="mb-3">
            <Form.Control
              type="date"
              {...register('dataFim')}
              isInvalid={!!errors.dataFim}
            />
            <Form.Control.Feedback type="invalid">{errors.dataFim?.message}</Form.Control.Feedback>
          </FloatingLabel>
        </Col>

        <Col md={3} className="d-flex align-items-center">
          <Form.Check
            type="switch"
            label="Ativo"
            {...register('ativo')}
            className="mb-3"
          />
        </Col>
      </Row>

      {/* Botão salvar pode ficar fora do form, no AssinaturaFormPage */}
    </Form>
  );
}

export default AssinaturaForm;
