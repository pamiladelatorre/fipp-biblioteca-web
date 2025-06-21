import { useEffect, useState  } from 'react';
import { Form, Row, Col, Accordion, Button, FloatingLabel } from "react-bootstrap";
import { useForm } from 'react-hook-form';
import { ExemplarEstado } from '../../../enums/ExemplarEstado';
import { ExemplarStatus } from '../../../enums/ExemplarStatus';
import ToggleButtonGroupField from '../../../components/ui/ToggleButtonGroupField';
import { yupResolver } from '@hookform/resolvers/yup';
import { getErrorMessage } from '../../../utils/handleApiError.js';
import { toast } from 'react-toastify';
import { exemplarSchema } from '../../../validations/exemplarValidation';

import SectionTitle from '../../../components/ui/SectionTitle';
import * as motivoBaixaService from '../../../services/motivoBaixaService.js'

function ExemplarForm({ exemplar, onSaveEstado, onSaveBaixa }) {
    // Define os campos do formulário e aplica a validação com YUP
    const { register, handleSubmit, formState: { errors }, reset, control, getValues } = useForm({ 
        resolver: yupResolver(exemplarSchema),
        defaultValues: {
            id: null,
            estado: '',
            motivoBaixaId: null,
            observacoesBaixa: '',
        }
    });
    const [motivosBaixa, setMotivosBaixa] = useState([]);

    // Atualiza o formulário sempre que a exemplar mudar (modo edição)
    useEffect(() => {
        const carregarDados = async () =>   {
            try {
                const [resMotivos] = await Promise.all([
                    motivoBaixaService.buscarAtivos()
                ]);

                setMotivosBaixa(resMotivos?.data || []);

                reset({
                    id: exemplar?.id,
                    estado: exemplar?.estado,
                    motivoBaixaId: exemplar?.motivoBaixaId,
                    observacoesBaixa: exemplar?.observacoesBaixa
                });
            } catch (error) {
                toast.error(getErrorMessage(error, 'Erro ao carregar dados do formulário'));
            }
        };

        carregarDados();
    }, [exemplar, reset]);

    const onEditEstado = () => {
        const estado = getValues('estado');
        onSaveEstado(estado)
    }

    const onSubmit = (data) => {
        onSaveBaixa(data);
    };

    return(
        <>
            <Form id="exemplar-form">
                <SectionTitle icon="bi-info-circle" title="Informações Básicas" />
                <Form.Group as={Row}>
                    <Form.Label column sm="1">Acervo:</Form.Label>
                    <Col>
                        <Form.Control plaintext readOnly defaultValue={ exemplar?.acervo?.titulo }></Form.Control>
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column sm="1">Tombo:</Form.Label>
                    <Col>
                        <Form.Control plaintext readOnly defaultValue={ exemplar?.tombo }></Form.Control>
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column sm="1">Estado:</Form.Label>
                    <Col>
                        <Form.Control plaintext readOnly defaultValue={ exemplar?.estado && ExemplarEstado[exemplar.estado]  }></Form.Control>
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column sm="1">Status:</Form.Label>
                    <Col>
                        <Form.Control plaintext readOnly defaultValue={ exemplar?.status && ExemplarStatus[exemplar.status] }></Form.Control>
                    </Col>
                </Form.Group>
            </Form>
            <Accordion className='mt-3'>
                {ExemplarStatus[exemplar?.status] != ExemplarStatus.baixado &&
                <Accordion.Item eventKey="0">
                    <Accordion.Header><SectionTitle icon="bi-pencil-square" title="Alterar Estado" /></Accordion.Header>
                    <Accordion.Body>
                        <ToggleButtonGroupField
                            name="estado"
                            control={control}
                            options={Object.entries(ExemplarEstado).map(([id, label]) => ({ id, label }))}
                            className='btn-group-pill'
                        />
                        <div className="page-action m-0">
                            <Button variant='success' type='button' onClick={onEditEstado}>
                                <i className="bi bi-check-lg"></i> Alterar
                            </Button>
                        </div>
                    </Accordion.Body>
                </Accordion.Item>}
                <Accordion.Item eventKey="1">
                    <Accordion.Header>
                        <SectionTitle icon="bi-trash3" title="Baixa" />
                    </Accordion.Header>
                    <Accordion.Body>
                        <Form onSubmit={handleSubmit(onSubmit)}>
                            <Row>
                                <Col md={4}>
                                    <FloatingLabel label="Motivo Baixa">
                                        <Form.Select 
                                            {...register('motivoBaixaId')} 
                                            isInvalid={!!errors.motivoBaixaId}
                                            disabled={ExemplarStatus[exemplar?.status] == ExemplarStatus.baixado}
                                            readOnly={ExemplarStatus[exemplar?.status] == ExemplarStatus.baixado}                                            
                                        >
                                            <option value="">Selecione</option>
                                            {motivosBaixa?.map((item) => (
                                                <option key={item.id} value={item.id}>{item.descricao}</option>
                                            ))}
                                        </Form.Select>
                                        <Form.Control.Feedback type="invalid">{errors.motivoBaixaId?.message}</Form.Control.Feedback>
                                    </FloatingLabel>
                                </Col>                                             
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <FloatingLabel label="Observações">
                                        <Form.Control 
                                            as="textarea" 
                                            style={{ height: '100px' }} 
                                            {...register('observacoesBaixa')}  
                                            disabled={ExemplarStatus[exemplar?.status] == ExemplarStatus.baixado}
                                            readOnly={ExemplarStatus[exemplar?.status] == ExemplarStatus.baixado}
                                        />
                                    </FloatingLabel>
                                </Col>
                            </Row>
                            {ExemplarStatus[exemplar?.status] != ExemplarStatus.baixado && 
                                <div className="page-action m-0">
                                    <Button variant='success' type='submit'>
                                        <i className="bi bi-check-lg"></i> Baixar
                                    </Button>
                                </div>
                            }
                        </Form>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </>
    );
};

export default ExemplarForm;