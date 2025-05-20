import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/login/LoginPage';
import Layout from './layouts/Layout';
import HomePage from './pages/home/HomePage';
import AcervosPage from './pages/acervos/AcervosPage';
import AcervoFormPage from './pages/acervos/AcervoFormPage';
// import AssinaturasPage from './pages/assinaturas/AssinaturasPage';
// import AssinaturaFormPage from './pages/assinaturas/AssinaturaFormPage';
import AutoresPage from './pages/autores/AutoresPage';
import AutorFormPage from './pages/autores/AutorFormPage';
import CategoriasPage from './pages/categorias/CategoriasPage';
import CategoriaFormPage from './pages/categorias/CategoriaFormPage';
// import DoadoresPage from './pages/doadores/DoadoresPage';
// import DoadorFormPage from './pages/doadores/DoadorFormPage';
import FornecedoresPage from './pages/fornecedores/FornecedoresPage';
import FornecedorFormPage from './pages/fornecedores/FornecedorFormPage';
import GenerosPage from './pages/generos/GenerosPage';
import GeneroFormPage from './pages/generos/GeneroFormPage';
import MotivosBaixaPage from './pages/motivos-baixa/MotivosBaixaPage';
import MotivoBaixaFormPage from './pages/motivos-baixa/MotivoBaixaFormPage';
import UsuariosPage from './pages/usuarios/UsuariosPage';
import UsuarioFormPage from './pages/usuarios/UsuarioFormPage';

const AppRoutes = () => (
    <Router>
        <Routes>
            <Route path='/login' element={<LoginPage />} />

            <Route element={<Layout />}>
                <Route path='/' element={<HomePage />} />
                <Route path='/cadastros'>
                    <Route path='acervos' element={<AcervosPage />} />
                    <Route path='acervos/novo' element={<AcervoFormPage />} />
                    <Route path='acervos/:id' element={<AcervoFormPage />} />
                    {/* <Route path='assinaturas' element={<AssinaturasPage />} />
                    <Route path='assinaturas/novo' element={<AssinaturaFormPage />} />
                    <Route path='assinaturas/:id' element={<AssinaturaFormPage />} /> */}
                    <Route path='autores' element={<AutoresPage />} />
                    <Route path='autores/novo' element={<AutorFormPage />} />
                    <Route path='autores/:id' element={<AutorFormPage />} />
                    <Route path='categorias' element={<CategoriasPage />} />
                    <Route path='categorias/nova' element={<CategoriaFormPage />} />
                    <Route path='categorias/:id' element={<CategoriaFormPage />} />
                    {/* <Route path='doadores' element={<DoadoresPage />} />
                    <Route path='doadores/novo' element={<DoadorFormPage />} />
                    <Route path='doadores/:id' element={<DoadorFormPage />} /> */}
                    <Route path='fornecedores' element={<FornecedoresPage />} />
                    <Route path='fornecedores/novo' element={<FornecedorFormPage />} />
                    <Route path='fornecedores/:id' element={<FornecedorFormPage />} />
                    <Route path='generos' element={<GenerosPage />} />
                    <Route path='generos/novo' element={<GeneroFormPage />} />
                    <Route path='generos/:id' element={<GeneroFormPage />} />
                    <Route path='motivos-baixa' element={<MotivosBaixaPage />} />
                    <Route path='motivos-baixa/novo' element={<MotivosBaixaPage />} />
                    <Route path='motivos-baixa/:id' element={<MotivoBaixaFormPage />} />
                    <Route path='usuarios' element={<UsuariosPage />} />
                    <Route path='usuarios/novo' element={<UsuarioFormPage />} />
                    <Route path='usuarios/:id' element={<UsuarioFormPage />} />
                </Route>
            </Route>
     
            <Route path="*" element={<LoginPage />} />
        </Routes>
    </Router>
);

export default AppRoutes;