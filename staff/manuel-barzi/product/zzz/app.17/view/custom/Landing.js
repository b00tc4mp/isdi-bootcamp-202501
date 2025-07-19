class Landing extends Component {
    constructor() {
        super('div')

        const logo = new Heading(1)
        logo.setText('Logo')
        this.add(logo)

        const registerAnchor = new Anchor()
        registerAnchor.setText('Register')
        this.registerAnchor = registerAnchor
        this.add(registerAnchor)


        const orText = document.createTextNode('or')
        this.container.appendChild(orText)

        const loginAnchor = new Anchor()
        loginAnchor.setText('Login')
        this.loginAnchor = loginAnchor
        this.add(loginAnchor)
    }

    addRegisterClickListener(listener) {
        this.registerAnchor.addClickListener(listener)
    }

    addLoginClickListener(listener) {
        this.loginAnchor.addClickListener(listener)
    }
}