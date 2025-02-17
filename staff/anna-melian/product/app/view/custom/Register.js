class Register extends Component {
    constructor() {
        super('div')

        var logo = new Heading(1)
        this.add(logo)
        logo.setText('Logo')

        var intructions = new Heading(4)
        this.add(intructions)
        intructions.setText('To create a new account enter the following information. ')

        // from

        var form = new Form()
        form.addSubmitListener(function (event) {
            event.preventDefault()

            console.log('register submit')

            var name = formNameInput.getValue()
            var email = formEmailInput.getValue()
            var username = formUsernameInput.getValue()
            var password = formPasswordInput.getValue()

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

        //name
        var formNameLabel = new Label()
        form.add(formNameLabel)
        formNameLabel.setText('Name')

        var formNameInput = new Input()
        form.add(formNameInput)
        formNameInput.setPlaceholder('Anna')
        formNameInput.setType('Name')

        // email
        var formEmailLabel = new Label()
        form.add(formEmailLabel)
        formEmailLabel.setText('E-mail')

        var formEmailInput = new Input()
        formEmailInput.setPlaceholder('abc@gmail.com')
        formEmailInput.setType('E-mail')
        form.add(formEmailInput)

        // username

        var formUsernameLabel = new Label()
        form.add(formUsernameLabel)

        formUsernameLabel.setText('Username')

        var formUsernameInput = new Input()
        formUsernameInput.setPlaceholder('Anna10')
        formUsernameInput.setType('Username')
        form.add(formUsernameInput)

        // password

        var formPasswordLabel = new Label()
        form.add(formPasswordLabel)
        formPasswordLabel.setText('Password')

        var formPasswordInput = new Input()
        formPasswordInput.setType('Password')
        form.add(formPasswordInput)

        // submit botton
        var formSubmitButton = new Button()
        form.add(formSubmitButton)
        formSubmitButton.setText('Create new account')
        formSubmitButton.setType('submit')

        // anchor 

        var loginAnchor = new Anchor()
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