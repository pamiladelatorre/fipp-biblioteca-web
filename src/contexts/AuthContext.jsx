import { createContext, useState, useEffect  } from 'react';
import { jwtDecode } from 'jwt-decode';
import * as authService from '../services/authService.js';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [firstAccess, setFirstAccess] = useState(false);
  const [user, setUser] = useState(null); // nome e perfil

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUserData(token)
    }
  }, []);

  const login = async (email, password) => {
    try {
      const { data:token } = await authService.login(email, password);
      localStorage.setItem('token', token);
      setUserData(token)
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const logout = () => {
    authService.logout();
    setFirstAccess(false);
    setUser(null);
  };

  const setUserData = (token) => {
    const decodedToken = jwtDecode(token);
    console.log(decodedToken);
    setFirstAccess(decodedToken.primeiroAcesso || false);
    const { id, nome, perfil } = decodedToken;
    setUser({ id, nome, perfil });
  };

  return (
    <AuthContext.Provider value={{ user, firstAccess, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}