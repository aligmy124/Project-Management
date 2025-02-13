import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import AuthJWT from './Context/Components/AuthJWT/AuthJWT.jsx';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthJWT>
    <App />
    </AuthJWT>
  </StrictMode>,
)
