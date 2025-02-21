function Login() {
    return <div>
        <h1>Login</h1>
        <form>
            <label>Username</label>
            <input type='text' />
            <label>Password</label>
            <input type='password' />
            <button type='submit'>Login</button>
        </form>
        <a>Register</a>
    </div>
}

/*
class Login extends Component {
    constructor() {
      super ('div')

    this.container.style.display = "flex";
    this.container.style.flexDirection = "column";
    this.container.style.justifyContent = "center";
    this.container.style.alignItems = "center";
    this.container.style.height = "100vh"; // Ocupa toda la pantalla
    this.container.style.backgroundColor = "gray"; // Fondo gris
  
    const logo = new Heading(1);
    logo.setText("Login");
    this.add(logo);
  
    //form

    const form = new Form();
    form.container.style.display = "flex";
    form.container.style.flexDirection = "column";
    form.container.style.gap = "15px";
  
    form.addSubmitListener(event => {
        event.preventDefault();

        const username = usernameInput.getValue();
        const password = passwordInput.getValue();
  
        try {
            logic.loginUser(username, password)

            form.clear()

            this.loginSubmitListener()
        } catch (error) {
            console.error(error)

            alert(error.message)
        }  
      });
    this.add(form);
  
    //username
  
    const usernameLabel = new Label();
    usernameLabel.setText("Username");
    form.add(usernameLabel);
  
    const usernameInput = new Input();
    usernameInput.container.style.width = "200px";
    usernameInput.setType("text");
    form.add(usernameInput);
  
    //password
  
    const passwordLabel = new Label();
    passwordLabel.setText("Password");
    form.add(passwordLabel);
  
    const passwordInput = new Input();
    passwordInput.container.style.width = "200px";
    passwordInput.setType("password");
    form.add(passwordInput);
  
    // submit to LOGIN
  
    const submitButton = new Button();
    submitButton.setText("Login");
    submitButton.container.style.width = "200px";
    submitButton.setType("submit");
    form.add(submitButton);
  
    // anchor to Register
  
    const registerAnchor = new Anchor()
    registerAnchor.setText("Register")
    registerAnchor.addClickListener(() => {
      form.clear()

      this.registerClickListener()
    })
    this.add(registerAnchor)
    }

    addRegisterClickListener(listener) {
      this.registerClickListener = listener
    }

    addLoginSubmitListener(listener) {
      this.loginSubmitListener = listener
    }
}
*/