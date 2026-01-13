// ****  REGISTER

class Register extends Component {
    constructor() {
        super('div')

        const logo = new Heading(1)
        logo.setText('Register')
        logo.container.style.textShadow = '2px 2px 3px black'
        this.add(logo)

        // Form
        const form = new Form()
        form.container.style.display = 'flex'
        form.container.style.flexDirection = 'column'
        form.addSubmitListener(function (event) {
            event.preventDefault()

            // Valores de datos del usuario
            const name = nameInput.getValue()
            const email = emailInput.getValue()
            const username = usernameInput.getValue()
            const password = passwordInput.getValue()

            //  Llamamos a estas funciones y si falla alguna lanza un error con el Catch.
            try {
                // Comprobamos los datos de usuario
                logic.registerUser(name, email, username, password)
                // Limpiamos el formulario de datos
                form.clear()
                // Hacemos el listener para que cambie la pantalla
                this.registerSubmitListener()
            } catch (error) {
                // Muestra el fallo por consola
                console.error(error)
                // Muestra un fallo al usuario
                alert(error.message)
            }
        }.bind(this))  // 
        this.add(form)

        // PARAMETROS DEL FORMULARIO
        // Name 
        const nameLabel = new Label()
        nameLabel.setText('Name')
        form.add(nameLabel)

        // Formulario 
        const nameInput = new Input()
        form.add(nameInput)

        // Email 
        const emailLabel = new Label()
        emailLabel.setText('E-mail')
        form.add(emailLabel)

        const emailInput = new Input()
        emailInput.setType('email')
        form.add(emailInput)

        // Username 
        const usernameLabel = new Label()
        usernameLabel.setText('Username')
        form.add(usernameLabel)

        const usernameInput = new Input()
        usernameInput.setType('text')
        form.add(usernameInput)

        // Password
        const passwordLabel = new Label()
        passwordLabel.setText('Password')
        form.add(passwordLabel)

        const passwordInput = new Input()
        passwordInput.setType('password')
        form.add(passwordInput)

        // Login Anchor
        const loginAnchor = new Anchor()
        loginAnchor.setText('Login')
        loginAnchor.container.style.textDecoration = 'underline'
        loginAnchor.addClickListener(function () {
            form.clear()

            this.loginClickListener()
        }.bind(this))
        this.add(loginAnchor)

        // Register Button
        const submitButton = new Button()
        submitButton.setText('Register')
        submitButton.setType('submit')
        submitButton.container.style.margin = '15px'
        submitButton.container.style.marginInline = 'inherit'
        form.add(submitButton)
    }

    addLoginClickListener(listener) {
        this.loginClickListener = listener
    }

    addRegisterSubmitListener(listener) {
        this.registerSubmitListener = listener
    }
}

