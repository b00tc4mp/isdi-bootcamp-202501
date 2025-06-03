class Login extends Component {
    constructor() {
        super('div')

        const logo = new Heading(1)
        logo.setText('Logo')
        this.add(logo)

        // form

        const form = new Form()
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

        // username

        const usernameLabel = new Label()
        usernameLabel.setText('Username')
        form.add(usernameLabel)


        const usernameInput = new Input()
        usernameInput.setType('text')
        form.add(usernameInput)

        // password

        const passwordLabel = new Label()
        passwordLabel.setText('Password')
        form.add(passwordLabel)


        const passwordInput = new Input()
        passwordInput.setType('password')
        form.add(passwordInput)

        // submit

        const submitButton = new Button()
        submitButton.setText('Login')
        submitButton.setType('submit')
        form.add(submitButton)

        // anchor

        const registerAnchor = new Anchor()
        registerAnchor.setText('Register')
        registerAnchor.addClickListener(function () {
            form.clear()

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