import { Accordion, Container, Row, Col, FloatingLabel, Form, Button } from "react-bootstrap";

function AcervoFilters({ filters, onFilterChange, onClearFilters }){
    return(
        <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
                <Accordion.Header>Acervos</Accordion.Header>
                <Accordion.Body>
                    <Container>
                        <Row className="justify-content-md-center align-items-center">
                            <Col md={3}>
                                <FloatingLabel label="Título">
                                    <Form.Control 
                                        type='text' 
                                        value={filters.titulo}
                                        onChange={(e) => onFilterChange({ ...filters, titulo: e.target.value })}
                                        className='form-control-filter' 
                                    />                            
                                </FloatingLabel>
                            </Col>
                            <Col md={3}>
                                <FloatingLabel label="Editora">
                                    <Form.Control 
                                        type='text' 
                                        value={filters.editora}
                                        onChange={(e) => onFilterChange({ ...filters, editora: e.target.value })}
                                        className='form-control-filter' 
                                    />                            
                                </FloatingLabel>
                            </Col>
                            <Col md={3}>
                                <FloatingLabel label="ISBN">
                                    <Form.Control 
                                        type='text' 
                                        value={filters.isbn}
                                        onChange={(e) => onFilterChange({ ...filters, isbn: e.target.value })}
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

export default AcervoFilters;