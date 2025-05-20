import { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { ToastContainer, toast } from 'react-toastify';

function LoginPage(){
    const usuarioRef = useRef();
    const senhaRef = useRef();
    const { user, firstAccess, login } = useAuth();

    const navigate = useNavigate();

    useEffect(() => {
        if (user && !firstAccess) 
            navigate('/'); // Redireciona se já estiver logado
    }, [user]);
   
    async function handleSubmit(event) {
        event.preventDefault()
        try {
            if(!usuarioRef.current.value || !senhaRef.current.value){
                toast.error("Todos os campos são obrigatórios!");
                return;
            }

            const success = await login(usuarioRef.current.value, senhaRef.current.value);

            if (success) {
                if(firstAccess){
                    // navigate('/alterar-senha');
                    navigate('/');
                    return;
                }
                navigate('/');
              } else {
                toast.error('Usuário ou senha inválidos');
              }
        } catch (error) {
            toast.error(error.message);
        }
    }
    
    return(
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
        <div className="card p-4" style={{ width: '380px' }}>
            <h4 className="text-center mb-4">Acesso ao Control Books</h4>

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Usuário</label>
                    <input ref={usuarioRef} type="text" className="form-control" id="username" placeholder="Digite seu usuário" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Senha</label>
                    <input ref={senhaRef} type="password" className="form-control" placeholder="Digite sua senha" />
                </div>
                <button type="submit" className="btn btn-primary w-100">Entrar</button>
            </form>

            <div className="mt-3 text-center">
                <a href="#" className="text-muted">Esqueceu a senha?</a>
            </div>
        </div>
        <ToastContainer />
    </div>)
}

export default LoginPage;