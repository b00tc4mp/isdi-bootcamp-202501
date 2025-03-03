const root = ReactDOM.createRoot(document.getElementById('root'))
if (!sessionStorage.getItem('userId')) {
    sessionStorage.setItem('userId', null);
}

root.render(<App />)