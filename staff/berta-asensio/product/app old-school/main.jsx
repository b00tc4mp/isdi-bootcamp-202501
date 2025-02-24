const root = ReactDOM.createRoot(document.getElementById('root'))

const { Component } = React

class Login extends Component {
    constructor() {
        super()

        console.debug('Login -> constructor')
    }

    componentDidMount() {
        console.debug('Login -> componentDidMount')
    }
    
    componentWillUnmount() {
        console.debug('Login -> componentWillUnmount')
    }

    componentWillReceiveProps() {
        console.debug('Login -> componentWillReceiveProps')
    }
    
    render() {
        console.debug('Login -> render')

        const { mode } = this.props

        return <>
            <Heading level="2" style={{ color: mode === 'light' ? 'black' : 'white' }}>Hello, Login!</Heading>
        </>
    }
}

class Register extends Component {
    constructor () {
        super()

        console.debug('Register -> constructor')
    }

    componentDidMount() {
        console.debug('Register -> componentDidMount')
    }
    
    componentWillUnmount() {
        console.debug('Register -> componentWillUnmount')
    }

    componentWillReceiveProps() {
        console.debug('Register -> componentWillReceiveProps')
    }
    
    render() {
        console.debug('Register -> render')

        const { mode } = this.props

        return <>
            <Heading level="2" style={{ color: mode === 'light' ? 'black' : 'white' }}>Hello, Register!</Heading>
        </>
    }
}

class App extends Component {
    constructor() {
        super()

        console.debug('App -> constructor')

        this.state = { view: '', mode: 'light' }
    }

    componentDidMount() {
        console.debug('App -> componentDidMount')
    }

    componentWillUnmount() {
        console.debug('App -> componentWillUnmount')
    }

    handleLoginClick = () => {
        console.debug('App -> handleLoginClick (setState)')

        this.setState({ view: 'login'})
    }

    handleRegisterClick = () => {
        console.debug('App -> handleRegisterClick (setState')

        this.setState({ view; 'register'}
        )
    }

    handleToggleMOde = () => {
        console.debug('App -> handleToggleMode (setState)')

        const { mode } = this.state

        this.setState({ mode: mode === 'light' ? 'dark' : 'light'})
    }

    render() {
        console.debug('App -> render')

        const { mode } = this.state

        return <div style={{ height: '100%', backgroundColor: mode === 'light' ? 'white' : 'black' }}>
            <Heading level="1" style={{ color: mode === 'light' ? 'black' : 'white' }}>Hello, App!</Heading>

            <button style={{ backgroundColor: mode === 'light' ? 'black' : 'white' }} onClick={this.handleToggleMode}>{mode === 'light' ? '🌚' : '🌝'}</button>

            <p>
                <a style={{ color: mode === 'light' ? 'black' : 'white' }} onClick={this.handleLoginClick}>Login</a>
                &nbsp;
                <span style={{ color: mode === 'light' ? 'black' : 'white' }}>or</span>
                &nbsp;
                <a style={{ color: mode === 'light' ? 'black' : 'white' }} onClick={this.handleRegisterClick}>Register</a>
            </p>

            {this.state.view === 'login' && <Login mode={mode} />}
            {this.state.view === 'register' && <Register mode={mode} />}
        </div>
    }
}

root.render(<App />)
