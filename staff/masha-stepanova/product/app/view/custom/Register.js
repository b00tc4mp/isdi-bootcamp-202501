class Register extends Component {
    constructor() {
        super('div')

        const logo = new Heading(1)
        logo.setText('Logo')
        this.add(logo)

        const form = new Form()
        form.container.style.display = 'flex'
        form.container.style.flexDirection = 'column'
        form.container.style.gap = '0.3rem'

        form.addSubmitListener(function (event) {
            event.preventDefault()

            const name = inputName.getValue()
            const email = inputEmail.getValue()
            const username = inputUsername.getValue()
            const password = inputPassword.getValue()

            try {
                logic.registerUser(name, email, username, password)

                form.clear()

                this.registerSubmitListener()
            } catch (error) {
                console.log(error)

                alert(error.message)
            }
        }.bind(this))
        this.add(form)

        const labelName = new Label()
        labelName.setText('Name')
        form.add(labelName)

        const inputName = new Input()
        form.add(inputName)

        const labelEmail = new Label()
        labelEmail.setText('E-mail')
        form.add(labelEmail)

        const inputEmail = new Input()
        inputEmail.setType('email')
        form.add(inputEmail)

        const labelUsername = new Label()
        labelUsername.setText('Username')
        form.add(labelUsername)

        const inputUsername = new Input()
        inputUsername.setType('text')
        form.add(inputUsername)

        const labelPassword = new Label()
        labelPassword.setText('Password')
        form.add(labelPassword)

        const inputPassword = new Input()
        inputPassword.setType('password')
        form.add(inputPassword)

        const submitButton = new Button()
        submitButton.setType('submit')
        submitButton.setText('Submit')
        form.add(submitButton)

        const loginAnchor = new Anchor()
        loginAnchor.setText('Login')
        loginAnchor.addClickListener(function () {
            form.clear()

            this.loginClickListener()
        }.bind(this))
        this.add(loginAnchor)
    }

    addLoginClickListener = function (listener) {
        this.loginClickListener = listener
    }

    addRegisterSubmitListener = function (listener) {
        this.registerSubmitListener = listener
    }
}