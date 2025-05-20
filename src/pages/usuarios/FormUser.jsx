import { useState, useEffect  } from 'react';
import { Button, Form, Row, Col } from "react-bootstrap";
import { cpf } from 'cpf-cnpj-validator'
import * as yup from 'yup';
import InputMask from 'react-input-mask';
import '../../pages/usuarios.css';
import PropTypes from 'prop-types';
import UsuarioService from '../../services/UsuarioService';

const usuarioService = new UsuarioService();

const FormUser = ({ usuarioId, onSalvarUsuario, onCancelar }) => {
    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [endereco, setEndereco] = useState('');
    const [cep, setCep] = useState('');
    const [telefone, setTelefone] = useState('');
    const [email, setEmail] = useState('');
    const [tipoUsuario, setTipoUsuario] = useState('');
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (usuarioId > 0) {
            usuarioService.obterUsuarioPorId(usuarioId).then((response) => {
                carregaFormulario(response.data);
            }).catch((erro) => {
                console.error('Erro ao buscar o usuário:', erro);
            });
        }
    }, [usuarioId]);

    // Carregar os campos do formulário
    const carregaFormulario = (usuario) => {
        setNome(usuario ? usuario.nome : '');
        setCpf(usuario ? usuario.cpf: '');
        setDataNascimento(usuario ? usuario.dataNascimento.split('T')[0] : '');
        setEndereco(usuario ? usuario.endereco : '');
        setCep(usuario ? usuario.cep : '');
        setTelefone(usuario ? usuario.telefone : '');
        setEmail(usuario ? usuario.email : '');
        setTipoUsuario(usuario ? usuario.tipoUsuario : '');
    };

    const limparFormulario = () => {
        carregaFormulario(null);
        setErrors({});
        onCancelar();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
         // Validar e transformar a data de nascimento para null caso esteja vazia
        const validDataNascimento = dataNascimento === "" ? null : dataNascimento;

        const userData = { nome, cpf, dataNascimento: validDataNascimento, 
            endereco, cep, telefone, email, tipoUsuario };

        schema
            .validate(userData, { abortEarly: false })
            .then(() => {
                onSalvarUsuario(userData);
                limparFormulario();
            })
            .catch((err) => {
                console.log(err)
                // Se houver erros de validação, atualiza o estado de erros
                const newErrors = err.inner.reduce((acc, error) => {
                  acc[error.path] = error.message;
                  return acc;
                }, {});
                setErrors(newErrors);
            });
      };

    return(
        <div className="card">
            <h5 className="card-header">{usuarioId > 0 ? 'Editar Usuário' : 'Cadastrar Usuário'}</h5>
            <div className="card-body">
                <Form onSubmit={handleSubmit}>
                    <Row className="mb-3">
                        <Col>
                            <Form.Label>Nome</Form.Label>
                            <Form.Control type='text' placeholder="Digite o nome" 
                                value={nome} onChange={(e) => setNome(e.target.value)} isInvalid={!!errors.nome} />
                            <Form.Control.Feedback type="invalid">{errors.nome}</Form.Control.Feedback>
                        </Col>
                    </Row>  
                    <Row className="mb-3">
                        <Col>
                            <Form.Label>CPF</Form.Label>
                            <InputMask mask="999.999.999-99" value={cpf} onChange={(e) => setCpf(e.target.value)}>
                                {(inputProps) => ( <Form.Control {...inputProps} isInvalid={!!errors.cpf} placeholder="Digite o cpf" /> )}
                            </InputMask>                                
                            <Form.Control.Feedback type="invalid">{errors.cpf}</Form.Control.Feedback>
                        </Col>
                        <Col>
                            <Form.Label>Data de nascimento</Form.Label>
                            <Form.Control type='date' placeholder="Data Nascimento" title="Data de nascimento"
                                value={dataNascimento} onChange={(e) => setDataNascimento(e.target.value)} isInvalid={!!errors.dataNascimento} />
                            <Form.Control.Feedback type="invalid">{errors.dataNascimento}</Form.Control.Feedback>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col>
                            <Form.Label>Endereço</Form.Label>
                            <Form.Control type='text' placeholder="Digite o endereço" 
                                value={endereco} onChange={(e) => setEndereco(e.target.value)} isInvalid={!!errors.endereco}/>
                            <Form.Control.Feedback type="invalid">{errors.endereco}</Form.Control.Feedback>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col>
                            <Form.Label>CEP</Form.Label>
                            <InputMask mask="99999-999" value={cep} onChange={(e) => setCep(e.target.value)}>
                                {(inputProps) => ( <Form.Control {...inputProps} isInvalid={!!errors.cep} placeholder="Digite o cep" /> )}
                            </InputMask>                                
                            <Form.Control.Feedback type="invalid">{errors.cep}</Form.Control.Feedback>                            
                        </Col>
                        <Col>
                            <Form.Label>Telefone</Form.Label>
                            <InputMask mask="(99) 99999-9999" value={telefone} onChange={(e) => setTelefone(e.target.value)}>
                                {(inputProps) => ( <Form.Control {...inputProps} isInvalid={!!errors.telefone} placeholder="Digite o telefone" /> )}
                            </InputMask>                                
                            <Form.Control.Feedback type="invalid">{errors.telefone}</Form.Control.Feedback>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col>
                            <Form.Label>E-mail</Form.Label>
                            <Form.Control type='email' placeholder="Digite o email" 
                                value={email} onChange={(e) => setEmail(e.target.value)} isInvalid={!!errors.email}/>
                            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                        </Col>
                        <Col>
                            <Form.Label>Tipo</Form.Label>
                            <Form.Control as="select" value={tipoUsuario} 
                                onChange={(e) => setTipoUsuario(e.target.value)} isInvalid={!!errors.tipoUsuario}>
                                <option value="">Selecione um tipo de usuario</option>
                                <option value="aluno">Aluno</option>
                                <option value="professor">Professor</option>
                                <option value="funcionario">Funcionário</option>
                                <option value="publico">Público Externo</option>
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">{errors.tipoUsuario}</Form.Control.Feedback>
                        </Col>
                    </Row>
                    <Button variant='success' type='submit' className="m-2">
                        <i className="bi bi-check-lg"> Salvar</i>
                    </Button>
                    <Button variant='secondary' type='button' onClick={() => {limparFormulario();}}>
                        Cancelar
                    </Button>
                </Form>
            </div>
        </div>
    )
}

// Validar as propiedades
FormUser.propTypes = {
    usuarioId: PropTypes.number.isRequired, // 'usuarioId' deve ser um numero e requerido
    onSalvarUsuario: PropTypes.func.isRequired, // 'onSalvarUsuario' deve ser um função e requerido
    onCancelar: PropTypes.func.isRequired, // 'onCancelar' deve ser um função e requerido
};

// Definindo o esquema de validação com yup
const schema = yup.object().shape({
    nome: yup.string()
        .required("O nome é obrigatório."),
    cpf: yup.string()
        .required("O CPF é obrigatório.")
        .test("valid-cpf", "CPF inválido.", value => cpf.isValid(value)),
    dataNascimento: yup.date()
        .nullable()
        .required("A data de nascimento é obrigatória.")
        .max(new Date(), "Data de nascimento não pode ser no futuro."),
    endereco: yup.string()
        .required("O endereço é obrigatório."),
    cep: yup.string()
        .required("O CEP é obrigatório.")
        .matches(/^\d{5}-\d{3}$/, "CEP inválido. Formato esperado: 12345-678"),
    telefone: yup.string()
        .required("O telefone é obrigatório.")
        .matches(/^\(\d{2}\)\s\d{4,5}-\d{4}$/, "Telefone inválido. Formato esperado: (XX) XXXX-XXXX ou (XX) XXXXX-XXXX"),
    email: yup.string()
        .required("O e-mail é obrigatório.").email("E-mail inválido."),
    tipoUsuario: yup.string()
        .required('Tipo de usuário é obrigatório.')       
});

export default FormUser;