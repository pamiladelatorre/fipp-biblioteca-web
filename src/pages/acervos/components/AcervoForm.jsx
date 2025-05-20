import { useEffect  } from 'react';
import { Form, Row, Col, FloatingLabel } from "react-bootstrap";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { acervoSchema } from '../../../validations/acervoValidation';

import SectionTitle from '../../../components/ui/SectionTitle';
import FormSwitch from '../../../components/ui/FormSwitch';

function AcervoForm({ acervo, onSave }) {
    // Define os campos do formulário e aplica a validação com YUP
    const { register, handleSubmit, formState: { errors }, reset, control } = useForm({ 
        resolver: yupResolver(acervoSchema),
        defaultValues: {
            id: null,
            titulo: '',
            ativo: true
        }
    });

    // Atualiza o formulário sempre que a acervo mudar (modo edição)
    useEffect(() => {
        reset({
            id: acervo?.id || null,
            titulo: acervo?.titulo || '',
            ativo: acervo?.ativo ?? true,
        });
    }, [acervo, reset]);

    const onSubmit = (data) => {
        onSave(data);
    };

    return(
        <Form onSubmit={handleSubmit(onSubmit)}>
            <SectionTitle icon="bi-info-circle" title="Informações Básicas" />
            <Row>
                <Col md={6}>
                    <FloatingLabel label="Título*">
                        <Form.Control type='text' placeholder="Digite o título da acervo" 
                            {...register('titulo')} isInvalid={!!errors.titulo} />
                        <Form.Control.Feedback type="invalid">{errors.titulo?.message}</Form.Control.Feedback>
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

export default AcervoForm;