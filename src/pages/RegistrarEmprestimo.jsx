import { useEffect, useState } from 'react';
import { Form, Card, Row, Col, Button, Table, InputGroup, } from "react-bootstrap";
import Stack from 'react-bootstrap/Stack';
import LivroService from '../services/LivroService';
import UsuarioService from '../services/UsuarioService';
import './registrarEmprestimo.css';
import { fetchWithAuth } from '../api/api';

const Emprestimo = () => {
    const [livros, setLivros] = useState([]);
    const [usuarios, setUsuarios] = useState([]);
    const [emprestimos, setEmprestimos] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [ListaFiltrada, setListaFiltrada] = useState([]);
    const [validated, setValidated] = useState(false);

    
    const [FormData, setFormData] = useState({
        idEmprestimo: null,
        idLivro: 0,
        idUsuario: 0,
        dataEmprestimo: "",
        dataDevolucao: "",
        status: ""
    });

useEffect(() => {
    const fetchData = async () => {
        try {
            const livroService = new LivroService();
            const usuarioService = new UsuarioService();
            
            const livrosResponse = await livroService.obterTodosLivros();
            const usuariosResponse = await usuarioService.carregarUsuarios();
            const emprestimosResponse = await fetchWithAuth(`/emprestimo`);
            const emprestimosData = await emprestimosResponse;

            setLivros(Array.isArray(livrosResponse.data) ? livrosResponse.data : []);
            setUsuarios(Array.isArray(usuariosResponse.data) ? usuariosResponse.data : []);
            setEmprestimos(Array.isArray(emprestimosData) ? emprestimosData : []);
            setListaFiltrada(Array.isArray(emprestimosData) ? emprestimosData : []);
        } catch (error) {
            console.error("Erro ao carregar dados:", error);
        }
    };
    fetchData();
}, []);

useEffect(() => {
    const termo = searchTerm.toLowerCase();

    const filtrados = emprestimos.filter((emp) => {
        const titulo = emp.livro?.titulo?.toLowerCase() || '';
        const nome = emp.usuario?.nome?.toLowerCase() || '';
        const dataEmprestimo = new Date(emp.dataEmprestimo).toLocaleDateString('pt-BR');

        return (
            titulo.includes(termo) ||
            nome.includes(termo) ||
            dataEmprestimo.includes(termo)
        );
    });

    setListaFiltrada(filtrados);
}, [searchTerm, emprestimos]);




useEffect(() => {
    setListaFiltrada(emprestimos);
}, [emprestimos]);

const fetchEmprestimos = async () => {
    try {
        const data = await fetchWithAuth(`/emprestimo`);
        setEmprestimos(data);
        setListaFiltrada(data); 
    } catch (error) {
        console.error("Erro ao buscar empréstimos:", error);
    }
};



    const excluirEmprestimo = async (idEmprestimo) => {
        if (!window.confirm("Tem certeza que deseja excluir este empréstimo?")) return;
        try {
            await fetchWithAuth(`/emprestimo/${idEmprestimo}`, {
                method: "DELETE",
            });
    
            setEmprestimos((prev) => 
                prev.filter((emprestimo) => emprestimo.idEmprestimo !== idEmprestimo)
            );
        } catch (error) {
            alert("Erro ao excluir o empréstimo. Tente novamente.");
            console.error(error);
        }
    };
    const editarEmprestimo = async (Emprestimo) => {
        console.log("Editando empréstimo:", Emprestimo); 
    
        setFormData({
            idEmprestimo: Emprestimo.idEmprestimo || "",
            idLivro: Emprestimo.livro?.id || "",
            idUsuario: Emprestimo.usuario?.id || "",
            dataEmprestimo: Emprestimo.dataEmprestimo ? Emprestimo.dataEmprestimo.split("T")[0] : "", 
            dataDevolucao: Emprestimo.dataDevolucao ? Emprestimo.dataDevolucao.split("T")[0] : "",
            status: Emprestimo.statusEmprestimo || ""
        });
    
        console.log("Novo estado do FormData:", FormData); 
    };
    
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.stopPropagation();
            setValidated(true);
            return;
        }
        
        setValidated(true);

        try {
            const data = { ...FormData };
            const method = data.idEmprestimo ? "PUT" : "POST";
            const url = data.idEmprestimo
                ? `/emprestimo/${data.idEmprestimo}`
                : `/emprestimo`;

            const response = await fetchWithAuth(url, {
                method,
                body: JSON.stringify(data),
            });

            if (!response) throw new Error("Erro ao salvar empréstimo!");

            const emprestimo = response;

            if (method === "POST") {
                setEmprestimos((prev) => [...prev, emprestimo]);
            } else {
                setEmprestimos((prev) =>
                    prev.map((item) =>
                        item.idEmprestimo === emprestimo.idEmprestimo ? emprestimo : item
                    )
                );
            }

            await fetchEmprestimos();
            limparFormulario();
            setValidated(false);
        } catch (error) {
            console.error("Erro ao salvar empréstimo:", error);
            alert("Erro ao salvar o empréstimo. Tente novamente.");
        }
    };
    

    const limparFormulario = () => {
        setFormData({
            idEmprestimo: "",
            idLivro: 0,
            idUsuario: 0,
            dataEmprestimo: "",
            dataDevolucao: "",
            status: ""
        });
    };
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'emprestimo') {
            setFormData((prevFormData) => ({
                ...prevFormData,
            }));
        } else {
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: value,
            }));
        }
    };
    
    

    return (
        <Stack gap={2} className='FormEmprestimos'>
            <div className="p-2">
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Card className="mb-3">
                        <Card.Header>
                            <h5 className="m-0">Registrar Empréstimo</h5>
                        </Card.Header>
                        <Card.Body>
                            <Form.Group className="livro mb-3">
                                <Form.Label>Nome do Livro</Form.Label>
                                <Form.Select
                                     name="idLivro"
                                     value={FormData.idLivro}
                                     onChange={handleChange}
                                     required
                                     >
                                     <option value="">Selecione o Livro</option>
                                    {(Array.isArray(livros) ? livros : []).map((livro) => (
                                        <option key={livro.id} value={livro.id}>{livro.Titulo}</option>
                                        ))}
                                        </Form.Select>
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Label>Nome do Aluno</Form.Label>
                                            <Form.Select
                                                name="idUsuario"
                                                value={FormData.idUsuario}
                                                onChange={handleChange}
                                                required
                                                >
                                                <option value="">Selecione o Aluno</option>
                                                {(Array.isArray(usuarios) ? usuarios : []).map((usuario) => (
                                                    <option key={usuario.id} value={usuario.id}>{usuario.nome}</option>
                                                    ))}
                                                    </Form.Select>
                                                    </Form.Group>
                                                    
                                <Row className="mb-3">
                                 <Col md={6}>
                                    <Form.Group controlId="dataEmprestimo">
                                        <Form.Label>Data de Empréstimo</Form.Label>
                                        <Form.Control 
                                        type="date"
                                        name="dataEmprestimo"
                                        value={FormData.dataEmprestimo}
                                        onChange={handleChange}
                                        required
                                         />
                                    </Form.Group>
                                </Col>                      
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Data de Devolução</Form.Label>
                                        <Form.Control 
                                        type="date"
                                        name="dataDevolucao"
                                        value={FormData.dataDevolucao}
                                        onChange={handleChange}
                                        required
                                         />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Form.Group className="mb-3">
                                <Form.Label>Status do Empréstimo</Form.Label>
                                <Form.Control
                                 type="text" 
                                 name="status"
                                 value={FormData.status}
                                 placeholder="status"
                                 onChange={handleChange}
                                 required
                                  />
                            </Form.Group>
                            <Button variant="success" type='submit'  className="m-2">
                                <i className="bi bi-check-lg">Salvar</i>
                            </Button>
                            <Button variant="secondary" type="button" onClick={limparFormulario} >Cancelar</Button>

                        </Card.Body>
                      
                    </Card>
                </Form>
            </div>
            <div className="p-2">
            <InputGroup className="mb-3 input-filtro">
          <Form.Control
            type="text"
            placeholder="Buscar por Título, Nome do Aluno ou Data de Empréstimo"
            value={searchTerm}
            onChange={ (e) => setSearchTerm(e.target.value)}
          />
        </InputGroup>
                <Table  responsive stiped bordered hover className="table">
                    
                    <thead >
                        <tr>
                            <th>ID</th>
                            <th>Titulo</th>
                            <th>Nome do Aluno</th>
                            <th>Data de Empréstimo</th>
                            <th>Data de Devolução</th>
                            <th>Status do Empréstimo</th>
                            <th>Ações</th>
                          
                        </tr>
                    </thead>
                    <tbody>
                        {ListaFiltrada.length > 0 ? (
                            ListaFiltrada.map((Emprestimo) => (
                                <tr key={ Emprestimo.idEmprestimo}>
                                    <td>{Emprestimo.idEmprestimo}</td>
                                    <td>{Emprestimo.livro?.titulo}</td>
                                    <td>{ Emprestimo.usuario?.nome  || "Desconhecido"}</td>
                                    <td>{new Date(Emprestimo.dataEmprestimo).toLocaleDateString('pt-BR')} </td>
                                    <td>{new Date(Emprestimo.dataDevolucao).toLocaleDateString('pt-BR')}</td>
                                    <td>{Emprestimo.statusEmprestimo}</td>
                                    <td>
                                        <Button
                                            variant="primary"
                                            size="sm"
                                            onClick={() => editarEmprestimo(Emprestimo)}
                                        >
                                            Editar
                                        </Button>{" "}
                                        <Button
                                            variant="danger"
                                            size="sm"
                                            onClick={() => excluirEmprestimo(Emprestimo.idEmprestimo)}
                                        >
                                            Excluir
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="text-center">
                                    Nenhum livro encontrado.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
        </Stack>
      
    );
};


export default Emprestimo;
