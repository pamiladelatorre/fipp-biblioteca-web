import { Accordion, Container, Row, Col, FloatingLabel, Form, Button } from "react-bootstrap";

function DoadorFilters({ filters, onFilterChange, onClearFilters }) {
    return (
        <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
                <Accordion.Header>Doadores</Accordion.Header>
                <Accordion.Body>
                    <Container>
                        <Row className="justify-content-md-center align-items-center">
                            <Col md={3}>
                                <FloatingLabel label="Documento">
                                    <Form.Control 
                                        type='text' 
                                        value={filters.documento}
                                        onChange={(e) => onFilterChange({ ...filters, documento: e.target.value })}
                                        className='form-control-filter' 
                                        placeholder="Buscar por documento..." 
                                    />                            
                                </FloatingLabel>
                            </Col>
                            <Col md={4}>
                                <FloatingLabel label="Nome">
                                    <Form.Control
                                        type='text'
                                        value={filters.nome}
                                        onChange={(e) => onFilterChange({ ...filters, nome: e.target.value })}
                                        className='form-control-filter'
                                        placeholder="Buscar por nome..."
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
}

export default DoadorFilters;