// ****  LANDING

class Landing extends Component {
    constructor() {
        super('div')


        const logo = new Heading(1) // LLamamos al componete creado
        logo.setText('Landing')
        logo.container.style.textShadow = '2px 2px 3px black'
        this.add(logo)  // Añadimos la constiable logo al contenedor

        // Login
        const loginAnchor = new Anchor()
        loginAnchor.setText('Login')
        console.log(loginAnchor)
        loginAnchor.container.style.textDecoration = 'underline'
        this.loginAnchor = loginAnchor
        this.add(loginAnchor)

        // Or
        const orText = document.createTextNode(' or ')
        this.container.appendChild(orText)
        // orText.container.style.textDecoration = 'underline'

        // Register
        const registerAnchor = new Anchor()
        registerAnchor.setText('Register')
        registerAnchor.container.style.textDecoration = 'underline'
        this.registerAnchor = registerAnchor
        this.add(registerAnchor)
    }

    addRegisterClickListener(listener) {
        this.registerAnchor.addClickListener(listener)
    }

    addLoginClickListener(listener) {
        this.loginAnchor.addClickListener(listener)
    }
}