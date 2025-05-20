import { useEffect  } from 'react';
import { Form, Row, Col, FloatingLabel } from "react-bootstrap";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { motivoBaixaSchema } from '../../../validations/motivoBaixaValidation';

import SectionTitle from '../../../components/ui/SectionTitle';
import FormSwitch from '../../../components/ui/FormSwitch';

function MotivoBaixaForm({ motivoBaixa, onSave }) {
    // Define os campos do formulário e aplica a validação com YUP
    const { register, handleSubmit, formState: { errors }, reset, control } = useForm({ 
        resolver: yupResolver(motivoBaixaSchema),
        defaultValues: {
            id: null,
            descricao: '',
            ativo: true
        }
    });

    // Atualiza o formulário sempre que a motivo baixa mudar (modo edição)
    useEffect(() => {
        reset({
            id: motivoBaixa?.id || null,
            descricao: motivoBaixa?.descricao || '',
            ativo: motivoBaixa?.ativo ?? true,
        });
    }, [motivoBaixa, reset]);

    const onSubmit = (data) => {
        onSave(data);
    };

    return(
        <Form onSubmit={handleSubmit(onSubmit)}>
            <SectionTitle icon="bi-info-circle" title="Informações Básicas" />
            <Row>
                <Col md={6}>
                    <FloatingLabel label="Descrição *">
                        <Form.Control type='text' placeholder="Digite o nome do motivo baixa" 
                            {...register('descricao')} isInvalid={!!errors.descricao} />
                        <Form.Control.Feedback type="invalid">{errors.descricao?.message}</Form.Control.Feedback>
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

export default MotivoBaixaForm;