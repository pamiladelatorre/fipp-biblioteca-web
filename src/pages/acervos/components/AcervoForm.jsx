import { useEffect, useState  } from 'react';
import { Form, Row, Col, FloatingLabel } from "react-bootstrap";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { acervoSchema } from '../../../validations/acervoValidation';

import SectionTitle from '../../../components/ui/SectionTitle';
import FormSwitch from '../../../components/ui/FormSwitch';
import * as autorService from '../../../services/autorService.js'
import * as generoService from '../../../services/generoService.js'
import * as categoriaService from '../../../services/categoriaService.js'

function AcervoForm({ acervo, onSave }) {
    // Define os campos do formulário e aplica a validação com YUP
    const { register, handleSubmit, formState: { errors }, reset, control } = useForm({ 
        resolver: yupResolver(acervoSchema),
        defaultValues: {
            id: null,
            titulo: '',
            editora: '',
            numeroEdicao: '',
            numeroPagina: '',
            isbn: '',
            dataPublicacao: null,
            autorId: '',
            generoId: '',
            categoriaId: '',
            ativo: true
        }
    });
    const [autores, setAutores] = useState([]);
    const [generos, setGeneros] = useState([]);
    const [categorias, setCategorias] = useState([]);

    // Atualiza o formulário sempre que a acervo mudar (modo edição)
    useEffect(() => {
        const carregarDados = async () =>   {
            try {
                const [resAutores, resGeneros, resCategorias] = await Promise.all([
                    autorService.buscarAtivos(),
                    generoService.buscarAtivos(),
                    categoriaService.buscarAtivas()
                ]);

                setAutores(resAutores?.data || []);
                setGeneros(resGeneros?.data || []);
                setCategorias(resCategorias?.data || []);

                reset({
                    id: acervo?.id || null,
                    titulo: acervo?.titulo || '',
                    editora: acervo?.editora || '',
                    numeroEdicao: acervo?.numeroEdicao || '',
                    numeroPagina: acervo?.numeroPagina || '',
                    isbn: acervo?.isbn || '',
                    dataPublicacao: acervo?.dataPublicacao.split('T')[0] || null,
                    autorId: acervo?.autor.id || '',
                    generoId: acervo?.genero.id || '',            
                    categoriaId: acervo?.categoria.id || '',
                    ativo: acervo?.ativo ?? true,
                });
            } catch (error) {
                toast.error(getErrorMessage(error, 'Erro ao carregar dados do formulário'));
            }
        };

        carregarDados();
    }, [acervo, reset]);

    const onSubmit = (data) => {
        onSave(data);
    };

    return(
        <Form id="acervo-form" onSubmit={handleSubmit(onSubmit)}>
            <SectionTitle icon="bi-info-circle" title="Informações Básicas" />
            <Row>
                <Col md={4}>
                    <FloatingLabel label="Título*">
                        <Form.Control type='text' {...register('titulo')} isInvalid={!!errors.titulo} />
                        <Form.Control.Feedback type="invalid">{errors.titulo?.message}</Form.Control.Feedback>
                    </FloatingLabel>
                </Col>
                <Col md={4}>
                    <FloatingLabel label="Autor*">
                        <Form.Select {...register('autorId')} isInvalid={!!errors.autorId}>
                            <option value="">Selecione</option>
                            {autores?.map((item) => (
                                <option key={item.id} value={item.id}>{item.nome}</option>
                            ))}
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">{errors.titulo?.message}</Form.Control.Feedback>
                    </FloatingLabel>
                </Col>                                             
            </Row>
            <Row>
                <Col md={4}>
                    <FloatingLabel label="Editora*">
                        <Form.Control type='text' {...register('editora')} isInvalid={!!errors.editora} />
                        <Form.Control.Feedback type="invalid">{errors.editora?.message}</Form.Control.Feedback>
                    </FloatingLabel>
                </Col>
                <Col md={2}>
                    <FloatingLabel label="Edição*">
                        <Form.Control type='number' {...register('numeroEdicao')} isInvalid={!!errors.numeroEdicao} />
                        <Form.Control.Feedback type="invalid">{errors.numeroEdicao?.message}</Form.Control.Feedback>
                    </FloatingLabel>
                </Col>
                <Col md={2}>
                    <FloatingLabel label="Nº de paginas*">
                        <Form.Control type='number' {...register('numeroPagina')} isInvalid={!!errors.numeroPagina} />
                        <Form.Control.Feedback type="invalid">{errors.numeroPagina?.message}</Form.Control.Feedback>
                    </FloatingLabel>
                </Col> 
            </Row>
            <Row>
                <Col md={4}>
                    <FloatingLabel label="Genero*">
                        <Form.Select {...register('generoId')} isInvalid={!!errors.generoId}>
                            <option value="">Selecione</option>
                            {generos?.map((item) => (
                                <option key={item.id} value={item.id}>{item.descricao}</option>
                            ))}
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">{errors.generoId?.message}</Form.Control.Feedback>
                    </FloatingLabel>                  
                </Col>
                <Col md={4}>
                    <FloatingLabel label="Categoria*">
                        <Form.Select {...register('categoriaId')} isInvalid={!!errors.categoriaId}>
                            <option value="">Selecione</option>
                            {categorias?.map((item) => (
                                <option key={item.id} value={item.id}>{item.descricao}</option>
                            ))}
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">{errors.categoriaId?.message}</Form.Control.Feedback>
                    </FloatingLabel>                  
                </Col>
            </Row>
            <Row>
                <Col md={4}>
                    <FloatingLabel label="ISBN*">
                        <Form.Control type='text' {...register('isbn')} isInvalid={!!errors.isbn} />
                        <Form.Control.Feedback type="invalid">{errors.isbn?.message}</Form.Control.Feedback>
                    </FloatingLabel>
                </Col>
                <Col md={4}>
                    <FloatingLabel label="Data de Publicação*">
                        <Form.Control type='date' {...register('dataPublicacao')} isInvalid={!!errors.dataPublicacao} />
                        <Form.Control.Feedback type="invalid">{errors.dataPublicacao?.message}</Form.Control.Feedback>
                    </FloatingLabel>
                </Col>
            </Row>
            <Row>
                <Col md={1}>
                    <FormSwitch name="ativo" control={control} label="Ativo" />
                </Col>
            </Row>
        </Form>
    );
};

export default AcervoForm;