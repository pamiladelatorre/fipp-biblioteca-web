import { useState } from 'react';
import { Navbar, Container, Nav, Collapse  } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Sidebar.css'

function Sidebar() {
  const [openCadastros, setOpenCadastros] = useState(false);
  const [openEmprestimos, setOpenEmprestimos] = useState(false);

  return (
    <Navbar bg="dark" className="sidebar p-3">
      <Container className="d-flex flex-column h-100">
        <Link to="/" className="text-white text-decoration-none align-self-start">
          <span className="fs-4"><i className="bi bi-list"></i></span>
        </Link>
        <Nav defaultActiveKey="/" className="flex-column mt-4 mb-auto">
          {/* Cadastros */}
          <Nav.Item>
            <Nav.Link onClick={() => setOpenCadastros(!openCadastros)}><i className="bi bi-folder me-2"></i>Cadastros</Nav.Link>
            <Collapse in={openCadastros}>
              <div>
                <Nav className="flex-column ms-3">
                  <Nav.Link as={Link} to="/cadastros/acervos"><i className="bi bi-book me-2"></i>Acervos</Nav.Link>
                  <Nav.Link as={Link} to="/cadastros/assinaturas"><i className="bi bi-clipboard-check me-2"></i> Assinaturas</Nav.Link>
                  <Nav.Link as={Link} to="/cadastros/autores"><i className="bi bi-person-lines-fill me-2"></i>Autores</Nav.Link>
                  <Nav.Link as={Link} to="/cadastros/categorias"><i className="bi bi-tags me-2"></i>Categorias</Nav.Link>
                  <Nav.Link as={Link} to="/cadastros/doadores"><i className="bi bi-person-heart me-2"></i>Doadores</Nav.Link>
                  <Nav.Link as={Link} to="/cadastros/fornecedores"><i className="bi bi-truck me-2"></i>Fornecedores</Nav.Link>
                  <Nav.Link as={Link} to="/cadastros/generos"><i className="bi bi-tags me-2"></i>Gêneros</Nav.Link>
                  <Nav.Link as={Link} to="/cadastros/motivos-baixa"><i className="bi bi-file-earmark-x me-2"></i>Motivos de Baixa</Nav.Link>
                  <Nav.Link as={Link} to="/cadastros/usuarios"><i className="bi bi-person me-2"></i>Usuários</Nav.Link>
                </Nav>
              </div>
            </Collapse>
          </Nav.Item>

          {/* Empréstimos */}
          <Nav.Item>
            <Nav.Link onClick={() => setOpenEmprestimos(!openEmprestimos)}><i className="bi bi-arrow-left-right me-2"></i>Empréstimos</Nav.Link>
            <Collapse in={openEmprestimos}>
              <div>
                <Nav className="flex-column ms-3">
                  <Nav.Link as={Link} to="/emprestimos/reservar"><i className="bi bi-bookmark-plus me-2"></i>Reservar Exemplar</Nav.Link>
                  <Nav.Link as={Link} to="/emprestimos/registrar"><i className="bi bi-arrow-left-right me-2"></i>Registrar Empréstimo</Nav.Link>
                  <Nav.Link as={Link} to="/emprestimos/devolucao"><i className="bi bi-arrow-90deg-left me-2"></i>Registrar Devolução</Nav.Link>
                </Nav>
              </div>
            </Collapse>
          </Nav.Item>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Sidebar;