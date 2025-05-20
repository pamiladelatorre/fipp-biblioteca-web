import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import 'primereact/resources/themes/bootstrap4-light-blue/theme.css';
import './styles/global.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
