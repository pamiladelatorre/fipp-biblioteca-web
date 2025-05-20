// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { Container } from 'react-bootstrap';
// import Usuarios from './pages/Usuarios';
// import FornecedorForm from './pages/gerenciarfornecedores';
// import FormLivros from './pages/gerenciarlivros';
// import FormAutores from './pages/gerenciarautor';
// import Generos from './pages/Generos';
// import MotivosBaixa from './pages/gerenciarmotivobaixa';
// import Emprestimos from './pages/RegistrarEmprestimo';
// import { AuthProvider, useAuth } from './contexts/AuthContext';
// import ProtectedRoute from './Componentes/ProtectedRoute';
// import SemAutorizacao from './pages/semautorizacao';
import { AuthProvider } from './contexts/AuthContext.jsx';
import Routes from './routes.jsx';

function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}

// function AppContent() {
//   const { isAuthenticated } = useAuth();

//   console.log('isAuthenticated',isAuthenticated)

//   return (
//     <div className="App">
//       {isAuthenticated && <SideBar />}

//       <div style={{ marginLeft: isAuthenticated ? '280px' : '0', flex: 1 }}>
//         {isAuthenticated && <Header />}

//         <Container className="mt-5">
//         <Routes>
//   <Route path="/login" element={<Login />} />

//   {/* Rotas acessíveis a qualquer perfil autenticado */}
//   <Route element={<ProtectedRoute  />}>
//     <Route path="/" element={<Home />} />
//     <Route path="/emprestimos" element={<Emprestimos />} />
//   </Route>

//   {/* Rotas exclusivas para administrador */}
//   <Route element={<ProtectedRoute  />}>
//     <Route path="/formlivros" element={<FormLivros />} />
//     <Route path="/usuarios" element={<Usuarios />} />
//     <Route path="/fornecedores" element={<FornecedorForm />} />
//     <Route path="/autores" element={<FormAutores />} />
//     <Route path="/generos" element={<Generos />} />
//     <Route path="/motivobaixa" element={<MotivosBaixa />} />
//   </Route>

//   <Route path="/semautorizacao" element={<SemAutorizacao />} />

//   {/* Redirecionamento padrão */}
//   <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/login"} replace />} />
// </Routes>
//         </Container>
//       </div>
//     </div>
//   );
// }


export default App;
