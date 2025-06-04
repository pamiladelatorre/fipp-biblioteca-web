import { Accordion, Container, Row, Col, FloatingLabel, Form, Button } from "react-bootstrap";

function FornecedorFilters({ filters, onFilterChange, onClearFilters }){
    return(
        <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
                <Accordion.Header>Fornecedores</Accordion.Header>
                <Accordion.Body>
                    <Container>
                        <Row className="justify-content-md-center align-items-center">
                            <Col md={3} className="mb-2">
                                <FloatingLabel label="CNPJ">
                                    <Form.Control 
                                        type='text' 
                                        value={filters.cnpj}
                                        onChange={(e) => onFilterChange({ ...filters, cnpj: e.target.value })}
                                        className='form-control-filter' 
                                    />                            
                                </FloatingLabel>
                            </Col>
                            <Col md={4} className="mb-2">
                                <FloatingLabel label="Razão social">
                                    <Form.Control 
                                        type='text' 
                                        value={filters.razaoSocial}
                                        onChange={(e) => onFilterChange({ ...filters, razaoSocial: e.target.value })}
                                        className='form-control-filter' 
                                    />                            
                                </FloatingLabel>
                            </Col>
                            <Col md={4} className="mb-2">
                                <FloatingLabel label="Representante">
                                    <Form.Control 
                                        type='text' 
                                        value={filters.representante}
                                        onChange={(e) => onFilterChange({ ...filters, representante: e.target.value })}
                                        className='form-control-filter' 
                                        placeholder="Buscar por representante.." 
                                    />                            
                                </FloatingLabel>
                            </Col>
                            <Col md={3}>
                                <FloatingLabel label="Telefone">
                                    <Form.Control 
                                        type='text' 
                                        value={filters.telefone}
                                        onChange={(e) => onFilterChange({ ...filters, telefone: e.target.value })}
                                        className='form-control-filter' 
                                    />                            
                                </FloatingLabel>
                            </Col>
                            <Col md={3}>
                                <FloatingLabel label="E-mail">
                                    <Form.Control 
                                        type='text' 
                                        value={filters.email}
                                        onChange={(e) => onFilterChange({ ...filters, email: e.target.value })}
                                        className='form-control-filter' 
                                    />                            
                                </FloatingLabel>
                            </Col>
                            <Col md={2}>
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

export default FornecedorFilters;