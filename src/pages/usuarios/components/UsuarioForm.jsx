import { useEffect  } from 'react';
import { Form, Row, Col, FloatingLabel } from "react-bootstrap";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { usuarioSchema } from '../../../validations/usuarioValidation';

import SectionTitle from '../../../components/ui/SectionTitle';
import FormSwitch from '../../../components/ui/FormSwitch';
import { TipoUsuario } from '../../../enums/TipoUsuario';

function UsuarioForm({ usuario, onSave }) {
    // Define os campos do formulário e aplica a validação com YUP
    const { register, handleSubmit, formState: { errors }, reset, control } = useForm({ 
        resolver: yupResolver(usuarioSchema),
        defaultValues: {
            id: null,
            cpf: '',
            nome: '',
            dataNascimento: null,
            telefone: '',
            email: '',
            cep: '',
            endereco: '',
            tipoUsuario: '',
            bloqueado: false,
            ativo: true
        }
    });

    // Atualiza o formulário sempre que a usuário mudar (modo edição)
    useEffect(() => {
        reset({
            id: usuario?.id || null,
            cpf: usuario?.cpf || '',
            nome: usuario?.nome || '',
            dataNascimento: usuario?.dataNascimento.split('T')[0] || null,
            telefone: usuario?.telefone || '',
            email: usuario?.email || '',
            cep: usuario?.cep || '',
            endereco: usuario?.endereco || '',
            tipoUsuario: usuario?.tipoUsuario ||'',
            bloqueado: usuario?.bloqueado || false,
            ativo: usuario?.ativo ?? true,
        });
    }, [usuario, reset]);

    const onSubmit = (data) => {
        onSave(data);
    };

    return(
        <Form id="usuario-form" onSubmit={handleSubmit(onSubmit)}>
            <SectionTitle icon="bi-info-circle" title="Informações Básicas" />
            <Row>
                <Col md={3}>
                    <FloatingLabel label="CPF*">
                        <Form.Control type='text' {...register('cpf')} isInvalid={!!errors.cpf} />
                        <Form.Control.Feedback type="invalid">{errors.cpf?.message}</Form.Control.Feedback>
                    </FloatingLabel>
                </Col>
                <Col md={4}>
                    <FloatingLabel label="Nome*">
                        <Form.Control type='text' {...register('nome')} isInvalid={!!errors.nome} />
                        <Form.Control.Feedback type="invalid">{errors.nome?.message}</Form.Control.Feedback>
                    </FloatingLabel>
                </Col>
            </Row> 
            <Row>
                <Col md={3}>
                    <FloatingLabel label="Data de Nascimento*">
                        <Form.Control type='date' {...register('dataNascimento')} isInvalid={!!errors.dataNascimento} />
                        <Form.Control.Feedback type="invalid">{errors.dataNascimento?.message}</Form.Control.Feedback>
                    </FloatingLabel>
                </Col>                
                <Col md={4}>
                    <FloatingLabel label="Tipo de Usuário*">
                        <Form.Select {...register('tipoUsuario')} isInvalid={!!errors.tipoUsuario}>
                            <option></option>
                            {Object.entries(TipoUsuario).map(([key, label]) => (
                                <option key={key} value={key}>{label}</option>
                            ))}
                        </Form.Select> 
                        <Form.Control.Feedback type="invalid">{errors.tipoUsuario?.message}</Form.Control.Feedback>
                    </FloatingLabel>
                </Col>
            </Row>            
            <Row>
                <Col md={1}>
                    <FormSwitch name="ativo" control={control} label="Ativo" />
                </Col>
                <Col md={2}>
                    <FormSwitch name="bloqueado" control={control} label="Bloqueado" />
                </Col>
            </Row>
            <SectionTitle icon="bi-envelope" title="Contatos" />
            <Row>
                <Col md={3}>
                    <FloatingLabel label="Telefone*">
                        <Form.Control type='text'{...register('telefone')} isInvalid={!!errors.telefone} />
                        <Form.Control.Feedback type="invalid">{errors.telefone?.message}</Form.Control.Feedback>
                    </FloatingLabel>
                </Col>
                <Col md={4}>
                    <FloatingLabel label="E-mail*">
                        <Form.Control type='text' {...register('email')} isInvalid={!!errors.email} />
                        <Form.Control.Feedback type="invalid">{errors.email?.message}</Form.Control.Feedback>
                    </FloatingLabel>
                </Col>  
            </Row>
            <Row>
                <Col md={3}>
                    <FloatingLabel label="CEP*">
                        <Form.Control type='text' {...register('cep')} isInvalid={!!errors.cep} />
                        <Form.Control.Feedback type="invalid">{errors.cep?.message}</Form.Control.Feedback>
                    </FloatingLabel>
                </Col>
                <Col md={4}>
                    <FloatingLabel label="Endereço">
                        <Form.Control type='text' {...register('endereco')} isInvalid={!!errors.endereco} />
                        <Form.Control.Feedback type="invalid">{errors.endereco?.message}</Form.Control.Feedback>
                    </FloatingLabel>
                </Col>              
            </Row>            
        </Form>
    );
};

export default UsuarioForm;