class Register extends Component {
    constructor() {
        super('div')

        const logo = new Heading(1)
        this.add(logo)
        logo.setText('Logo')

        const intructions = new Heading(4)
        this.add(intructions)
        intructions.setText('To create a new account enter the following information. ')

        // from

        const form = new Form()
        form.addSubmitListener(event => {
            event.preventDefault()

            console.log('register submit')

            const name = formNameInput.getValue()
            const email = formEmailInput.getValue()
            const username = formUsernameInput.getValue()
            const password = formPasswordInput.getValue()

            try {
                logic.registerUser(name, email, username, password)

                form.clear()

                this.registerSubmitListener()
            } catch (error) {
                console.log(error)

                alert(error.message)
            }

        })
        this.add(form)

        //name
        const formNameLabel = new Label()
        form.add(formNameLabel)
        formNameLabel.setText('Name')

        const formNameInput = new Input()
        form.add(formNameInput)
        formNameInput.setPlaceholder('Anna')
        formNameInput.setType('Name')

        // email
        const formEmailLabel = new Label()
        form.add(formEmailLabel)
        formEmailLabel.setText('E-mail')

        const formEmailInput = new Input()
        formEmailInput.setPlaceholder('abc@gmail.com')
        formEmailInput.setType('E-mail')
        form.add(formEmailInput)

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

        // submit botton
        const formSubmitButton = new Button()
        form.add(formSubmitButton)
        formSubmitButton.setText('Create new account')
        formSubmitButton.setType('submit')

        // anchor 

        const loginAnchor = new Anchor()
        loginAnchor.setText('Login')
        loginAnchor.addClickListener(() => {
            form.clear()
            this.loginClickListener()
        })
        this.add(loginAnchor)
    }

    addLoginClickListener(listener) {
        this.loginClickListener = listener
    }

    addRegisterSubmitListener(listener) {
        this.registerSubmitListener = listener
    }

}