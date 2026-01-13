// ****  LOGIN

class Login extends Component {
    constructor() {
        super('div')

        const logo = new Heading(1)
        logo.setText('Login')
        logo.container.style.textShadow = '2px 2px 3px black'
        this.add(logo)

        // Form
        const form = new Form()
        form.container.style.display = 'flex'
        form.container.style.flexDirection = 'column'
        // form.container.style.alignItems = 'center'
        form.addSubmitListener(function (event) {
            event.preventDefault()

            const username = usernameInput.getValue()
            const password = passwordInput.getValue()

            try {
                logic.loginUser(username, password)

                form.clear()

                this.loginSubmitListener()
            } catch (error) {
                console.error(error)

                alert(error.message)
            }
        }.bind(this))
        this.add(form)

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

        // Button Login
        const submitButton = new Button()
        submitButton.setText('Login')
        submitButton.setType('submit')
        submitButton.container.style.margin = '10px'
        form.add(submitButton)

        // // Register
        const registerAnchor = new Anchor()
        registerAnchor.setText('Register')
        registerAnchor.container.style.textDecoration = 'underline'
        registerAnchor.addClickListener(function () {

            this.registerClickListener()
        }.bind(this))
        this.add(registerAnchor)
    }

    addRegisterClickListener(listener) {
        this.registerClickListener = listener
    }

    addLoginSubmitListener(listener) {
        this.loginSubmitListener = listener
    }
}