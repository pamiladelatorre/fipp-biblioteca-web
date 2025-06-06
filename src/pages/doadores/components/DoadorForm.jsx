import { useEffect } from 'react';
import { Form, Row, Col, FloatingLabel} from "react-bootstrap";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import { doadorSchema } from '../../../validations/doadorValidation';

import SectionTitle from '../../../components/ui/SectionTitle';
import FormSwitch from '../../../components/ui/FormSwitch';
import { TipoPessoa } from '../../../enums/TipoPessoa';


function DoadorForm({ doador, onSave }) {
// Define os campos do formulário e aplica a validação com YUP
    const { register, handleSubmit, formState: { errors }, reset, control, setValue, watch} = useForm({
        resolver: yupResolver(doadorSchema),
        defaultValues: {
            id: null,
            tipoPessoa: '',
            nome: '',
            documento: '',
            email: '',
            telefone: '',
            endereco: '',
            ativo: true
        }
    });
    const tipoPessoa = watch('tipoPessoa');  

    useEffect(() => {
     reset({
    id: doador?.id || null,
    tipoPessoa: doador?.tipoPessoa || '',
    nome: doador?.nome || '',
    documento: doador?.documento || '',
    email: doador?.email || '',
    telefone: doador?.telefone || '',
    endereco: doador?.endereco || '',
    ativo: doador?.ativo ?? true,
});

    }, [doador, reset]);

    const onSubmit =  (data) => {
        onSave(data);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setValue(name, value);
    };

    return (
    <Form id="doador-form" onSubmit={handleSubmit(onSubmit)}>
            <SectionTitle icon="bi-info-circle" title="Informações Básicas" />
            <Row>
                  <Col md={3}>
                               <FloatingLabel label="Tipo de Pessoa*">
                                   <Form.Select
                                       name="tipoPessoa"
                                       {...register('tipoPessoa')}
                                       onChange={handleChange}
                                       isInvalid={!!errors.tipoPessoa}
                                   >
                                       <option value="">Selecione</option>
                                       {Object.entries(TipoPessoa).map(([key, label]) => (
                                           <option key={key} value={key}>{label}</option>
                                       ))}
                                   </Form.Select>
                                   <Form.Control.Feedback type="invalid">{errors.tipoPessoa?.message}</Form.Control.Feedback>
                               </FloatingLabel>
                           </Col>
                <Col md={4}>
                    <FloatingLabel label="Nome*">
                        <Form.Control type='text' {...register('nome')} isInvalid={!!errors.nome} />
                        <Form.Control.Feedback type="invalid">{errors.nome?.message}</Form.Control.Feedback>
                    </FloatingLabel>
                </Col>                
            </Row> 
            {tipoPessoa && (
                <Row> <Col md={3}>
                    <FloatingLabel label={tipoPessoa === 'pj' ? 'CNPJ*' : 'CPF*'}>
                    <Form.Control type='text' {...register('documento')} isInvalid={!!errors.documento} />
                    <Form.Control.Feedback type="invalid">{errors.documento?.message}</Form.Control.Feedback>
                     </FloatingLabel>
                     </Col>
                </Row>
            )}

            <Row>
                <Col md={1}>
                    <FormSwitch name="ativo" control={control} label="Ativo" />
                </Col>
            </Row>
            <SectionTitle icon="bi-briefcase" title="Contatos" />
            <Row>
                <Col md={3}>
                    <FloatingLabel label="E-mail*">
                        <Form.Control type='text' {...register('email')} isInvalid={!!errors.email} />
                        <Form.Control.Feedback type="invalid">{errors.email?.message}</Form.Control.Feedback>
                    </FloatingLabel>
                </Col>
                    <Col md={3}>
                    <FloatingLabel label="Telefone*">
                        <Form.Control type='text'{...register('telefone')} isInvalid={!!errors.telefone} />
                        <Form.Control.Feedback type="invalid">{errors.telefone?.message}</Form.Control.Feedback>
                    </FloatingLabel>
                </Col>  
            </Row>
            <Row>
                <Col md={6}>
                    <FloatingLabel label="Endereço">
                        <Form.Control type='text' {...register('endereco')} isInvalid={!!errors.endereco} />
                        <Form.Control.Feedback type="invalid">{errors.endereco?.message}</Form.Control.Feedback>
                    </FloatingLabel>
                </Col>              
            </Row>           
        </Form>
    );
};

export default DoadorForm;