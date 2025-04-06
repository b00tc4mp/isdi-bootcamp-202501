import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router' //se le puede cambiar el nombre, cambiamos por uno mas corto, Router. Este enrutador nos inyecta el router en la aplicacion

import  App  from './App.jsx'

import './index.css'

createRoot(document.getElementById('root')).render(
    <Router>
        <App />
    </Router>
)