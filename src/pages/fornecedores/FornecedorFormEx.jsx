// src/pages/suppliers/SupplierForm.js
import React from 'react';
import { Accordion, Button, Col, Container, Form, Row } from 'react-bootstrap';

function SupplierForm() {
  return (
    <Container className="mt-4">
      <h2>Cadastro de Fornecedor</h2>
      <Accordion defaultActiveKey="0">
        {/* Dados Principais */}
        <Accordion.Item eventKey="0">
          <Accordion.Header>Dados do Fornecedor</Accordion.Header>
          <Accordion.Body>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Razão Social</Form.Label>
                  <Form.Control type="text" />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>CNPJ</Form.Label>
                  <Form.Control type="text" />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Representante</Form.Label>
                  <Form.Control type="text" />
                </Form.Group>
              </Col>
            </Row>
            <Form.Check type="switch" label="Ativo" className="mb-3" />
          </Accordion.Body>
        </Accordion.Item>

        {/* Contato */}
        <Accordion.Item eventKey="1">
          <Accordion.Header>Contato</Accordion.Header>
          <Accordion.Body>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Telefone</Form.Label>
                  <Form.Control type="text" />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Endereço</Form.Label>
              <Form.Control as="textarea" rows={2} />
            </Form.Group>
          </Accordion.Body>
        </Accordion.Item>

        {/* Gêneros */}
        <Accordion.Item eventKey="2">
          <Accordion.Header>Gêneros Fornecidos</Accordion.Header>
          <Accordion.Body>
            {/* Aqui você pode adicionar uma tabela com checkboxes, ou uma lista multi-select */}
            <p>Lista de gêneros com seleção múltipla.</p>
          </Accordion.Body>
        </Accordion.Item>

        {/* Métodos de Pagamento */}
        <Accordion.Item eventKey="3">
          <Accordion.Header>Métodos de Pagamento</Accordion.Header>
          <Accordion.Body>
            {/* Aqui entraria um componente de listagem/editável ou inputs inline */}
            <p>Lista de métodos com campos tipo, banco, chave Pix, etc.</p>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      <div className="d-flex justify-content-end gap-2 mt-4">
        <Button variant="secondary">Voltar</Button>
        <Button variant="primary">Salvar</Button>
      </div>
    </Container>
  );
}

export default SupplierForm;
