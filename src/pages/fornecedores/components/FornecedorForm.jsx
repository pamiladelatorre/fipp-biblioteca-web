import { useEffect, useState  } from 'react';
import { Form, Row, Col, FloatingLabel, Accordion } from "react-bootstrap";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';

import { fornecedorSchema } from '../../../validations/fornecedorValidation';
import SectionTitle from '../../../components/ui/SectionTitle';
import FormSwitch from '../../../components/ui/FormSwitch';
import ToggleButtonGroupField from '../../../components/ui/ToggleButtonGroupField';
import MetodoPagamentoForm from './MetodoPagamentoForm.jsx';
import MetodosPagamentoTable from './MetodosPagamentoTable.jsx';
import * as generoService from '../../../services/generoService.js'

function FornecedorForm({ fornecedor, onSave }) {
    // Define os campos do formulário e aplica a validação com YUP
    const { 
        register, handleSubmit, formState: { errors }, reset, control, setValue
    } = useForm({ 
        resolver: yupResolver(fornecedorSchema),
        defaultValues: {
            id: null,
            cnpj: '',
            razaoSocial: '',
            inscricaoEstadual: '',
            representante: '',
            telefone: '',
            email: '',
            endereco: '',
            metodosPagamento: [],
            generos: [],
            ativo: true
        }
    });
    const [generos, setGeneros] = useState([]);
    const [metodosPagamento, setMetodosPagamento] = useState([]);

    useEffect(() => {
        buscarGenerosAtivos();
    
        const metodos = fornecedor?.metodosPagamento?.map(m => ({ ...m, excluido: false })) ?? [];
    
        reset({
            id: fornecedor?.id ?? null,
            cnpj: fornecedor?.cnpj ?? '',
            razaoSocial: fornecedor?.razaoSocial ?? '',
            inscricaoEstadual: fornecedor?.inscricaoEstadual ?? '',
            representante: fornecedor?.representante ?? '',
            telefone: fornecedor?.telefone ?? '',
            email: fornecedor?.email ?? '',
            endereco: fornecedor?.endereco ?? '',
            generos: fornecedor?.generos ?? [],
            ativo: fornecedor?.ativo ?? true,
            metodosPagamento: metodos,
        });
    
        setMetodosPagamento(metodos);
        setValue('metodosPagamento', metodos);
    
    }, [fornecedor, reset, setValue]);

    // Carrega a lista de generos ativos
    const buscarGenerosAtivos = () => {
        generoService.buscarAtivos().then((response) => {
            setGeneros(response?.data || []);
        }).catch((error) => {
            toast.error(getErrorMessage(error, 'Erro ao buscar generos'));
        });
    };

    const handleAdicionarMetodo = (data) => {
        setMetodosPagamento(prev => {
            const lista = prev ?? []; 
            const metodoExistente = lista.find(m => m.tipoPagamento === data.tipoPagamento);
      
            if (metodoExistente && !metodoExistente.excluido) {
                toast.warning('Esse tipo de pagamento já foi adicionado');
                return lista; // mantém a lista atual
            }
      
            let novaLista;
      
            if (metodoExistente && metodoExistente.excluido) {
                // Reutiliza o ID e "reativa" o método
                const atualizado = { ...data, id: metodoExistente.id, excluido: false };
      
                novaLista = lista.map(m => m.tipoPagamento === data.tipoPagamento ? atualizado : m);
            } else {
                // Novo método
                novaLista = [...lista, { ...data, excluido: false }];
            }
      
            // Atualiza o form junto com o estado local
            setValue('metodosPagamento', novaLista);
            return novaLista;
        });
    };

    const handleRemoverMetodo = (data) => {
        setMetodosPagamento(prev => {
            const novaLista = prev.map(item =>
                item.tipoPagamento === data.tipoPagamento ? { ...item, excluido: true } : item
            );

            // Atualiza o form junto com o estado local
            setValue('metodosPagamento', novaLista);
            return novaLista;
        });
    };
      
    const onSubmit = (data) => {
        // Filtra métodos excluídos antes de enviar
        const metodosAtivos = data.metodosPagamento.filter(m => !m.excluido);
        onSave({ ...data, metodosPagamento: metodosAtivos });
    };

    return(
        <Form id="fornecedor-form" onSubmit={handleSubmit(onSubmit)}>
            <SectionTitle icon="bi-info-circle" title="Informações Básicas" />
            <Row>
                <Col md={3}>
                    <FloatingLabel label="CNPJ*">
                        <Form.Control type='text' {...register('cnpj')} isInvalid={!!errors.cnpj} />
                        <Form.Control.Feedback type="invalid">{errors.cnpj?.message}</Form.Control.Feedback>
                    </FloatingLabel>
                </Col>
                <Col md={4}>
                    <FloatingLabel label="Razão Social*">
                        <Form.Control type='text' {...register('razaoSocial')} isInvalid={!!errors.razaoSocial} />
                        <Form.Control.Feedback type="invalid">{errors.razaoSocial?.message}</Form.Control.Feedback>
                    </FloatingLabel>
                </Col>                
            </Row> 
            <Row>
                <Col md={3}>
                    <FloatingLabel label="Inscrição Estadual">
                        <Form.Control type='text' {...register('inscricaoEstadual')} isInvalid={!!errors.inscricaoEstadual} />
                        <Form.Control.Feedback type="invalid">{errors.inscricaoEstadual?.message}</Form.Control.Feedback>
                    </FloatingLabel>
                </Col>
                <Col md={4}>
                    <FloatingLabel label="Representante">
                        <Form.Control type='text' {...register('representante')} isInvalid={!!errors.representante} />
                        <Form.Control.Feedback type="invalid">{errors.representante?.message}</Form.Control.Feedback>
                    </FloatingLabel>
                </Col>             
            </Row>
            <Row>
                <Col md={1}>
                    <FormSwitch name="ativo" control={control} label="Ativo" />
                </Col>
            </Row>
            <SectionTitle icon="bi-briefcase" title="Contatos" />
            <Row>
                <Col md={3}>
                    <FloatingLabel label="Telefone*">
                        <Form.Control type='text'{...register('telefone')} isInvalid={!!errors.telefone} />
                        <Form.Control.Feedback type="invalid">{errors.telefone?.message}</Form.Control.Feedback>
                    </FloatingLabel>
                </Col>
                <Col md={3}>
                    <FloatingLabel label="E-mail*">
                        <Form.Control type='text' {...register('email')} isInvalid={!!errors.email} />
                        <Form.Control.Feedback type="invalid">{errors.email?.message}</Form.Control.Feedback>
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
            <Accordion className='mt-3'>
                <Accordion.Item eventKey="0">
                    <Accordion.Header><SectionTitle icon="bi-tags" title="Gêneros" /></Accordion.Header>
                    <Accordion.Body>
                        <ToggleButtonGroupField
                            name="generos"
                            control={control}
                            options={generos.map((g) => ({ id: g.id, label: g.descricao }))}
                            className='btn-group-pill'
                        />
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>
                        <SectionTitle icon="bi-credit-card" title="Meios de Pagamento" />
                        {errors.metodosPagamento && (
                            <div className="text-danger small mx-3">{errors.metodosPagamento.message}</div>
                        )}
                    </Accordion.Header>
                    <Accordion.Body>
                        <MetodoPagamentoForm onChange={handleAdicionarMetodo} />
                        <MetodosPagamentoTable 
                            metodosPagamento={metodosPagamento?.filter(m => !m.excluido)} 
                            onRemove={handleRemoverMetodo} 
                        />
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </Form>
    );
};

export default FornecedorForm;