class Landing extends Component{
    constructor() {
      super('div')

      // Aplicar estilos al contenedor principal
    this.container.style.display = "flex";
    this.container.style.flexDirection = "column";
    this.container.style.justifyContent = "center";
    this.container.style.alignItems = "center";
    this.container.style.height = "100vh"; // Ocupa toda la pantalla
    this.container.style.backgroundColor = "gray"; // Fondo gris
  
    const logo = new Heading(1);
    logo.setText("Landing");
    this.add(logo);
  
    const registerAnchor = new Anchor();
    registerAnchor.setText("Register");
   this.registerAnchor = registerAnchor
    this.add(registerAnchor);
  
    const orText = document.createTextNode(" or ");
    this.container.appendChild(orText);
  
    const loginAnchor = new Anchor();
    loginAnchor.setText("Login");
    this.loginAnchor = loginAnchor
    this.add(loginAnchor);

    }

    addRegisterClickListener(listener) {
    this.registerAnchor.addClickListener(listener)
    }

    addLoginClickListener(listener) {
    this.loginAnchor.addClickListener(listener)
    }
}
