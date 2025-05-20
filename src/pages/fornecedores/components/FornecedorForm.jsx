import { useEffect, useState  } from 'react';
import { Form, Row, Col, FloatingLabel, Accordion, ToggleButtonGroup, ToggleButton  } from "react-bootstrap";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { fornecedorSchema } from '../../../validations/fornecedorValidation';

import SectionTitle from '../../../components/ui/SectionTitle';
import FormSwitch from '../../../components/ui/FormSwitch';

function FornecedorForm({ fornecedor, onSave }) {
    const [value, setValue] = useState([1, 3]);
    const handleChange = (val) => setValue(val);
    // Define os campos do formulário e aplica a validação com YUP
    const { register, handleSubmit, formState: { errors }, reset, control } = useForm({ 
        resolver: yupResolver(fornecedorSchema),
        defaultValues: {
            id: null,
            cnpj: '',
            razaoSocial: '',
            representante: '',
            telefone: '',
            email: '',
            endereco: '',
            metodosPagamento: [],
            generos: [],
            ativo: true
        }
    });

    // Atualiza o formulário sempre que a fornecedor mudar (modo edição)
    useEffect(() => {
        reset({
            id: fornecedor?.id || null,
            cnpj: fornecedor?.cnpj || '',
            razaoSocial: fornecedor?.razaoSocial || '',
            representante: fornecedor?.representante || '',
            telefone: fornecedor?.telefone || '',
            email: fornecedor?.email || '',
            endereco: fornecedor?.endereco || '',
            metodosPagamento: fornecedor?.metodosPagamento || [],
            generos: fornecedor?.generos || [],
            ativo: fornecedor?.ativo ?? true,
        });
    }, [fornecedor, reset]);

    const onSubmit = (data) => {
        onSave(data);
    };

    return(
        <Form onSubmit={handleSubmit(onSubmit)}>
            <SectionTitle icon="bi-info-circle" title="Informações Básicas" />
            <Row>
                <Col md={3}>
                    <FloatingLabel label="CNPJ*">
                        <Form.Control type='text' placeholder="Digite o cnpj do fornecedor" 
                            {...register('cnpj')} isInvalid={!!errors.cnpj} />
                        <Form.Control.Feedback type="invalid">{errors.cnpj?.message}</Form.Control.Feedback>
                    </FloatingLabel>
                </Col>
                <Col md={1}>
                    <FormSwitch name="ativo" control={control} label="Ativo" />
                </Col>
            </Row> 
            <Row>
                <Col md={4}>
                    <FloatingLabel label="Razão Social*">
                        <Form.Control type='text' placeholder="Digite a razão social do fornecedor" 
                            {...register('razaoSocial')} isInvalid={!!errors.razaoSocial} />
                        <Form.Control.Feedback type="invalid">{errors.razaoSocial?.message}</Form.Control.Feedback>
                    </FloatingLabel>
                </Col>
            </Row> 
            <Row>
                <Col md={4}>
                    <FloatingLabel label="Representante*">
                        <Form.Control type='text' placeholder="Digite o representante do fornecedor" 
                            {...register('representante')} isInvalid={!!errors.representante} />
                        <Form.Control.Feedback type="invalid">{errors.representante?.message}</Form.Control.Feedback>
                    </FloatingLabel>
                </Col>             
            </Row>
            <SectionTitle icon="bi-briefcase" title="Contatos" />
            <Row>
                <Col md={3}>
                    <FloatingLabel label="Telefone*">
                        <Form.Control type='text' placeholder="Digite a telefone do fornecedor" 
                            {...register('telefone')} isInvalid={!!errors.telefone} />
                        <Form.Control.Feedback type="invalid">{errors.telefone?.message}</Form.Control.Feedback>
                    </FloatingLabel>
                </Col>
                <Col md={3}>
                    <FloatingLabel label="E-mail*">
                        <Form.Control type='text' placeholder="Digite o email do fornecedor" 
                            {...register('email')} isInvalid={!!errors.email} />
                        <Form.Control.Feedback type="invalid">{errors.email?.message}</Form.Control.Feedback>
                    </FloatingLabel>
                </Col>  
            </Row>
            <Row>
                <Col md={6}>
                    <FloatingLabel label="Endereço*">
                        <Form.Control type='text' placeholder="Digite o endereco do fornecedor" 
                            {...register('endereco')} isInvalid={!!errors.endereco} />
                        <Form.Control.Feedback type="invalid">{errors.endereco?.message}</Form.Control.Feedback>
                    </FloatingLabel>
                </Col>              
            </Row>
            <Accordion className='mt-3'>
                <Accordion.Item eventKey="0">
                    <Accordion.Header><SectionTitle icon="bi-bookshelf" title="Gêneros" /></Accordion.Header>
                    <Accordion.Body>
                        <ToggleButtonGroup type="checkbox" value={value} onChange={handleChange}>
                            <ToggleButton id="tbg-btn-1" value={1}>
                                Option 1
                            </ToggleButton>
                            <ToggleButton id="tbg-btn-2" value={2}>
                                Option 2
                            </ToggleButton>
                            <ToggleButton id="tbg-btn-3" value={3}>
                                Option 3
                            </ToggleButton>
                        </ToggleButtonGroup> 
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header><SectionTitle icon="bi-wallet2" title="Meios de Pagamento" /></Accordion.Header>
                    <Accordion.Body>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                        minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                        aliquip ex ea commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                        culpa qui officia deserunt mollit anim id est laborum.
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                    <Accordion.Header><SectionTitle icon="bi-wallet2" title="Teste" /></Accordion.Header>
                    <Accordion.Body>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                        minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                        aliquip ex ea commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                        culpa qui officia deserunt mollit anim id est laborum.
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            
        </Form>
    );
};

export default FornecedorForm;