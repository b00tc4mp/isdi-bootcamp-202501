class Login extends Component {
    constructor() {
        super('div')

        const logo = new Heading(1)
        logo.setText('Logo')
        this.add(logo)

        const form = new Form()
        this.add(form)

        form.container.style.display = 'flex'
        form.container.style.flexDirection = 'column'
        form.container.style.gap = '0.3rem'

        const labelUsername = new Label()
        labelUsername.setText('Username')
        form.add(labelUsername)

        const inputUsername = new Input()
        form.add(inputUsername)

        const labelPassword = new Label()
        labelPassword.setText('Password')
        form.add(labelPassword)

        const inputPassword = new Input()
        inputPassword.setType('password')
        form.add(inputPassword)

        const loginButton = new Button()
        loginButton.setText('Login')
        loginButton.setType('submit')
        form.add(loginButton)

        form.addSubmitListener(event => {
            event.preventDefault()

            const username = inputUsername.getValue()
            const password = inputPassword.getValue()

            try {
                logic.loginUser(username, password)

                form.clear()

                this.loginSubmitButton()
            } catch (error) {
                console.error(error)

                alert(error.message)
            }
        })

        const registerAnchor = new Anchor()
        registerAnchor.setText('Register')
        this.registerAnchor = registerAnchor
        this.add(registerAnchor)

    }

    addRegisterClickListener = function (listener) {
        this.registerAnchor.addClickListener(listener)
    }

    addLoginSubmitListener = function (listener) {
        this.loginSubmitButton = listener
    }
}