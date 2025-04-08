class Landing extends Component {
  constructor() {
    super("div");
    this.setStyle(style.screenStyle);

    const logo = new Header("1", "Logo");
    this.add(logo);

    //const register or login div
    const linkDiv = new Div();
    this.add(linkDiv);

    //const link Register
    const registerLink = new Anchor("Register");
    registerLink.setStyle(style.links);
    this.registerLink = registerLink;
    linkDiv.add(registerLink);

    //or text
    const orText = new Span(" or ");
    orText.setStyle(style.landingSpan);
    linkDiv.add(orText);

    //const link Login
    const loginLink = new Anchor("Login");
    loginLink.setStyle(style.links);
    this.loginLink = loginLink;

    linkDiv.add(loginLink);
  }
  addRegisterClickListener = function (listener) {
    this.registerLink.addClickListener(listener);
  };

  //Hem d'afegir un addLoginClickListener per tal de desacoblar body i login (que està declarada a main) de landing.
  addClickLoginListener = function (listener) {
    this.loginLink.addClickListener(listener);
  };
}
