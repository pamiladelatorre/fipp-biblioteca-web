import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Header.css'

function Header() {
  const navigate = useNavigate();

  const handleLogout = ()=>{
     navigate('/login')
  }

  return (
    <header className="header d-flex align-items-center">
      <div className='system-data flex-grow-1'>Controll Books</div>
        <div className="user-data d-flex flex-column align-items-end">
          <span>Estudante</span>
          <span className='user-name'>Ana Silva</span>
        </div>
      <Button className='btn-sair' onClick={handleLogout}>
        <div className='d-flex flex-column'>
          <i className='bi bi-x-circle'></i>
          <span>sair</span>
        </div>
      </Button>
    </header>
  )
}

export default Header;