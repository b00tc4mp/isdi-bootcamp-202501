class Register extends Component {
    constructor() {
        super('div')

        this.container.style.width = '400px'

        const title = new Heading(1)
        title.setText('Register')
        this.add(title)

        const form = new Form()
        form.container.style.display = 'flex'
        form.container.style.flexDirection = 'column'
        form.container.style.justifyContent = 'left'
        form.container.style.gap = '5px'
        this.form = form
        this.add(form)

        //NAME
        const nameLabel = new Label()
        nameLabel.setText('Name')
        form.add(nameLabel)

        const nameInput = new Input()
        nameInput.setType('text')
        nameInput.container.style.width = '350px'
        form.add(nameInput)

        //EMAIL
        const emailLabel = new Label()
        emailLabel.setText('E-mail')
        form.add(emailLabel)

        const emailInput = new Input()
        emailInput.setType('email')
        emailInput.container.style.width = '350px'
        form.add(emailInput)

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


        const lowerSpan = new Span()
        lowerSpan.container.style.margin = '10px'
        lowerSpan.container.style.marginRight = '55px'
        lowerSpan.container.style.display = 'flex'
        lowerSpan.container.style.justifyContent = 'space-between'
        lowerSpan.container.style.alignItems = 'center'
        lowerSpan.width = '100%'

        const loginAnchor = new Anchor()
        loginAnchor.setText('Login')
        loginAnchor.container.style.textDecoration = 'underline'
        loginAnchor.container.style.cursor = 'pointer'
        loginAnchor.addClickListener(() => {
            form.clear()

            this.loginClickListener()
        })
        lowerSpan.add(loginAnchor)

        const registerButton = new Button()
        registerButton.setText('Register')
        registerButton.setType('submit')
        registerButton.container.style.width = '80px'
        lowerSpan.add(registerButton)

        form.add(lowerSpan)

        form.addSubmitListener(event => {
            event.preventDefault()

            const name = nameInput.getValue()
            const email = emailInput.getValue()
            const username = usernameInput.getValue()
            const password = passwordInput.getValue()


            try {
                logic.registerUser(name, email, username, password)

                form.clear()

                alert('User created!')

                this.registerSubmitListener()
            } catch (error) {
                console.error(error)

                alert(error.message)
            }


        })
    }
    addLoginClickListener(listener) {
        this.loginClickListener = listener
    }

    addRegisterSubmitListener(listener) {
        this.registerSubmitListener = listener
    }
}

