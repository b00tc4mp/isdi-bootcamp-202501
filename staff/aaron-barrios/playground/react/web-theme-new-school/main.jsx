const root = ReactDOM.createRoot(document.getElementById('root'))

const { Component, useState, useEffect } = React

//dumb functions

function Heading(props) {
    const { level, style, children } = props

    const Heading = `h${level}`

    console.debug('Heading -> render')

    return <Heading style={style}>{children}</Heading>
}

//smart

function Login(props) {
    const { mode } = props

    useEffect(() => {
        console.debug('Login -> componentDidmount (useEffect)')

        return () => console.debug('Login -> componentWillUnmount')
    }, [])

    useEffect(() => {
        console.debug('Login -> componentWillReceiveProps')
    }, [mode])

    console.debug('Login -> render')

    return <>
        <Heading level='2' style={{ color: mode === 'light' ? 'black' : 'white' }}>Hello, Login!</Heading>
    </>
}

function Register(props) {
    const { mode } = props

    useEffect(() => {
        console.debug('Register -> componentDidmount (useEffect)')

        return () => console.debug('Register -> componentWillUnmount')
    }, [])

    useEffect(() => {
        console.debug('Register -> componentWillReceiveProps')
    }, [mode])

    console.debug('Register -> render')

    return <>
        <Heading level='2' style={{ color: mode === 'light' ? 'black' : 'white' }}>Hello, Register!</Heading>
    </>
}

function App() {
    const [view, setView] = useState('')
    const [mode, setMode] = useState('light')

    useEffect(() => {
        console.debug('App -> "componentDidMount" (useEffect)')

        return () => console.debug('App -> "componentWillUnmount" (useEffect)')
    }, [])

    const handleLoginClick = () => {
        console.debug('App -> handleLoginClick (setState)')

        setView('login')
    }

    const handleRegisterClick = () => {
        console.debug('App -> handleRegisterClick (setState)')

        setView('register')
    }

    const handleToggleMode = () => {
        console.debug('App -> handleToggleMode (setState)')

        setMode(mode === 'light' ? 'dark' : 'light')
    }


    return <div style={{ height: '100%', backgroundColor: mode === 'light' ? 'white' : 'black' }}>
        <Heading level='1' style={{ color: mode === 'light' ? 'black' : 'white' }}>Hello, App!</Heading>

        <button style={{ backgroundColor: mode === 'light' ? 'black' : 'white' }} onClick={handleToggleMode}>{mode === 'light' ? '🌚' : '🌝'}</button>

        <p>
            <a style={{ color: mode === 'light' ? 'black' : 'white' }} onClick={handleLoginClick}>Login</a>
            &nbsp;
            <span style={{ color: mode === 'light' ? 'black' : 'white' }}>or</span>
            &nbsp;
            <a style={{ color: mode === 'light' ? 'black' : 'white' }} onClick={handleRegisterClick}>Register</a>
        </p>

        {view === 'login' && <Login mode={mode} />}
        {view === 'register' && <Register mode={mode} />}
    </div>
}


root.render(<App />)