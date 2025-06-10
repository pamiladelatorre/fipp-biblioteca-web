import { Accordion, Container, Row, Col, FloatingLabel, Form, Button } from "react-bootstrap";
import { TipoInfracao } from '../../../enums/TipoInfracao';
import { InfracaoStatus } from '../../../enums/InfracaoStatus';
import { GrauInfracao } from '../../../enums/GrauInfracao';

function InfracaoFilters({ filters, onFilterChange, onClearFilters }){
    return(
        <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
                <Accordion.Header>Infrações</Accordion.Header>
                <Accordion.Body>
                    <Container>
                        <Row className="justify-content-md-center align-items-center">
                            <Col md={4}>
                                <FloatingLabel label="Usuário">
                                    <Form.Control 
                                        type='text' 
                                        value={filters.nome}
                                        onChange={(e) => onFilterChange({ ...filters, nome: e.target.value })}
                                        className='form-control-filter' 
                                    />                            
                                </FloatingLabel>
                            </Col>
                            <Col md={2}>
                                <FloatingLabel label="Tipo">
                                    <Form.Select 
                                        aria-label="Tipo" 
                                        value={filters.tipo} 
                                        onChange={(e) => onFilterChange({ ...filters, tipo: e.target.value })}
                                    >
                                        <option></option>
                                        {Object.entries(TipoInfracao).map(([key, label]) => (
                                            <option key={key} value={key}>{label}</option>
                                        ))}
                                    </Form.Select>                              
                                </FloatingLabel>
                            </Col>
                            <Col md={2}>
                                <FloatingLabel label="Grau">
                                    <Form.Select 
                                        aria-label="Grau" 
                                        value={filters.grau} 
                                        onChange={(e) => onFilterChange({ ...filters, grau: e.target.value })}
                                    >
                                        <option></option>
                                        {Object.entries(GrauInfracao).map(([key, label]) => (
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
                                        {Object.entries(InfracaoStatus).map(([key, label]) => (
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

export default InfracaoFilters;