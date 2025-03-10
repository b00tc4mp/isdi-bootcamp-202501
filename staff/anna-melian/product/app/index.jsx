import { createRoot } from 'react-dom/client'


if (!sessionStorage.getItem('userId')) {
    sessionStorage.setItem('userId', null);

}

import App from './App.jsx'


createRoot(document.getElementById('root')).render(<App />)