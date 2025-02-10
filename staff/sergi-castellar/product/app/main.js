console.clear();
//console.log("Hello,App!");

/*
crear componentes con el constructor
componentes concretos hijos de constuctor generico

*/

// CONSTRUCTORES
// user
function User(name, email, username, password) {
  this.name = name;
  this.email = email;
  this.username = username;
  this.password = password;
}

// post
function Post(title, img, description) {
  this.title = title;
  this.img = img;
  this.description = description;
}

// component
function Component(tagName) {
  this.container = document.createElement(tagName);
}

Component.prototype.add = function (child) {
  this.container.appendChild(child.container);
};

Component.prototype.remove = function (child) {
  this.container.removeChild(child.container);
};

Component.prototype.addClickListener = function (callback) {
  this.container.addEventListener("click", callback);
};

Component.prototype.setId = function (id) {
  this.container.id = id;
};

// body
function Body() {
  Component.call(this, "body");
}

Body.prototype = Object.create(Component.prototype);
Body.prototype.constructor = Body;

// div
function Div() {
  Component.call(this, "div");
}

Div.prototype = Object.create(Component.prototype);
Div.prototype.constructor = Div;

// form
function Form() {
  Component.call(this, "form");
}

Form.prototype = Object.create(Component.prototype);
Form.prototype.constructor = Form;

Form.prototype.addSubmitListener = function (callback) {
  this.container.addEventListener("submit", callback);
};

// Label
function Label() {
  Component.call(this, "label");
}

Label.prototype = Object.create(Component.prototype);
Label.prototype.constructor = Label;

Label.prototype.setHtmlFor = function (htmlFor) {
  this.container.htmlFor = htmlFor;
};

Label.prototype.setText = function (text) {
  this.container.textContent = text;
};

// Input
function Input() {
  Component.call(this, "input");
}

Input.prototype = Object.create(Component.prototype);
Input.prototype.constructor = Input;

Input.prototype.setType = function (type) {
  this.container.type = type;
};

Input.prototype.setPlaceholder = function (placeholder) {
  this.container.placeholder = placeholder;
};

// Button
function Button() {
  Component.call(this, "button");
}

Button.prototype = Object.create(Component.prototype);
Button.prototype.constructor = Button;

Button.prototype.setForm = function (form) {
  this.container.form = form;
};

Button.prototype.setType = function (type) {
  this.container.type = type;
};

Button.prototype.setText = function (text) {
  this.container.textContent = text;
};

// Heading
function Heading(level) {
  Component.call(this, `h${level}`);
}

Heading.prototype = Object.create(Component.prototype);
Heading.prototype.constructor = Heading;

Heading.prototype.setText = function (text) {
  this.container.textContent = text;
};

// Anchor
function Anchor() {
  Component.call(this, `a`);
}

Anchor.prototype = Object.create(Component.prototype);
Anchor.prototype.constructor = Anchor;

Anchor.prototype.setClass = function (aClass) {
  this.container.className = aClass;
};

Anchor.prototype.setText = function (text) {
  this.container.textContent = text;
};

// Header
function Header() {
  Component.call(this, "header");
}

Header.prototype = Object.create(Component.prototype);
Header.prototype.constructor = Header;

// Article
function Article() {
  Component.call(this, "article");
}

Article.prototype = Object.create(Component.prototype);
Article.prototype.constructor = Article;

// Figure
function Figure() {
  Component.call(this, "figure");
}

Figure.prototype = Object.create(Component.prototype);
Figure.prototype.constructor = Figure;

// Footer
function Footer() {
  Component.call(this, "footer");
}

Footer.prototype = Object.create(Component.prototype);
Footer.prototype.constructor = Footer;

// Section
function Section() {
  Component.call(this, "section");
}

Section.prototype = Object.create(Component.prototype);
Section.prototype.constructor = Section;

// Paragraph
function Paragraph() {
  Component.call(this, "p");
}

Paragraph.prototype = Object.create(Component.prototype);
Paragraph.prototype.constructor = Paragraph;

Paragraph.prototype.setText = function (text) {
  this.container.textContent = text;
};

// Image
function Image() {
  Component.call(this, "img");
}

Image.prototype = Object.create(Component.prototype);
Image.prototype.constructor = Image;

Image.prototype.setSrc = function (src) {
  this.container.src = src;
};

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

//////// Body
var body = new Body();
document.body = body.container;
body.container.style.background = '#e6e6e6'

//////// Landing
function Landing() {
  Component.call(this, "div");

  var logo = new Heading(1);
  logo.setText("Logo");
  this.add(logo);

  var registerOrLogin = new Div();
  this.add(registerOrLogin);

  var registerAnchor = new Anchor();
  registerAnchor.setText("Register");
  registerAnchor.addClickListener(
    function () {
      body.remove(this);
      body.add(register);
    }.bind(this)
  );
  registerOrLogin.add(registerAnchor);

  var orText = document.createTextNode(" or ");
  registerOrLogin.container.appendChild(orText);

  var loginAnchor = new Anchor();
  loginAnchor.setText("Login");
  loginAnchor.addClickListener(
    function () {
      body.remove(this);
      body.add(login);
    }.bind(this)
  );
  registerOrLogin.add(loginAnchor);
}

Landing.prototype = Object.create(Component.prototype);
Landing.prototype.constructor = Landing;

var landing = new Landing();
body.add(landing);

function Register() {
  Component.call(this, "div");

  var logo = new Heading(1);
  logo.setText("Logo");
  this.add(logo);

  var inputForm = new Form();
  inputForm.setId("register-form");
  inputForm.addSubmitListener(
    function (event) {
      event.preventDefault();

      var name = nameInput.container.value;
      var email = emailInput.container.value;
      var username = usernameInput.container.value;
      var password = passwordInput.container.value;

      var user = new User(name, email, username, password);

      //alert(`${user.name} ${user.email} ${user.username} ${user.password}`);
      //console.dir(user);

      body.remove(this);
      body.add(home);
    }.bind(this)
  );
  inputForm.container.style.display = "flex";
  inputForm.container.style.flexDirection = "column";
  this.add(inputForm);

  var nameLabel = new Label();
  nameLabel.setHtmlFor("register-name");
  nameLabel.setText("Name");
  inputForm.add(nameLabel);

  var nameInput = new Input();
  nameInput.setType("text");
  nameInput.setId("register-name");
  nameInput.setPlaceholder('name')
  inputForm.add(nameInput);

  var emailLabel = new Label();
  emailLabel.setHtmlFor("register-email");
  emailLabel.setText("E-mail");
  inputForm.add(emailLabel);

  var emailInput = new Input();
  emailInput.setType("email");
  emailInput.setId("register-email");
  emailInput.setPlaceholder('e-mail')
  inputForm.add(emailInput);

  var usernameLabel = new Label();
  usernameLabel.setHtmlFor("register-username");
  usernameLabel.setText("Username");
  inputForm.add(usernameLabel);

  var usernameInput = new Input();
  usernameInput.setType("text");
  usernameInput.setId("register-username");
  usernameInput.setPlaceholder('username')
  inputForm.add(usernameInput);

  var passwordLabel = new Label();
  passwordLabel.setHtmlFor("register-password");
  passwordLabel.setText("Password");
  inputForm.add(passwordLabel);

  var passwordInput = new Input();
  passwordInput.setType("password");
  passwordInput.setId("register-password");
  passwordInput.setPlaceholder('********')
  inputForm.add(passwordInput);

  inputForm.container.querySelectorAll("input").forEach(function (child) {
    child.style.width = "300px";
  })

  var loginAndRegister = new Div();
  loginAndRegister.container.style.width = '310px'
  loginAndRegister.container.style.marginTop = '15px'
  loginAndRegister.container.style.display = 'flex'
  loginAndRegister.container.style.justifyContent = 'space-between'
  inputForm.add(loginAndRegister);

  var loginAnchor = new Anchor();
  loginAnchor.setText("Login");
  loginAnchor.addClickListener(
    function () {
      body.remove(this);
      body.add(login);
    }.bind(this)
  );
  loginAndRegister.add(loginAnchor);

  var registerButton = new Button();
  registerButton.setType("submit");
  registerButton.setForm("register-form");
  registerButton.setText("Register");
  loginAndRegister.add(registerButton);
}

Register.prototype = Object.create(Component.prototype);
Register.prototype.constructor = Register;
var register = new Register();
//body.add(register)

function Login() {
  Component.call(this, "div");

  var logo = new Heading(1);
  logo.setText("Logo");
  this.add(logo);

  var inputForm = new Form();
  inputForm.setId("login-form");
  inputForm.addSubmitListener(
    function (event) {
      event.preventDefault();

      var username = usernameInput.container.value;
      var password = passwordInput.container.value;

      //alert(username + password);
      //console.log(username, password);

      body.remove(this);
      body.add(home);
    }.bind(this)
  );
  inputForm.container.style.display = 'flex'
  inputForm.container.style.flexDirection = 'column'
  this.add(inputForm);

  var usernameLabel = new Label();
  usernameLabel.setHtmlFor("login-username");
  usernameLabel.setText("Username");
  inputForm.add(usernameLabel);

  var usernameInput = new Input();
  usernameInput.setType("text");
  usernameInput.setId("login-username");
  usernameInput.setPlaceholder('username')
  inputForm.add(usernameInput);

  var passwordLabel = new Label();
  passwordLabel.setHtmlFor("login-password");
  passwordLabel.setText("Password");
  inputForm.add(passwordLabel);

  var passwordInput = new Input();
  passwordInput.setType("password");
  passwordInput.setId("login-password");
  passwordInput.setPlaceholder('********')
  inputForm.add(passwordInput);

  inputForm.container.querySelectorAll("input").forEach(function (child) {
    child.style.width = "300px";
  })

  var registerAndLogin = new Div();
  registerAndLogin.container.style.width = '310px'
  registerAndLogin.container.style.marginTop = '15px'
  registerAndLogin.container.style.display = 'flex'
  registerAndLogin.container.style.justifyContent = 'space-between'
  inputForm.add(registerAndLogin);

  var registerAnchor = new Anchor();
  registerAnchor.setText("Register");
  registerAnchor.addClickListener(
    function () {
      body.remove(this);
      body.add(register);
    }.bind(this)
  );
  registerAndLogin.add(registerAnchor);

  var loginButton = new Button();
  loginButton.setType("submit");
  loginButton.setForm("login-form");
  loginButton.setText("Login");
  registerAndLogin.add(loginButton);
}

Login.prototype = Object.create(Component.prototype);
Login.prototype.constructor = Login;
var login = new Login();
//body.add(login)

function Home() {
  Component.call(this, "div");

  var logo = new Heading(1);
  logo.setText("Logo");
  this.add(logo);

  var postArticleDiv = new Article();
  postArticleDiv.container.style.display = 'flex'
  postArticleDiv.container.style.flexDirection = 'column'
  postArticleDiv.container.style.width = '500px'
  postArticleDiv.container.style.textAlign = 'justify'
  this.add(postArticleDiv);
}

Home.prototype = Object.create(Component.prototype);
Home.prototype.constructor = Home;
var home = new Home();
//body.add(home)

// POST 1
function Post(postTitle, imgSrc, postDescription) {
  Component.call(this, "article");

  this.container.style.width = '400px'

  var header = new Header();
  this.add(header);

  var title = new Heading(2);
  title.setText(postTitle);
  header.add(title);

  var figure = new Figure();
  figure.container.style.display = 'flex'
  figure.container.style.justifyContent = 'center'
  //figure.container.style.width = '300px'
  this.add(figure);

  var image = new Image();
  image.setSrc(`./assets/${imgSrc}`);
  image.container.style.width = '300px'
  figure.add(image);

  var footer = new Footer();
  this.add(footer);

  var iconSection = new Section();
  footer.add(iconSection);

  var likeAnchor = new Anchor();
  likeAnchor.setClass("unliked");
  likeAnchor.setText("🤍");
  likeAnchor.addClickListener(function () {
    if (this.className === "unliked") {
      this.className = "liked";
      this.textContent = "❤️";
    } else if (this.className === "liked") {
      this.className = "unliked";
      this.textContent = "🤍";
    }
  });
  likeAnchor.container.style.cursor = 'pointer'
  iconSection.add(likeAnchor);

  var descriptionP = new Paragraph();
  descriptionP.setText(postDescription)

  descriptionP.container.style.textAlign = 'justify'
  footer.add(descriptionP);
}

const POSTS = [
  {
    title: 'Home Racing shirt',
    image: '1.jpg',
    description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eius tempore amet culpa voluptatibus alias? Mollitia iusto, optio quam libero perspiciatis qui odio minima eos at repudiandae illum, impedit repellat autem, neque temporibus. Molestias sint quo minima saepe assumenda consequatur odio!'
  },
  {
    title: 'Away Racing shirt',
    image: '2.jpg',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati, cupiditate. Ipsum sint dolor dicta, voluptatibus fugiat praesentium quaerat aperiam quidem esse, omnis sit voluptates sequi tempora provident magnam officiis eius architecto blanditiis? Assumenda autem voluptate ex saepe porro eaque earum?'
  },
  {
    title: 'GK Home Racing shirt',
    image: '3.jpg',
    description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cumque, iste! Voluptas temporibus incidunt quaerat! Impedit eius et ad dicta labore omnis quis. Illum deleniti repudiandae velit ducimus vel iure omnis doloremque reiciendis placeat rem sed, explicabo voluptates, minus nobis! Veritatis?'
  },
  {
    title: 'GK Away Racing shirt',
    image: '4.jpg',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos rerum impedit, quae, aspernatur, veritatis debitis sed modi distinctio perspiciatis unde aperiam deserunt assumenda nostrum voluptas quas fuga iusto saepe. Deserunt cumque adipisci ab quod quae consectetur delectus impedit ad ducimus.'
  },
]

Post.prototype = Object.create(Component.prototype);
Post.prototype.constructor = Post;
for (var i = 0; i < POSTS.length; i++) {
  var { title, image, description } = POSTS[i]
  var post = new Post(title, image, description);
  home.add(post);
  //body.add(post); // provisional
}

// aplicar estilos a todos los 'a' independientemente de si estan inicialmente en el DOM o no
const ANCHORS = [...landing.container.querySelectorAll("a"), ...register.container.querySelectorAll("a"), ...login.container.querySelectorAll("a")]

ANCHORS.forEach(function (child) {
  //child.style.color = 'blue'
  child.style.textDecoration = 'underline'
  child.style.fontWeight = 'bold'
  child.style.cursor = 'pointer'
})
