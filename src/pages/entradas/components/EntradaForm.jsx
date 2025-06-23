import { useEffect, useState  } from 'react';
import { Form, Row, Col, FloatingLabel } from "react-bootstrap";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { entradaSchema } from '../../../validations/entradaValidation';

import SectionTitle from '../../../components/ui/SectionTitle';
import * as acervoService from '../../../services/acervoService.js'
import * as doadorService from '../../../services/doadorService.js'
import { TipoOrigem } from '../../../enums/TipoOrigem.js';

function EntradaForm({ entrada, onSave }) {
    // Define os campos do formulário e aplica a validação com YUP
    const { register, handleSubmit, formState: { errors }, reset, watch } = useForm({ 
        resolver: yupResolver(entradaSchema),
        defaultValues: {
            id: null,
            acervoId: null,
            tipoOrigem: '',
            origemId: null,
            quantidade: '',
            dataEntrada: null,
            contrato: '',
            empenho: '',
            doadorId: null
        }
    });
    const tipoOrigem = watch('tipoOrigem');
    const [acervos, setAcervos] = useState([]);
    const [doadores, setDoadores] = useState([]);

    // Atualiza o formulário sempre que a entrada mudar (modo edição)
    useEffect(() => {
        const carregarDados = async () =>   {
            try {
                const [resAcervos, resDoadores] = await Promise.all([
                    acervoService.buscarAtivos(),
                    doadorService.buscarAtivos()
                ]);

                setAcervos(resAcervos?.data || []);
                setDoadores(resDoadores?.data || []);

                reset({
                    id: entrada?.id || null,
                    acervoId: entrada?.acervoId || null,
                    tipoOrigem: entrada?.tipoOrigem || '',
                    origemId: entrada?.origemId || null,
                    quantidade: entrada?.quantidade || '',
                    dataEntrada: entrada?.dataEntrada.split('T')[0] || null,
                    contrato: TipoOrigem[entrada?.tipoOrigem] == TipoOrigem.assinatura ? entrada?.origem.numeroContrato : '',
                    empenho: TipoOrigem[entrada?.tipoOrigem] == TipoOrigem.compra ? entrada?.origem.numeroEmpenho : '',
                    doadorId: TipoOrigem[entrada?.tipoOrigem] == TipoOrigem.doacao ? entrada?.origem.doadorId : null
                });
            } catch (error) {
                toast.error(getErrorMessage(error, 'Erro ao carregar dados do formulário'));
            }
        };

        carregarDados();
    }, [entrada, reset]);


    const onSubmit = (data) => {
        onSave(data);
    };

    return(
        <Form id="entrada-form" onSubmit={handleSubmit(onSubmit)}>
            <SectionTitle icon="bi-info-circle" title="Informações Básicas" />
            <Row>
                <Col md={4}>
                    <FloatingLabel label="Acervo*">
                        <Form.Select {...register('acervoId')} isInvalid={!!errors.acervoId}>
                            <option value="">Selecione</option>
                            {acervos?.map((item) => (
                                <option key={item.id} value={item.id}>{item.titulo}</option>
                            ))}
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">{errors.acervoId?.message}</Form.Control.Feedback>
                    </FloatingLabel>                  
                </Col>
                <Col md={4}>
                    <FloatingLabel label="Quantidade*">
                        <Form.Control 
                            type='number' 
                            {...register('quantidade')} 
                            isInvalid={!!errors.quantidade} 
                            disabled={entrada != null}
                            readOnly={entrada != null} />
                        <Form.Control.Feedback type="invalid">{errors.quantidade?.message}</Form.Control.Feedback>
                    </FloatingLabel>
                </Col> 
                <Col md={4}>
                    <FloatingLabel label="Data de Entrada*">
                        <Form.Control type='date' {...register('dataEntrada')} isInvalid={!!errors.dataEntrada} />
                        <Form.Control.Feedback type="invalid">{errors.dataEntrada?.message}</Form.Control.Feedback>
                    </FloatingLabel>
                </Col>
            </Row>
            <SectionTitle icon="bi-signpost" title="Origem" />
            <Row>
                <Col md={4}>
                    <FloatingLabel label="Tipo de Origem*">
                        <Form.Select 
                            {...register('tipoOrigem')}
                            isInvalid={!!errors.tipoOrigem}
                        >
                            <option value="">Selecione</option>
                            {Object.entries(TipoOrigem).map(([key, label]) => (
                                <option key={key} value={key}>{label}</option>
                            ))}
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">{errors.tipoOrigem?.message}</Form.Control.Feedback>
                    </FloatingLabel>                  
                </Col>
                {tipoOrigem === 'assinatura' && (
                    <Col md={4}>
                        <FloatingLabel label="Contrato*">
                            <Form.Control type='text' {...register('contrato')} isInvalid={!!errors.contrato} />
                            <Form.Control.Feedback type="invalid">{errors.contrato?.message}</Form.Control.Feedback>
                        </FloatingLabel>
                    </Col>
                )}
                {tipoOrigem === 'compra' && (
                    <Col md={4}>
                        <FloatingLabel label="Empenho*">
                            <Form.Control type='text' {...register('empenho')} isInvalid={!!errors.empenho} />
                            <Form.Control.Feedback type="invalid">{errors.empenho?.message}</Form.Control.Feedback>
                        </FloatingLabel>
                    </Col>
                )}
                {tipoOrigem === 'doacao' && (
                    <Col md={4}>
                        <FloatingLabel label="Doador*">
                            <Form.Select {...register('doadorId')} isInvalid={!!errors.doadorId}>
                                <option value="">Selecione</option>
                                {doadores?.map((item) => (
                                    <option key={item.id} value={item.id}>{item.nome}</option>
                                ))}
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">{errors.doadorId?.message}</Form.Control.Feedback>
                        </FloatingLabel>                  
                    </Col>
                )}
            </Row>
        </Form>
    );
};

export default EntradaForm;