class Register extends Component{
  constructor(){
    super("section");

    this.container.style.display = "flex";
    this.container.style.flexDirection = "column";
    this.container.style.alignItems = "center";
  
    // ========================CREO COMPONENTE DEL LOGO ======================== ========================
    const boxRegisterLogo = new Div();
    boxRegisterLogo.container.style.display = "flex";
    boxRegisterLogo.container.style.flexDirection = "column";
    boxRegisterLogo.container.style.alignItems = "center";
    boxRegisterLogo.container.style.padding = "20px";
    boxRegisterLogo.container.style.marginTop = "20px";
    this.add(boxRegisterLogo);
  
    const logoRegisterLink = new Link();
    logoRegisterLink.container.href = "#";
    logoRegisterLink.container.style.fontSize = "50px";
    logoRegisterLink.container.style.color = "#00d4ff";
    boxRegisterLogo.add(logoRegisterLink);
  
    const logoRegisterIcon = new Icon();
    logoRegisterIcon.container.className = "fa-solid fa-user-secret";
    logoRegisterLink.add(logoRegisterIcon);
  
    // ========================CREO COMPONENTE DEL FORM ======================== ========================
    const form = new Form();
    form.container.style.display = "flex";
    form.container.style.flexDirection = "column";
    form.container.style.alignItems = "center";
  
    form.addSubmitListener(
      function (event) {
        //evito que se ejecute el submit por defecto y refresh de la pagina
        event.preventDefault();
  
        console.log("Register Data Submit");
  
        const name = nameInput.getValue();
        const email = emailInput.getValue();
        const password = passwordInput.getValue();
  
        try {
          logic.registerUser(name, email, password);
  
          form.clear();
  
          this.registerSubmitListener();
        } catch (error) {
          console.error(error);
  
          alert(error.message);
        }
      }.bind(this)
    );
    this.add(form);
  
    const nameInput = new Input();
    nameInput.setType("text");
    nameInput.setPlaceholder("Username");
    nameInput.container.style.margin = "10px";
    nameInput.container.style.border = "2px solid #00d4ff";
    nameInput.container.style.backgroundColor = "#1a1a1a";
    nameInput.container.style.color = "#00d4ff";
    form.add(nameInput);
  
    const emailInput = new Input();
    emailInput.setType("email");
    emailInput.setPlaceholder("E-mail");
    emailInput.container.style.margin = "10px";
    emailInput.container.style.border = "2px solid #00d4ff";
    emailInput.container.style.backgroundColor = "#1a1a1a";
    emailInput.container.style.color = "#00d4ff";
    form.add(emailInput);
  
    const passwordInput = new Input();
    passwordInput.setType("password");
    passwordInput.setPlaceholder("Password");
    passwordInput.container.style.margin = "10px";
    passwordInput.container.style.border = "2px solid #00d4ff";
    passwordInput.container.style.backgroundColor = "#1a1a1a";
    passwordInput.container.style.color = "#00d4ff";
    form.add(passwordInput);
  
    const submitButton = new Button();
    submitButton.setText("Register");
    submitButton.setType("submit");
    submitButton.container.style.margin = "10px";
    submitButton.container.style.border = "2px solid #00d4ff";
    submitButton.container.style.backgroundColor = "#1a1a1a";
    submitButton.container.style.color = "#00d4ff";
    submitButton.container.style.transition = "color 0.3s";
    submitButton.addPointerAndHoverEffects();
    form.add(submitButton);
  
    // ========================CREO COMPONENTE DEL ANCHOR-LOGIN======================== ========================
    const loginAnchor = new Link();
    loginAnchor.setText("Login");
    loginAnchor.container.style.color = "#00d4ff";
    loginAnchor.container.style.textDecoration = "none";
    loginAnchor.container.style.margin = "10px";
    loginAnchor.container.style.transition = "color 0.3s";
    loginAnchor.addPointerAndHoverEffects();
    this.loginAnchor = loginAnchor;
    this.add(loginAnchor);


  }
  // ========================AGREGO LISTENER ======================== ========================
//metodo para agregar un listener al submit del form y que se ejecute la funcion que recibe como parametro
addRegisterSubmitListener(listener) {
  this.registerSubmitListener = listener;
};

//metodo para agregar un listener al click del anchor y que se ejecute la funcion que recibe como parametro
addLandingClickListener(listener) {
  this.loginAnchor.addClickListener(listener);
};
}