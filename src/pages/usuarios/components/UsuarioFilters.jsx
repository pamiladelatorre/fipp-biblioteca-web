import { Accordion, Container, Row, Col, FloatingLabel, Form, Button } from "react-bootstrap";
import { TipoUsuario } from '../../../enums/TipoUsuario';

function UsuarioFilters({ filters, onFilterChange, onClearFilters }){
    return(
        <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
                <Accordion.Header>Usuários</Accordion.Header>
                <Accordion.Body>
                    <Container>
                        <Row className="justify-content-md-center align-items-center">
                            <Col md={3} className="mb-2">
                                <FloatingLabel label="CPF">
                                    <Form.Control 
                                        type='text' 
                                        value={filters.cpf}
                                        onChange={(e) => onFilterChange({ ...filters, cpf: e.target.value })}
                                        className='form-control-filter' 
                                    />                            
                                </FloatingLabel>
                            </Col>                            
                            <Col md={4} className="mb-2">
                                <FloatingLabel label="Nome">
                                    <Form.Control 
                                        type='text' 
                                        value={filters.nome}
                                        onChange={(e) => onFilterChange({ ...filters, nome: e.target.value })}
                                        className='form-control-filter' 
                                    />                            
                                </FloatingLabel>
                            </Col>
                            <Col md={3} className="mb-2">
                                <FloatingLabel label="Telefone">
                                    <Form.Control 
                                        type='text' 
                                        value={filters.telefone}
                                        onChange={(e) => onFilterChange({ ...filters, telefone: e.target.value })}
                                        className='form-control-filter' 
                                    />                            
                                </FloatingLabel>
                            </Col>  
                            <Col md={2} className="mb-2">
                                <FloatingLabel label="Ativo">
                                    <Form.Select 
                                        aria-label="Ativo" 
                                        value={filters.ativo} 
                                        onChange={(e) => onFilterChange({ ...filters, ativo: e.target.value })}
                                    >
                                        <option></option>
                                        <option value="1">Sim</option>
                                        <option value="0">Não</option>
                                    </Form.Select>
                                </FloatingLabel>
                            </Col>   
                            <Col md={4}>
                                <FloatingLabel label="E-mail">
                                    <Form.Control 
                                        type='text' 
                                        value={filters.email}
                                        onChange={(e) => onFilterChange({ ...filters, email: e.target.value })}
                                        className='form-control-filter' 
                                    />                            
                                </FloatingLabel>
                            </Col>                         
                            <Col md={3}>
                                <FloatingLabel label="Tipo">
                                    <Form.Select 
                                        aria-label="Tipo" 
                                        value={filters.tipo} 
                                        onChange={(e) => onFilterChange({ ...filters, tipo: e.target.value })}
                                    >
                                        <option></option>
                                        {Object.entries(TipoUsuario).map(([key, label]) => (
                                            <option key={key} value={key}>{label}</option>
                                        ))}
                                    </Form.Select>                           
                                </FloatingLabel>
                            </Col>                          
                            <Col md={2}>
                                <FloatingLabel label="Bloqueado">
                                    <Form.Select 
                                        aria-label="Bloqueado" 
                                        value={filters.bloqueado} 
                                        onChange={(e) => onFilterChange({ ...filters, bloqueado: e.target.value })}
                                    >
                                        <option></option>
                                        <option value="1">Sim</option>
                                        <option value="0">Não</option>
                                    </Form.Select>
                                </FloatingLabel>
                            </Col>
                            <Col md={1}>
                                <Button variant="secondary" size="sm" title="Limpar filtros" onClick={onClearFilters} className='rounded-pill me-1'>
                                    <i className='bi bi-arrow-counterclockwise'></i>
                                </Button>
                            </Col>
                        </Row>
                    </Container>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
};

export default UsuarioFilters;