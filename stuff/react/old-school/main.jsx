const root = ReactDOM.createRoot(document.getElementById('root'))

const { Component } = React

class Login extends Component {
    constructor() {
        super()

        console.log('Login -> constructor')
    }

    componentDidMount() {
        console.log('Login -> componentDidMount')
    }

    componentWillUnmount() {
        console.log('Login -> componentWillUnmount')
    }

    componentWillReceiveProps() {
        console.log('Login -> componentWillReceiveProps')
    }

    render() {
        console.log('Login -> render')

        const { mode } = this.props

        return <>
            <h2 style={{ color: mode === 'light' ? 'black' : 'white' }}>Hello, Login!</h2>
        </>
    }
}


class Register extends Component {
    constructor() {
        super()

        console.log('Register -> constructor')
    }

    componentDidMount() {
        console.log('Register -> componentDidMount')
    }

    componentWillUnmount() {
        console.log('Register -> componentWillUnmount')
    }

    render() {
        console.log('Register -> render')

        return <>
            <h2>Hello, Register!</h2>
        </>
    }
}

class App extends Component {
    constructor() {
        super()

        console.log('App -> constructor')

        this.state = { view: '', mode: 'light' }
    }

    componentDidMount() {
        console.log('App -> componentDidMount')
    }

    componentWillUnmount() {
        console.log('App -> componentWillUnmount')
    }

    handleLoginClick = () => {
        console.log('App -> handleLoginClick (setState)')

        this.setState({ view: 'login' })
    }

    handleRegisterClick = () => {
        console.log('App -> handleRegisterClick (setState)')

        this.setState({ view: 'register' })
    }

    handleToggleMode = () => {
        console.log('App -> handleToggleMode (setState)')

        const { mode } = this.state

        this.setState({ mode: mode === 'light' ? 'dark' : 'light' })
    }

    render() {
        console.log('App -> render')

        const { mode } = this.state

        return <div style={{ height: '100%', backgroundColor: mode === 'light' ? 'white' : 'black' }}>
            <h1 style={{ color: mode === 'light' ? 'black' : 'white' }}>Hello, App!</h1>

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