// Version: 1.0
// Creation date: 2021-08-23
/**
 * Capturo el elemento con id root del DOM y renderizo el componente App en el root con ReactDOM.createRoot y root.render 
 */
import { createRoot } from 'react-dom/client'

import App from './App.jsx'

createRoot(document.getElementById('root')).render(<App />)