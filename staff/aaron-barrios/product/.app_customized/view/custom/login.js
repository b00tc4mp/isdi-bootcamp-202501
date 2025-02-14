class Login extends Component {
    constructor() {
        super('div')
        this.container.style.width = '400px'

        const title = new Heading(2)
        title.setText('Login')
        this.add(title)

        const form = new Form()
        form.container.style.display = 'flex'
        form.container.style.flexDirection = 'column'
        form.container.style.justifyContent = 'left'
        form.container.style.gap = '5px'
        this.form = form
        this.add(form)

        //USERNAME
        const usernameLabel = new Label()
        usernameLabel.setText('Username')
        form.add(usernameLabel)

        const usernameInput = new Input()
        usernameInput.setType('text')
        usernameInput.container.style.width = '350px'
        form.add(usernameInput)

        //PASSWORD
        const passwordLabel = new Label()
        passwordLabel.setText('Password')
        form.add(passwordLabel)

        const passwordInput = new Input()
        passwordInput.setType('password')
        passwordInput.container.style.width = '350px'
        form.add(passwordInput)


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

        const lowerSpan = new Span()
        lowerSpan.container.style.margin = '10px'
        lowerSpan.container.style.marginRight = '60px'
        lowerSpan.container.style.display = 'flex'
        lowerSpan.container.style.justifyContent = 'space-between'
        this.add(lowerSpan)

        const registerAnchor = new Anchor()
        registerAnchor.setText('Register')
        registerAnchor.container.style.textDecoration = 'underline'
        registerAnchor.container.style.cursor = 'pointer'
        registerAnchor.addClickListener(function () {
            form.clear()

            this.registerClickListener()
        }.bind(this))
        lowerSpan.add(registerAnchor)

        const loginButton = new Button()
        loginButton.setText('Login')
        loginButton.setType('submit')
        loginButton.container.style.width = '80px'
        loginButton.setType8
        lowerSpan.add(loginButton)

        form.add(lowerSpan)
    }

    addRegisterClickListener(listener) {
        this.registerClickListener = listener
    }

    addLoginSubmitListener(listener) {
        this.loginSubmitListener = listener
    }
}
