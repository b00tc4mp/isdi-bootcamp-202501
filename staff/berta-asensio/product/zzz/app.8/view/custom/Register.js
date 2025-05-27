class Register extends Component {
    constructor() {
        super('div')

        const logo = new Heading(1)
        logo.setText('Bee you')
        this.add(logo)

        const title = new Heading(2)
        title.setText('Create account')
        this.add(title)

        //Form
        const form = new Form()

        form.addSubmitListener(function (event) {
            event.preventDefault()

            const name = nameInput.getValue()
            const username = usernameInput.getValue()
            const password = passwordInput.getValue()
            const email = emailInput.getValue()

            console.log(name, username, password, email)
     
            try {
                logic.registerUser(name, username, password, email)

                form.clear() 

                this.registerSubmitListener()
            } catch (error) {
                console.error(error)

                alert(error.message)
            }
        }.bind(this))
        this.add(form)

        //name

        const nameLabel = new Label()
        nameLabel.setText('Name')
        form.add(nameLabel)

        const br5 = new Br()
        form.add(br5)

        const nameInput = new Input()
        form.add(nameInput)

        const br6 = new Br()
        form.add(br6)

        //username

        const usernameLabel = new Label()
        usernameLabel.setText('Username')
        form.add(usernameLabel)

        const br7 = new Br()
        form.add(br7)

        const usernameInput = new Input()
        form.add(usernameInput)

        const br8 = new Br()
        form.add(br8)

        //password

        const passwordLabel = new Label
        passwordLabel.setText('Password')
        form.add(passwordLabel)

        const br9 = new Br()
        form.add(br9)

        const passwordInput = new Input()
        passwordInput.setType('password')
        form.add(passwordInput)

        const br10 = new Br()
        form.add(br10)

        //email

        const emailLabel = new Label()
        emailLabel.setText('Email')
        form.add(emailLabel)

        const br11 = new Br()
        form.add(br11)

        const emailInput = new Input()
        emailInput.setType('email') 
        form.add(emailInput)

        const br12 = new Br()
        form.add(br12)

        //return anchor 

        const returnAnchor = new Anchor()
        returnAnchor.setText('Return')

        this.add(returnAnchor)
        this.returnAnchor = returnAnchor

        const spaceBetweenButton = document.createTextNode(' ')
        this.container.appendChild(spaceBetweenButton)

        //register Button

        const registerButton = new Button()
        registerButton.setType('submit')
        registerButton.setText('Register') // Este botón ahora es el botón de "submit"
        form.add(registerButton)
    }


    addRegisterSubmitListener(listener) {
        this.registerSubmitListener = listener
    }

    addReturnClickListener(listener) {
        this.returnAnchor.addClickListener(listener)
    }
}
