import Sidebar from '../components/sidebar/Sidebar';
import Header from '../components/header/Header';
import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

const Layout = () => {
    return(
      <div className="App">
        {/* Barra Lateral */}
        <Sidebar />
        {/* Main Content */}
        <div style={{ marginLeft: '280px', flex: 1 }}>
          {/* Header */}
          <Header />
          {/* Central Content Container */}
          <Container className="page-content">
            {/* Aqui, a rota interna da Home será renderizada */}
            <Outlet /> 
          </Container>
        </div>
        <ToastContainer /> 
      </div>
    );
};

export default Layout;