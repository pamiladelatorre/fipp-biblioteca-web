import { AuthProvider } from './contexts/AuthContext.jsx';
import { LoadingBarProvider } from './contexts/LoadingBarContext.jsx';
import Routes from './routes.jsx';

function App() {
  return (
    <AuthProvider>
      <LoadingBarProvider>
        <Routes />
      </LoadingBarProvider>
    </AuthProvider>
  );
}

export default App;
