import { useEffect  } from 'react';
import { Form, Row, Col, FloatingLabel } from "react-bootstrap";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { usuarioSchema } from '../../../validations/usuarioValidation';

import SectionTitle from '../../../components/ui/SectionTitle';
import FormSwitch from '../../../components/ui/FormSwitch';

function UsuarioForm({ usuario, onSave }) {
    // Define os campos do formulário e aplica a validação com YUP
    const { register, handleSubmit, formState: { errors }, reset, control } = useForm({ 
        resolver: yupResolver(usuarioSchema),
        defaultValues: {
            id: null,
            nome: '',
            ativo: true
        }
    });

    // Atualiza o formulário sempre que a usuário mudar (modo edição)
    useEffect(() => {
        reset({
            id: usuario?.id || null,
            nome: usuario?.nome || '',
            ativo: usuario?.ativo ?? true,
        });
    }, [usuario, reset]);

    const onSubmit = (data) => {
        onSave(data);
    };

    return(
        <Form onSubmit={handleSubmit(onSubmit)}>
            <SectionTitle icon="bi-info-circle" title="Informações Básicas" />
            <Row>
                <Col md={6}>
                    <FloatingLabel label="Nome *">
                        <Form.Control type='text' placeholder="Digite a nome do usuário" 
                            {...register('nome')} isInvalid={!!errors.nome} />
                        <Form.Control.Feedback type="invalid">{errors.nome?.message}</Form.Control.Feedback>
                    </FloatingLabel>
                </Col>
            </Row> 
            <Row>
                <Col md={2}>
                    <FormSwitch name="ativo" control={control} label="Ativo" />
                </Col>
            </Row>
        </Form>
    );
};

export default UsuarioForm;