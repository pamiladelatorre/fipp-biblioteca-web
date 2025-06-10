import { Accordion, Container, Row, Col, FloatingLabel, Form, Button } from "react-bootstrap";
import { MovimentacaoEtapa } from "../../../enums/MovimentacaoEtapa";
import { MovimentacaoStatus } from "../../../enums/MovimentacaoStatus";

function MovimentacaoFilters({ filters, onFilterChange, onClearFilters }){
    return(
        <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
                <Accordion.Header>Movimentações de Exemplares</Accordion.Header>
                <Accordion.Body>
                    <Container>
                        <Row className="justify-content-md-center align-items-center">
                            <Col md={4} className="mb-2">
                                <FloatingLabel label="Acervo">
                                    <Form.Control 
                                        type='text' 
                                        value={filters.acervo}
                                        onChange={(e) => onFilterChange({ ...filters, acervo: e.target.value })}
                                        className='form-control-filter' 
                                    />                            
                                </FloatingLabel>
                            </Col>
                            <Col md={2} className="mb-2">
                                <FloatingLabel label="Tombo">
                                    <Form.Control 
                                        type='text' 
                                        value={filters.tombo}
                                        onChange={(e) => onFilterChange({ ...filters, tombo: e.target.value })}
                                        className='form-control-filter' 
                                    />                            
                                </FloatingLabel>
                            </Col>  
                            <Col md={4} className="mb-2">
                                <FloatingLabel label="Usuário">
                                    <Form.Control 
                                        type='text' 
                                        value={filters.usuario}
                                        onChange={(e) => onFilterChange({ ...filters, usuario: e.target.value })}
                                        className='form-control-filter' 
                                    />                            
                                </FloatingLabel>
                            </Col>                          
                            <Col md={2} className="mb-2">
                                <FloatingLabel label="Etapa">
                                    <Form.Select 
                                        aria-label="Etapa" 
                                        value={filters.etapa} 
                                        onChange={(e) => onFilterChange({ ...filters, etapa: e.target.value })}
                                    >
                                        <option></option>
                                        {Object.entries(MovimentacaoEtapa).map(([key, label]) => (
                                            <option key={key} value={key}>{label}</option>
                                        ))}
                                    </Form.Select>                              
                                </FloatingLabel>
                            </Col>
                            <Col md={2}>
                                <FloatingLabel label="Status">
                                    <Form.Select 
                                        aria-label="Status" 
                                        value={filters.status} 
                                        onChange={(e) => onFilterChange({ ...filters, status: e.target.value })}
                                    >
                                        <option></option>
                                        {Object.entries(MovimentacaoStatus).map(([key, label]) => (
                                            <option key={key} value={key}>{label}</option>
                                        ))}
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

export default MovimentacaoFilters;