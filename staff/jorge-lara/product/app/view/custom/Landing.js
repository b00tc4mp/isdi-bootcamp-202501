class Landing extends Component {
    constructor() {
        super('div');

        const logo = new Heading(1);
        logo.setText('Logo');
        this.add(logo);

        const registerAnchor = new Anchor();
        registerAnchor.setText('Register')
        registerAnchor.setCursor('pointer');
        this.registerAnchor = registerAnchor;

        this.add(registerAnchor);

        const loginAnchor = new Anchor();
        loginAnchor.setText('Login');
        loginAnchor.setCursor('pointer');
        loginAnchor.container.style.marginLeft = '25px';
        this.loginAnchor = loginAnchor;

        this.add(loginAnchor);

    }
    addRegisterClickListener(listener) {
        this.registerAnchor.addClickListener(listener);
    }

    addLoginClickListener(listener) {
        this.loginAnchor.addClickListener(listener);
    }
}