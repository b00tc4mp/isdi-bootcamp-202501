function Register({ onLoginClick, onRegisterSubmit }) {
    const handleRegisterSubmit = event => {
        event.preventDefault()

        try {
            const { target: form } = event

            const {
                name: { value: name },
                email: { value: email },
                username: { value: username },
                password: { value: password }
            } = form

            logic.registerUser(name, email, username, password)

            form.reset()

            onRegisterSubmit()
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    console.debug('Register -> render')

    return <div>
        <h1>Register</h1>

        <form onSubmit={handleRegisterSubmit}>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" />

            <label htmlFor="email">E-mail</label>
            <input type="email" id="email" />

            <label htmlFor="username">Username</label>
            <input type="text" id="username" />

            <label htmlFor="password">Password</label>
            <input type="password" id="password" />

            <button type="submit">Register</button>
        </form>

        <a onClick={onLoginClick}>Login</a>
    </div>
}


/*
//REGISTER
class Register extends Component {
    constructor() {
      super('div')
      
    this.container.style.display = "flex";
    this.container.style.flexDirection = "column";
    this.container.style.justifyContent = "center";
    this.container.style.alignItems = "center";
    this.container.style.height = "100vh"; // Ocupa toda la pantalla
    this.container.style.backgroundColor = "gray"; // Fondo gris

    const logo = new Heading(1);
    logo.setText("Register");
    this.add(logo);
  
    //form
  
    const form = new Form();
    form.container.style.display = "flex";
    form.container.style.flexDirection = "column";
    form.container.style.gap = "15px";
  
    form.addSubmitListener(event => {
        event.preventDefault();
  
        console.log("register submit");
  
        const name = nameInput.getValue();
        const email = emailInput.getValue();
        const username = usernameInput.getValue();
        const password = passwordInput.getValue();

        try {
          logic.registerUser(name, email, username, password)

          form.clear()

          this.registerSubmitListener()
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
      });
    this.add(form);
  
    //name
  
    const nameLabel = new Label();
    nameLabel.setText("Name");
    form.add(nameLabel);
  
    const nameInput = new Input();
    nameInput.container.style.width = "200px";
    form.add(nameInput);
  
    //email
  
    const emailLabel = new Label();
    emailLabel.setText("E-mail");
    form.add(emailLabel);
  
    const emailInput = new Input();
    emailInput.container.style.width = "200px";
    emailInput.setType("email");
    form.add(emailInput);
  
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
  
    //submit
  
    const submitButton = new Button();
    submitButton.container.style.width = "200px";
    submitButton.setText("Register");
    submitButton.setType("submit");
    form.add(submitButton);
  
    //login button
  
    const loginAnchor = new Anchor();
    loginAnchor.setText("Login");
    loginAnchor.addClickListener(() => {
        form.clear()

        this.loginClickListener()
    })
    this.add(loginAnchor)
  }

  addLoginClickListener(listener) {
    this.loginClickListener = listener
  }

  addLoginSubmit(listener) {
    this.loginClickListener = listener
  }
}
*/