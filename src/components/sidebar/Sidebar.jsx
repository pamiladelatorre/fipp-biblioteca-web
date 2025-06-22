import { Accordion, Nav } from 'react-bootstrap';
import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import styles from './Sidebar.module.css'; 

export default function Sidebar() {
  const { user } = useAuth(); // Ex: user.tipo_usuario === 'administrador'

  // Função para verificar permissão
  const canAccess = (roles) => roles.includes(user?.tipoUsuario || 'administrador');

  return (
    <div className={`${styles.sidebar} bg-dark border-end`}>
      <h5>Controll Books</h5>
      {/* Link para Home */}
      <Nav className="flex-column">
        <Nav.Link as={Link} to="/" className='menu-item'><i className="bi bi-house-door me-2"></i>Início</Nav.Link>
      </Nav>

      <Accordion alwaysOpen flush>
        {/* Cadastros */}
        {canAccess(['administrador']) && (
          <Accordion.Item eventKey="0">
            <Accordion.Header><i className="bi bi-folder-plus me-2"></i>Cadastros</Accordion.Header>
            <Accordion.Body>
              <Nav className="flex-column">
                <Nav.Link as={Link} to="/cadastros/fornecedores"><i className="bi bi-buildings me-2"></i>Fornecedores</Nav.Link>
                <Nav.Link as={Link} to="/cadastros/doadores"><i className="bi bi-hand-thumbs-up me-2"></i>Doadores</Nav.Link>
                <Nav.Link as={Link} to="/cadastros/assinaturas"><i className="bi bi-newspaper me-2"></i> Assinaturas</Nav.Link>
                <Nav.Link as={Link} to="/cadastros/categorias"><i className="bi bi-tags me-2"></i>Categorias</Nav.Link>
                <Nav.Link as={Link} to="/cadastros/generos"><i className="bi bi-bookmark me-2"></i>Gêneros</Nav.Link>
                <Nav.Link as={Link} to="/cadastros/autores"><i className="bi bi-person-vcard me-2"></i>Autores</Nav.Link>
                <Nav.Link as={Link} to="/cadastros/motivos-baixa"><i className="bi bi-exclamation-circle me-2"></i>Motivos de Baixa</Nav.Link>                
              </Nav>
            </Accordion.Body>
          </Accordion.Item>
        )}

        {/* Gestão de Acervo */}
        <Accordion.Item eventKey="1">
          <Accordion.Header><i className="bi bi-archive me-2"></i>Gestão de Acervos</Accordion.Header>
          <Accordion.Body>
            <Nav className="flex-column">
                <Nav.Link as={Link} to="/acervos"><i className="bi bi-journal-bookmark me-2"></i>Acervos</Nav.Link>
                <Nav.Link as={Link} to="/acervos/entradas"><i className="bi bi-box-arrow-in-down me-2"></i>Entradas</Nav.Link>
                <Nav.Link as={Link} to="/acervos/exemplares"><i className="bi bi-collection me-2"></i>Exemplares</Nav.Link>
            </Nav>
          </Accordion.Body>
          </Accordion.Item>


      {/* Movimentações */}

        <Accordion.Item eventKey="3">
        <Accordion.Header><i className="bi bi-arrow-left-right me-2"></i>Movimentações</Accordion.Header>
        <Accordion.Body>
        <Nav className="flex-column">
          <Nav.Link as={Link} to="/movimentacoes" ><i className="bi bi-box-arrow-up-right me-2"></i>Empréstimos</Nav.Link>
          <Nav.Link as={Link} to="/reservas" ><i className="bi bi-bookmark-check me-2"></i>Reservas</Nav.Link>
        </Nav>
        </Accordion.Body>
        </Accordion.Item>


        {/* Usuários */}
        {canAccess(['administrador']) && (
          <Accordion.Item eventKey="2">
            <Accordion.Header><i className="bi bi-people me-2"></i>Gestão de Usuários</Accordion.Header>
            <Accordion.Body>
              <Nav className="flex-column">
                <Nav.Link as={Link} to="/usuarios"><i className="bi bi-person me-2"></i>Usuários</Nav.Link>
                <Nav.Link as={Link} to="/usuarios/infracoes"><i className="bi bi-exclamation-triangle me-2"></i>Infrações</Nav.Link>
              </Nav>
            </Accordion.Body>
          </Accordion.Item>
        )}
      </Accordion>

      {/* Link para Compras */}
      <Nav className="flex-column">
        <Nav.Link as={Link} to="/compras" className='menu-item'><i className="bi bi-cart4 me-2"></i>Compras</Nav.Link>
      </Nav>
    </div>
  );
}