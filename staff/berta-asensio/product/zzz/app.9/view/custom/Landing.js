class Landing extends Component {
    constructor() {
        super('div')
    
    const logo = new Heading(1)
    logo.setText('Bee you')
    this.add(logo)

    //register button

    const registerButton = new Button()
    registerButton.setText('Register')
    this.add(registerButton)
    this.registerButton = registerButton

    // simple text

    const spaceText = document.createTextNode(' ')
    this.container.appendChild(spaceText)
    const orText = document.createTextNode('or')
    this.container.appendChild(orText)
    const spaceText2 = document.createTextNode(' ')
    this.container.appendChild(spaceText2)

    //login anchor  

    const loginButton = new Button()
    loginButton.setText('Login')
    this.add(loginButton)
    this.loginButton = loginButton
    }

    addRegisterClickListener(listener) {
        this.registerButton.addClickListener(listener)
    }

    addLoginClickListener(listener) {
        this.loginButton.addClickListener(listener)
    }

}

