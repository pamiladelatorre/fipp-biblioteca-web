import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { TipoUsuario } from '../../enums/TipoUsuario';
import './Header.css'

function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = ()=>{
    logout();
    navigate('/login');
  }

  return (<>
    <header className="header d-flex align-items-center">
      <div className='system-data flex-grow-1'>Controll Books</div>
        <div className="user-data d-flex flex-column align-items-end">
          <span className='user-profile'>{user && TipoUsuario[user.perfil]}</span>
          <span className='user-name'>{user && user.nome}</span>
        </div>
      <Button className='btn-sair' onClick={handleLogout}>
        <div className='d-flex flex-column'>
          <i className='bi bi-x-circle'></i>
          <span>sair</span>
        </div>
      </Button>
    </header></>
  )
}

export default Header;