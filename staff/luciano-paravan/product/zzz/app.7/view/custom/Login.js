class Login extends Component {
    constructor() {
        super('div')

        const logo = new Heading(1)
        logo.setText('Logo')
        this.add(logo)
        
        const loginText = new Heading(3)
        loginText.setText('Login')
        this.add(loginText)
        
        const form = new Form()
        form.addSubmitListener(function(event) {
            event.preventDefault()

            const username = usernameInput.getValue()
            const password = passwordInput.getValue()
            
            try {
                logic.loginUser(username, password)

                form.clear()
        
                this.loginSubmitListener()
            } catch (error){
                console.error(error)

                alert(error.message)
            }

        }.bind(this))
        this.add(form)
        
        // Username
        
        const usernameLabel = new Label()
        usernameLabel.setText('Username: ')
        form.add(usernameLabel)
        
        const usernameInput = new Input()
        usernameInput.setType('text')
        usernameInput.name = 'login-name'
        form.add(usernameInput)
        
        // Password

        const passwordLabel = new Label()
        passwordLabel.setText('Password: ')
        form.add(passwordLabel)
        
        const passwordInput = new Input()
        passwordInput.setType('password')
        passwordInput.name = 'password-input'
        form.add(passwordInput)
        
        // Submit - Login

        const loginSubmit = new Button()
        loginSubmit.setText('Login')
        loginSubmit.setType('submit')
        
        form.add(loginSubmit)
        
        // Anchor - Register

        const registerAnchor = new Anchor()
        registerAnchor.setText('Register')
        registerAnchor.addClickListener(function() {
            form.clear()

            this.registerClickListener()
        }.bind(this))
        
        form.add(registerAnchor)
        
    }

    addRegisterClickListener (listener) {
        this.registerClickListener = listener
    }

    addLoginSubmitListener (listener) {
        this.loginSubmitListener = listener
        //this.loginSubmitListener = listener
    }
}
//Lo que hace en el prototipo de arriba es recibir lo que quiero que haga desde el main (remover y agregar pantalla), guarda la referencia en el listener como propiedad, para poder usarlo en el login.



// ---- ESTILOS

//form.container.style.display = 'flex'
//form.container.style.flexDirection = 'column'
//form.container.style.gap = '0.5rem'

//loginSubmit.container.style.backgroundColor = '#428A82'
//loginSubmit.container.style.color = '#FFFFFF'

//registerLogin.container.style.fontWeight = 'bold'
//registerLogin.container.style.textDecoration = 'underline'
//registerLogin.container.style.marginTop = '50px'
//registerLogin.container.style.textAlign = 'center'