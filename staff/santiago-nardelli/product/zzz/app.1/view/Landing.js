class Landing extends Component {
  constructor() {
    super("section");
    this.container.style.display = "flex";
    this.container.style.flexDirection = "column";
    this.container.style.alignItems = "center";

    //========================================== Crear contenedor para el logo=============================================================S1
    const boxLogo = new Div();
    boxLogo.container.style.display = "flex";
    boxLogo.container.style.flexDirection = "column";
    boxLogo.container.style.alignItems = "center";
    boxLogo.container.style.padding = "20px";
    boxLogo.container.style.marginTop = "20px";
    this.add(boxLogo);

    const logoLink = new Link();
    logoLink.container.href = "#";
    logoLink.container.style.fontSize = "50px";
    logoLink.container.style.color = "#00d4ff";
    boxLogo.add(logoLink);

    const logoIcon = new Icon();
    logoIcon.container.className = "fa-solid fa-user-secret";
    logoLink.add(logoIcon);

    //============================================ Crear contenedor para los inputs FORM=========================================================S1
    const form = new Form();
    form.container.style.display = "flex";
    form.container.style.flexDirection = "column";
    form.container.style.alignItems = "center";
    form.container.style.marginTop = "20px";
    form.addSubmitListener(
      function (event) {
        //evito que la pagina se refresque al enviar el formulario
        event.preventDefault();

        console.log("Formulario enviado");

        //guardo los valores de los inputs en variables, estos o=los obtengo gracias al evento que se dispara al enviar el formulario y el get value de los inputs
        const email = inputEmail.getValue();
        const password = inputPassword.getValue();

        try {
          //llamo a la funcion de login del logic, pasandole los valores de los inputs
          logic.loginUser(email, password);

          //limpio el formulario
          form.clear();

          alert("Hi you!");

          //si existe un listener de submit en el form, lo ejecuto
          this.loginSubmitListener();
        } catch (error) {
          console.error(error.message);

          alert(error.message);
        }

        // con el bind lo que logro es que el this que se use en la funcion sea el this de la instancia de Landing no de la funcion que se esta ejecutando
      }.bind(this)
    );
    this.add(form);

    const inputEmail = new Input();
    inputEmail.setType("email");
    inputEmail.setPlaceholder("Enter your email");
    inputEmail.container.style.margin = "10px";
    inputEmail.container.style.border = "2px solid #00d4ff";
    inputEmail.container.style.backgroundColor = "#1a1a1a";
    inputEmail.container.style.color = "#00d4ff";
    form.add(inputEmail);

    const inputPassword = new Input();
    inputPassword.setType("password");
    inputPassword.setPlaceholder("Enter your password");
    inputPassword.container.style.margin = "10px";
    inputPassword.container.style.border = "2px solid #00d4ff";
    inputPassword.container.style.backgroundColor = "#1a1a1a";
    inputPassword.container.style.color = "#00d4ff";
    form.add(inputPassword);

    const buttonLogin = new Button();
    buttonLogin.setType("submit");
    buttonLogin.setText("Login");
    buttonLogin.container.style.margin = "10px";
    buttonLogin.container.style.border = "2px solid #00d4ff";
    buttonLogin.container.style.backgroundColor = "#1a1a1a";
    buttonLogin.container.style.color = "#00d4ff";
    buttonLogin.container.style.transition =
      "background-color 0.3s, color 0.3s";
    form.add(buttonLogin);

    //========================================= Crear contenedor para REGISTER=========================================================S1
    const boxLinks = new Div();
    boxLinks.container.style.display = "flex";
    boxLinks.container.style.flexDirection = "row";
    boxLinks.container.style.alignItems = "center";
    boxLinks.container.style.marginTop = "20px";
    this.add(boxLinks);

    const registerLink = new Link();
    registerLink.setText("Register");
    registerLink.container.href = "#";
    registerLink.container.style.textDecoration = "none";
    registerLink.container.style.fontFamily = "Georgia, serif";
    registerLink.container.style.margin = "10px";
    registerLink.container.style.color = "#00d4ff";
    registerLink.container.style.transition = "color 0.3s";
    this.registerLink = registerLink;
    boxLinks.add(registerLink);
  }

  //agrego un listener al submit del form y que se ejecute la funcion que recibe como parametro la funcion la declaro en el constructor de Landing en el main.js
  addRegisterClickListener(listener) {
    this.registerLink.addClickListener(listener);
  }

  //agrego un listener al submit del form y que se ejecute la funcion que recibe como parametro la funcion la declaro en el constructor de Landing en el main.js
  addLoginSubmitListener(listener) {
    this.loginSubmitListener = listener;
  }
}
