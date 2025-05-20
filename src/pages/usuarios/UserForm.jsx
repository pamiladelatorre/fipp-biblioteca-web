// src/pages/users/UserForm.js
import React from 'react';
import { Button, Card, Form, Container, Row, Col } from 'react-bootstrap';

function UserForm() {
  return (
    <Container className="mt-4">
      <h2>Cadastro de Usuário</h2>

      {/* Card para dados principais */}
      <Card className="mb-4 custom-card">
        <Card.Header className="custom-card-header">
          Dados Principais
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Nome</Form.Label>
                <Form.Control type="text" placeholder="Digite o nome do usuário" />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Digite o email" />
              </Form.Group>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Card para contato */}
      <Card className="mb-4 custom-card">
        <Card.Header className="custom-card-header">
          Contato
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Telefone</Form.Label>
                <Form.Control type="text" placeholder="Digite o telefone" />
              </Form.Group>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Botões de ação */}
      <div className="d-flex justify-content-between">
        <Button variant="secondary">Voltar</Button>
        <Button variant="primary">Salvar</Button>
      </div>
    </Container>
  );
}

export default UserForm;
