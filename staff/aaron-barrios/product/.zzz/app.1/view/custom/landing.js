class Landing extends Component {
    constructor() {
        super('div')
        const logo = new Heading(1)
        logo.setText('Logo')
        this.add(logo)

        //SPAN DE ANCHORS 
        const anchorsSpan = new Span()
        anchorsSpan.container.style.display = 'flex'
        anchorsSpan.container.style.justifyContent = 'left'
        anchorsSpan.container.style.gap = '5px'
        this.add(anchorsSpan)

        const registerAnchor = new Anchor()
        registerAnchor.setText('Register')
        registerAnchor.container.style.textDecoration = 'underline' //register.container = div de register
        registerAnchor.container.style.cursor = 'pointer'
        this.registerAnchor = registerAnchor
        anchorsSpan.add(registerAnchor)

        const orText = document.createTextNode('text')
        anchorsSpan.container.appendChild(orText)

        const loginAnchor = new Anchor()
        loginAnchor.setText('Login')
        loginAnchor.container.style.textDecoration = 'underline'
        loginAnchor.container.style.cursor = 'pointer'
        this.loginAnchor = loginAnchor
        anchorsSpan.add(loginAnchor)
    }

    addRegisterClickListener(listener) {
        this.registerAnchor.addClickListener(listener)
    }

    addLoginClickListener(listener) {
        this.loginAnchor.addClickListener(listener)
    }
}
