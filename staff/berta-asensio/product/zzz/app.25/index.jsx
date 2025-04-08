/*
-Este código configura una aplicación de React que usa el enrutamiento (react-router).
-Se crea un 'root' en el DOM donde se monta la aplicación, y BrowserRouter (react-router), 
se utiliza para permitiras que las rutas y la URL se gestionen correctamente. 
-Todo el contenido de la aplicación se encuentra dentro del compo App.
*/

import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router'

import App from './App.jsx'


createRoot(document.getElementById('root')).render(
    <Router>
        <App />
    </Router>
)