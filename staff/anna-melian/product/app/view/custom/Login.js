class Login extends Component {
    constructor() {
        super('div')

        const logo = new Heading(1)
        this.add(logo)
        logo.setText('Logo')

        const intructions = new Heading(4)
        this.add(intructions)
        intructions.setText('To login enter your credentials.')

        // form

        const form = new Form()
        form.addSubmitListener(event => {
            event.preventDefault()

            const username = formUsernameInput.getValue()
            const password = formPasswordInput.getValue()

            try {
                logic.loginUser(username, password)

                form.clear()

                this.loginSubmitListener()
            } catch (error) {
                console.error(error)

                alert(error.message)
            }
        })
        this.add(form)

        // username

        const formUsernameLabel = new Label()
        form.add(formUsernameLabel)
        formUsernameLabel.setText('Username')

        const formUsernameInput = new Input()
        formUsernameInput.setPlaceholder('Anna10')
        formUsernameInput.setType('Username')
        form.add(formUsernameInput)

        // password

        const formPasswordLabel = new Label()
        form.add(formPasswordLabel)

        formPasswordLabel.setText('Password')

        const formPasswordInput = new Input()
        formPasswordInput.setType('Password')
        form.add(formPasswordInput)

        // submit button

        const formSubmitButton = new Button()
        form.add(formSubmitButton)
        formSubmitButton.setText('Login')
        formSubmitButton.setType('submit')

        // anchor

        const registerAnchor = new Anchor()
        registerAnchor.setText('Register')
        registerAnchor.addClickListener(() => {
            form.clear()

            this.registerClickListener()
        })
        this.add(registerAnchor)
    }

    addRegisterClickListener(listener) {
        this.registerClickListener = listener
    }

    addLoginSubmitListener(listener) {
        this.loginSubmitListener = listener
    }

}