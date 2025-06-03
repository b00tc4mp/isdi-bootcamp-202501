class Register extends Component {
    constructor() {
        super('div')

        const logo = new Heading(1)
        logo.setText('Logo')
        this.add(logo)

        // form

        const form = new Form()
        form.addSubmitListener(function (event) {
            event.preventDefault()

            const name = nameInput.getValue()
            const email = emailInput.getValue()
            const username = usernameInput.getValue()
            const password = passwordInput.getValue()

            try {
                logic.registerUser(name, email, username, password)

                form.clear()

                this.registerSubmitListener()
            } catch (error) {
                console.error(error)

                alert(error.message)
            }
        }.bind(this))
        this.add(form)

        // name

        const nameLabel = new Label()
        nameLabel.setText('Name')
        form.add(nameLabel)

        const nameInput = new Input()
        form.add(nameInput)

        // email

        const emailLabel = new Label()
        emailLabel.setText('E-mail')
        form.add(emailLabel)


        const emailInput = new Input()
        emailInput.setType('email')
        form.add(emailInput)

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
        submitButton.setText('Register')
        submitButton.setType('submit')
        form.add(submitButton)

        // anchor

        const loginAnchor = new Anchor()
        loginAnchor.setText('Login')
        loginAnchor.addClickListener(function () {
            form.clear()

            this.loginClickListener()
        }.bind(this))
        this.add(loginAnchor)
    }

    addLoginClickListener(listener) {
        this.loginClickListener = listener
    }

    addRegisterSubmitListener(listener) {
        this.registerSubmitListener = listener
    }
}