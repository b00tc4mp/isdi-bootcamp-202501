class Landing extends Component {
    constructor() {
        super('div')

        this.container.style.textAlign = 'center'

        const logo = new Heading(1)
        this.add(logo)
        logo.setText('Logo')

        const registerAnchor = new Anchor()
        this.add(registerAnchor)
        registerAnchor.setText('Register')
        this.registerAnchor = registerAnchor

        const orText = new Heading(4)
        orText.setText(' or ')
        this.add(orText)

        const loginAnchor = new Anchor()
        loginAnchor.setText('Login')
        this.add(loginAnchor)
        this.loginAnchor = loginAnchor
    }

    addRegisterClickListener(listener) {
        this.registerAnchor.addClickListener(listener)
    }

    addLoginClickListener(listener) {
        this.loginAnchor.addClickListener(listener)
    }
}