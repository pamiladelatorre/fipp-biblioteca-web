import { useEffect  } from 'react';
import { Form, Row, Col, FloatingLabel } from "react-bootstrap";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { autorSchema } from '../../../validations/autorValidation';

import SectionTitle from '../../../components/ui/SectionTitle';
import FormSwitch from '../../../components/ui/FormSwitch';

function AutorForm({ autor, onSave }) {
    // Define os campos do formulário e aplica a validação com YUP
    const { register, handleSubmit, formState: { errors }, reset, control } = useForm({ 
        resolver: yupResolver(autorSchema),
        defaultValues: {
            id: null,
            nome: '',
            nacionalidade: '',
            dataNascimento: null,
            biografia: '',
            ativo: true
        }
    });

    // Atualiza o formulário sempre que a autor mudar (modo edição)
    useEffect(() => { 
        reset({
            id: autor?.id || null,
            nome: autor?.nome || '',
            nacionalidade: autor?.nacionalidade || '',
            dataNascimento: autor?.dataNascimento.split('T')[0] || null,
            biografia: autor?.biografia || '',
            ativo: autor?.ativo ?? true,
        });
    }, [autor, reset]);

    const onSubmit = (data) => {
        onSave(data);
    };

    return(
        <Form id="autor-form" onSubmit={handleSubmit(onSubmit)}>
            <SectionTitle icon="bi-info-circle" title="Informações Básicas" />
            <Row>
                <Col md={6}>
                    <FloatingLabel label="Nome *">
                        <Form.Control type='text' {...register('nome')} isInvalid={!!errors.nome} />
                        <Form.Control.Feedback type="invalid">{errors.nome?.message}</Form.Control.Feedback>
                    </FloatingLabel>
                </Col>
            </Row> 
            <Row>
                <Col md={3}>
                    <FloatingLabel label="Nacionalidade *">
                        <Form.Control type='text' {...register('nacionalidade')} isInvalid={!!errors.nacionalidade} />
                        <Form.Control.Feedback type="invalid">{errors.nacionalidade?.message}</Form.Control.Feedback>
                    </FloatingLabel>
                </Col>
                <Col md={3}>
                    <FloatingLabel label="Data de Nascimento *">
                        <Form.Control type='date' {...register('dataNascimento')} isInvalid={!!errors.dataNascimento} />
                        <Form.Control.Feedback type="invalid">{errors.dataNascimento?.message}</Form.Control.Feedback>
                    </FloatingLabel>
                </Col>
            </Row>
            <Row>
                <Col md={1}>
                    <FormSwitch name="ativo" control={control} label="Ativo" />
                </Col>
            </Row>
            <SectionTitle icon="bi-person-lines-fill" title="Perfil do Autor" />
            <Row>
                <Col md={6}>
                    <FloatingLabel label="Biografia">
                        <Form.Control 
                            as="textarea" 
                            style={{ height: '150px' }} 
                            {...register('biografia')} isInvalid={!!errors.biografia} 
                        />
                        <Form.Control.Feedback type="invalid">{errors.biografia?.message}</Form.Control.Feedback>
                    </FloatingLabel>
                </Col>
            </Row>
        </Form>
    );
};

export default AutorForm;