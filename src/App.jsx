import { AuthProvider } from './contexts/AuthContext.jsx';
import Routes from './routes.jsx';

function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}

export default App;
