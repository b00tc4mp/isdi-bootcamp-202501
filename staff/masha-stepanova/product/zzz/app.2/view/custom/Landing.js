class Landing extends Component {
    constructor() {
        super('div')

        const logo = new Heading(1)
        logo.setText('Logo')
        logo.container.style.justifyContent = 'center'
        this.add(logo)

        const span = new Span()
        this.add(span)

        const registerAnchor = new Anchor()
        registerAnchor.setText('Register')
        this.registerAnchor = registerAnchor
        span.add(registerAnchor)

        const orText = new Text()
        orText.setText(' or ')
        span.add(orText)

        const loginAnchor = new Anchor()
        loginAnchor.setText('Login')
        this.loginAnchor = loginAnchor
        span.add(loginAnchor)
    }

    addRegisterClickListener = function (listener) {
        this.registerAnchor.addClickListener(listener)
    }

    addLoginClickListener = function (listener) {
        this.loginAnchor.addClickListener(listener)
    }
}
