import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/login/LoginPage';
import Layout from './layouts/Layout';
import HomePage from './pages/home/HomePage';
import InfracoesPage from './pages/infracoes/InfracoesPage';
import InfracoesFormPage from './pages/infracoes/InfracoesFormPage';
import FornecedoresPage from './pages/fornecedores/FornecedoresPage';
import FornecedorFormPage from './pages/fornecedores/FornecedorFormPage';
import DoadoresPage from './pages/doadores/DoadoresPage';
import DoadorFormPage from './pages/doadores/DoadorFormPage';
import AssinaturasPage from './pages/assinaturas/AssinaturasPage';
import AssinaturaFormPage from './pages/assinaturas/AssinaturaFormPage';
import CategoriasPage from './pages/categorias/CategoriasPage';
import CategoriaFormPage from './pages/categorias/CategoriaFormPage';
import EntradasPage from './pages/entradas/EntradasPage';
import EntradaFormPage from './pages/entradas/EntradaFormPage';
import ExemplaresPage from './pages/exemplares/ExamplaresPage';
import ExemplarFormPage from './pages/exemplares/ExemplarFormPage';
import GenerosPage from './pages/generos/GenerosPage';
import GeneroFormPage from './pages/generos/GeneroFormPage';
import AutoresPage from './pages/autores/AutoresPage';
import AutorFormPage from './pages/autores/AutorFormPage';
import MotivosBaixaPage from './pages/motivos-baixa/MotivosBaixaPage';
import MotivoBaixaFormPage from './pages/motivos-baixa/MotivoBaixaFormPage';
import AcervosPage from './pages/acervos/AcervosPage';
import AcervoFormPage from './pages/acervos/AcervoFormPage';
import MovimentacoesPage from './pages/movimentacoes/MovimentacoesPage';
import UsuariosPage from './pages/usuarios/UsuariosPage';
import UsuarioFormPage from './pages/usuarios/UsuarioFormPage';
import ComprasPage from './pages/compras/ComprasPage';
import EmprestimoFormPage from './pages/movimentacoes/EmprestimoFormPage';
import DevolucaoPage from './pages/movimentacoes/DevolucaoPage';
import DevolucaoFormPage from './pages/movimentacoes/DevolucaoFormPage';


const AppRoutes = () => (
    <Router>
        <Routes>
            <Route path='/login' element={<LoginPage />} />

            <Route element={<Layout />}>
                <Route path='/' element={<HomePage />} />
                <Route path='/cadastros'>
                    <Route path='fornecedores' element={<FornecedoresPage />} />
                    <Route path='fornecedores/novo' element={<FornecedorFormPage />} />
                    <Route path='fornecedores/:id' element={<FornecedorFormPage />} />  
                    <Route path='doadores' element={<DoadoresPage />} />
                    <Route path='doadores/novo' element={<DoadorFormPage />} />
                    <Route path='doadores/:id' element={<DoadorFormPage />} />                                  
                    <Route path='assinaturas' element={<AssinaturasPage />} />
                    <Route path='assinaturas/novo' element={<AssinaturaFormPage />} />
                    <Route path='assinaturas/:id' element={<AssinaturaFormPage />} /> 
                    <Route path='categorias' element={<CategoriasPage />} />
                    <Route path='categorias/nova' element={<CategoriaFormPage />} />
                    <Route path='categorias/:id' element={<CategoriaFormPage />} />  
                    <Route path='generos' element={<GenerosPage />} />
                    <Route path='generos/novo' element={<GeneroFormPage />} />
                    <Route path='generos/:id' element={<GeneroFormPage />} />
                    <Route path='autores' element={<AutoresPage />} />
                    <Route path='autores/novo' element={<AutorFormPage />} />
                    <Route path='autores/:id' element={<AutorFormPage />} />
                    <Route path='motivos-baixa' element={<MotivosBaixaPage />} />  
                    <Route path='motivos-baixa/novo' element={<MotivoBaixaFormPage />} />
                    <Route path='motivos-baixa/:id' element={<MotivoBaixaFormPage />} />
                </Route>
                <Route path='/acervos'>
                    <Route path='' element={<AcervosPage />} />
                    <Route path='novo' element={<AcervoFormPage />} />
                    <Route path=':id' element={<AcervoFormPage />} />
                    <Route path='entradas' element={<EntradasPage />} />
                    <Route path='entradas/nova' element={<EntradaFormPage />} />
                    <Route path='entradas/:id' element={<EntradaFormPage />} />
                    <Route path='exemplares' element={<ExemplaresPage />} />
                    <Route path='exemplares/:id' element={<ExemplarFormPage />} />
                </Route> 

                <Route path='/movimentacoes'>
                    <Route path='' element={<MovimentacoesPage />} />
                    <Route path='nova'element={<EmprestimoFormPage />} />
                    <Route path='devolucoes' element={<DevolucaoPage />} />
                    <Route path='devolucoes/nova' element={<DevolucaoFormPage />} />
                </Route> 

                <Route path='/usuarios'>
                    <Route path='' element={<UsuariosPage />} />
                    <Route path='novo' element={<UsuarioFormPage />} />
                    <Route path=':id' element={<UsuarioFormPage />} />
                    <Route path='infracoes' element={<InfracoesPage />} />
                    <Route path='infracoes/novo' element={<InfracoesFormPage />} />
                    <Route path='infracoes/:id' element={<InfracoesFormPage />} />
                </Route> 

                <Route path='/compras' element={<ComprasPage />} />
            </Route>

            <Route path="*" element={<LoginPage />} />
        </Routes>
    </Router>
);

export default AppRoutes;