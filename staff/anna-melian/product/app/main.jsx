const { createRoot } = ReactDOM


if (!sessionStorage.getItem('userId')) {
    sessionStorage.setItem('userId', null);
}

createRoot(document.getElementById('root')).render(<App />)