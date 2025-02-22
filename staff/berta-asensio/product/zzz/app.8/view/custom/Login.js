class Login extends Component {
    constructor() {
        super('div')

        const logo = new Heading(1)
        logo.setText('Bee You')
        this.add(logo)

        const title = new Heading(2)
        title.setText('Login')
        this.add(title)

        const form = new Form()

        form.addSubmitListener(function (event) {
            event.preventDefault()

            const username = usernameInput.getValue()
            const password = passwordInput.getValue()

            console.log(username, password)

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

        const usernameLabel = new Label()
        usernameLabel.setText('Username')
        form.add(usernameLabel)

        const br1 = new Br()
        form.add(br1)

        const usernameInput = new Input()
        form.add(usernameInput)

        const br2 = new Br()
        form.add(br2)

        const passwordLabel = new Label()
        passwordLabel.setText('Password')
        form.add(passwordLabel)

        const br3 = new Br()
        form.add(br3)

        const passwordInput = new Input()
        passwordInput.setType('password')
        form.add(passwordInput)

        const br4 = new Br()
        form.add(br4)

        const returnAnchor = new Anchor()
        returnAnchor.setText('Return')
        this.add(returnAnchor)
        this.returnAnchor = returnAnchor

        const button = new Button()
        button.setType('submit')
        button.setText('Login')
        form.add(button)
    }

    addLoginSubmitListener(listener) {
        this.loginSubmitListener = listener
    }

    addReturnClickListener(listener) {
        this.returnAnchor.addClickListener(listener)
    }
}