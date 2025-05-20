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
            ativo: true
        }
    });

    // Atualiza o formulário sempre que a autor mudar (modo edição)
    useEffect(() => { 
        reset({
            id: autor?.id || null,
            nome: autor?.nome || '',
            ativo: autor?.ativo ?? true,
        });
    }, [autor, reset]);

    const onSubmit = (data) => {
        onSave(data);
    };

    return(
        <Form onSubmit={handleSubmit(onSubmit)}>
            <SectionTitle icon="bi-info-circle" title="Informações Básicas" />
            <Row>
                <Col md={6}>
                    <FloatingLabel label="Nome *">
                        <Form.Control type='text' placeholder="Digite o nome da autor" 
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

export default AutorForm;