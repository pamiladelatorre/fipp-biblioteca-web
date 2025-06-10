import { Accordion, Container, Row, Col, FloatingLabel, Form, Button } from "react-bootstrap";
import { TipoOrigem } from '../../../enums/TipoOrigem';

function EntradaFilters({ filters, onFilterChange, onClearFilters }){
    return(
        <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
                <Accordion.Header>Entradas de Acervo</Accordion.Header>
                <Accordion.Body>
                    <Container>
                        <Row className="justify-content-md-center align-items-center">
                            <Col md={4} className="mb-2">
                                <FloatingLabel label="Acervo">
                                    <Form.Control 
                                        type='text' 
                                        value={filters.titulo}
                                        onChange={(e) => onFilterChange({ ...filters, acervo: e.target.value })}
                                        className='form-control-filter' 
                                    />                            
                                </FloatingLabel>
                            </Col>
                            <Col md={2} className="mb-2">
                                <FloatingLabel label="Origem">
                                    <Form.Select 
                                        aria-label="Origem" 
                                        value={filters.origem} 
                                        onChange={(e) => onFilterChange({ ...filters, origem: e.target.value })}
                                    >
                                        <option></option>
                                        {Object.entries(TipoOrigem).map(([key, label]) => (
                                            <option key={key} value={key}>{label}</option>
                                        ))}
                                    </Form.Select>                              
                                </FloatingLabel>
                            </Col>
                            <Col md={2} className="mb-2">
                                <FloatingLabel label="Contrato">
                                    <Form.Control 
                                        type='text' 
                                        value={filters.contrato}
                                        onChange={(e) => onFilterChange({ ...filters, contrato: e.target.value })}
                                        className='form-control-filter' 
                                    />                            
                                </FloatingLabel>
                            </Col>  
                            <Col md={2} className="mb-2">
                                <FloatingLabel label="Empenho">
                                    <Form.Control 
                                        type='text' 
                                        value={filters.empenho}
                                        onChange={(e) => onFilterChange({ ...filters, empenho: e.target.value })}
                                        className='form-control-filter' 
                                    />                            
                                </FloatingLabel>
                            </Col>  
                            <Col md={4}>
                                <FloatingLabel label="Doador">
                                    <Form.Control 
                                        type='text' 
                                        value={filters.doador}
                                        onChange={(e) => onFilterChange({ ...filters, doador: e.target.value })}
                                        className='form-control-filter' 
                                    />                            
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

export default EntradaFilters;