import { Accordion, Container, Row, Col, FloatingLabel, Form, Button } from "react-bootstrap";
import { TipoPagamento } from '../../../enums/TipoPagamento';
import { TipoProduto } from '../../../enums/TipoProduto';
import { CompraStatus } from '../../../enums/CompraStatus';

function CompraFilters({ filters, onFilterChange, onClearFilters }){
    return(
        <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
                <Accordion.Header>Compras</Accordion.Header>
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
                            <Col md={2} className="mb-2">
                                <FloatingLabel label="Tipo Produto">
                                    <Form.Select 
                                        aria-label="Tipo Produto" 
                                        value={filters.tipoProduto} 
                                        onChange={(e) => onFilterChange({ ...filters, tipoProduto: e.target.value })}
                                    >
                                        <option></option>
                                        {Object.entries(TipoProduto).map(([key, label]) => (
                                            <option key={key} value={key}>{label}</option>
                                        ))}
                                    </Form.Select>                              
                                </FloatingLabel>
                            </Col>                                                     
                            <Col md={2} className="mb-2">
                                <FloatingLabel label="Tipo Pagamento">
                                    <Form.Select 
                                        aria-label="Tipo Pagamento" 
                                        value={filters.tipoPagamento} 
                                        onChange={(e) => onFilterChange({ ...filters, tipoPagamento: e.target.value })}
                                    >
                                        <option></option>
                                        {Object.entries(TipoPagamento).map(([key, label]) => (
                                            <option key={key} value={key}>{label}</option>
                                        ))}
                                    </Form.Select>                              
                                </FloatingLabel>
                            </Col>
                            <Col md={2}>
                                <FloatingLabel label="Empenho">
                                    <Form.Control 
                                        type='text' 
                                        value={filters.empenho}
                                        onChange={(e) => onFilterChange({ ...filters, empenho: e.target.value })}
                                        className='form-control-filter' 
                                    />                            
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
                                        {Object.entries(CompraStatus).map(([key, label]) => (
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

export default CompraFilters;