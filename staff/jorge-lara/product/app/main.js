console.clear()


//Constructor
function Component(tag) {
    this.container = document.createElement(tag);
}

//Element Constructors
function Body() {
    Component.call(this, 'body');
}

Body.prototype = Object.create(Component.prototype);
Body.prototype.constructor = Body;

function Heading(level) {
    Component.call(this, 'h' + level);
}
Heading.prototype = Object.create(Component.prototype);
Heading.prototype.constructor = Heading;

Heading.prototype.setText = function (text) {
    this.container.textContent = text;
};

function Anchor() {
    Component.call(this, 'a');
}
Anchor.prototype = Object.create(Component.prototype);
Anchor.prototype.constructor = Anchor;

Anchor.prototype.setText = function (text) {
    this.container.textContent = text;
};
Anchor.prototype.setCursor = function (cursor){
    this.container.style.cursor = cursor;
}

function Form() {
    Component.call(this, 'form');
}
Form.prototype = Object.create(Component.prototype);
Form.prototype.constructor = Form;

Form.prototype.setOrientation = function(type,orientation){
    this.container.style.display = type;
    this.container.style.flexDirection = orientation
}

function Label() {
    Component.call(this, 'label');
}

Label.prototype = Object.create(Component.prototype);
Label.prototype.container = Label;

Label.prototype.setText = function (text) {
    this.container.textContent = text;
};

function Input() {
    Component.call(this, 'input')
}
Input.prototype = Object.create(Component.prototype);
Input.prototype.container = Input;

Input.prototype.getValue = function () {
    return this.container.value
}

function Span() {
    Component.call(this, 'span');
}

Span.prototype = Object.create(Component.prototype);
Span.prototype.container = Span;

function Button() {
    Component.call(this, 'button');
}
Button.prototype = Object.create(Component.prototype)
Button.prototype.container = Button;

Button.prototype.setText = function (text) {
    this.container.textContent = text;
};

Button.prototype.setType = function (type){
    this.container.type = type
}

function Article(){
    Component.call(this, 'article');
}
Article.prototype = Object.create(Component.prototype);
Article.prototype.container = Article;

Article.prototype.setOrientation = function(type,orientation){
    this.container.style.display = type;
    this.container.style.flexDirection = orientation
}

function Image(){
    Component.call(this, 'img');
}
Image.prototype = Object.create(Component.prototype);
Image.prototype.container = Image;

//Child components
Component.prototype.add = function (child) {
    this.container.appendChild(child.container);
}

Component.prototype.remove = function (child) {
    this.container.removeChild(child.container);
}

Component.prototype.addClickListener = function (callback) {
    this.container.addEventListener('click', callback)
}

Component.prototype.addSubmitListener = function (callback) {
    this.container.addEventListener('submit', callback)
}

//PAGE CONSTRUCTORS //
function Landing() {
    Component.call(this, 'div');

    let logo = new Heading(1);
    logo.setText('Logo');
    this.add(logo);

    let registerAnchor = new Anchor();
    registerAnchor.setText('Register')
    registerAnchor.setCursor('pointer');
    registerAnchor.addClickListener(function () {
        document.body.removeChild(this.container);
        document.body.appendChild(register.container);
    }.bind(this));
    this.add(registerAnchor);


    let loginAnchor = new Anchor();
    loginAnchor.setText('Login');
    loginAnchor.setCursor('pointer');
    loginAnchor.container.style.marginLeft = '25px';
    loginAnchor.addClickListener(function () {
        document.body.removeChild(this.container)
        document.body.appendChild(login.container)
    }.bind(this))
    this.add(loginAnchor)
}
Landing.prototype = Object.create(Component.prototype);
Landing.prototype.constructor = Landing;


function Register() {
    Component.call(this, 'div');

    let logoRegister = new Heading(1);
    logoRegister.setText('Register');
    this.add(logoRegister);

    let registerForm = new Form();
    registerForm.setOrientation('flex','column')
    registerForm.container.style.width = '250px';

    registerForm.addSubmitListener(function (e) {
        e.preventDefault();
        document.body.removeChild(this.container);
        document.body.appendChild(login.container);

        let registeredUser = {
            name: nameInput.getValue(),
            email: emailInput.getValue(),
            username: usernameInput.getValue(),
            password: passwordInput.getValue()
        }

        console.log(registeredUser);
    }.bind(this))
    this.add(registerForm);

    //Name
    let nameLabel = new Label();
    nameLabel.setText('Name');
    registerForm.add(nameLabel);

    let nameInput = new Input();
    registerForm.add(nameInput);

    //Email
    let emailLabel = new Label();
    emailLabel.setText('Email');
    registerForm.add(emailLabel);

    let emailInput = new Input();
    registerForm.add(emailInput);

    //Username
    let usernameLabel = new Label();
    usernameLabel.setText('Username');
    registerForm.add(usernameLabel);

    let usernameInput = new Input();
    registerForm.add(usernameInput);

    //Password
    let passwordLabel = new Label();
    passwordLabel.setText('Password');
    registerForm.add(passwordLabel);

    let passwordInput = new Input();
    registerForm.add(passwordInput);

    //Span buttons
    let spanButtons = new Span();
    registerForm.add(spanButtons)

    let loginAnchor = new Anchor();
    loginAnchor.setText('Login');
    loginAnchor.setCursor('pointer');
    spanButtons.add(loginAnchor);

    loginAnchor.addClickListener(function () {
        document.body.removeChild(this.container)
        document.body.appendChild(login.container)
    }.bind(this))

    let registerButton = new Button();
    registerButton.setText('Register');
    registerButton.setType('submit');
    registerButton.container.style.marginLeft = '50px';
    spanButtons.add(registerButton);


}
Register.prototype = Object.create(Component.prototype);
Register.prototype.constructor = Register;

function Login() {
    Component.call(this, 'div');

    let logo = new Heading(1);
    logo.setText('Login');
    this.add(logo);

    let loginForm = new Form();
    loginForm.setOrientation('flex','column');
    loginForm.container.style.width = '250px';

    loginForm.addSubmitListener(function (e) {
        e.preventDefault();
        document.body.removeChild(this.container);
        document.body.appendChild(home.container);

        let userLogin = {
            username: usernameInput.getValue(),
            password: passwordInput.getValue()
        }

        console.log(userLogin);

    }.bind(this))
    this.add(loginForm);

    //username
    let usernameLabel = new Label();
    usernameLabel.setText('Username');
    loginForm.add(usernameLabel);

    let usernameInput = new Input();
    loginForm.add(usernameInput);

    //password
    let passwordLabel = new Label();
    passwordLabel.setText('Password');
    loginForm.add(passwordLabel);

    let passwordInput = new Input();
    loginForm.add(passwordInput);

    //span buttons
    let spanButtons = new Span();
    loginForm.add(spanButtons);

    //Register
    let registerAnchor = new Anchor();
    registerAnchor.setText('Register');
    registerAnchor.setCursor('pointer');
    spanButtons.add(registerAnchor);

    registerAnchor.addClickListener(function () {
        document.body.removeChild(this.container)
        document.body.appendChild(register.container)
    }.bind(this))

    //Login
    let loginButton = new Button();
    loginButton.setText('Login');
    loginButton.setType('submit');
    loginButton.container.style.marginLeft = '50px';
    spanButtons.add(loginButton);

}
Login.prototype = Object.create(Component.prototype);
Login.prototype.constructor = Login;

function Home(){
    Component.call(this, 'div');

    let logoHome = new Heading(1);
    logoHome.setText('Home');
    this.add(logoHome);

    let signOutButton = new Button();
    signOutButton.setText('Sign out');
    this.add(signOutButton);

    signOutButton.addClickListener(function (){
        document.body.removeChild(this.container);
        document.body.appendChild(landing.container);
    }.bind(this));

    let postContent = new Article();
    postContent.setOrientation('flex','column');
    postContent.container.style.width = '250px';
    this.add(postContent);
    
    let imgArray = ['https://static.vecteezy.com/system/resources/thumbnails/008/695/917/small_2x/no-image-available-icon-simple-two-colors-template-for-no-image-or-picture-coming-soon-and-placeholder-illustration-isolated-on-white-background-vector.jpg', 'https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg', 'https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM=']
    imgArray.forEach(function (image){
        let img = new Image();
        img.container.src = image;
        postContent.add(img);
    }.bind(this))
}
Home.prototype = Object.create(Component.prototype);
Home.prototype.constructor = Home;


// WEBSITE INITIALIZATION //
const body = new Body();
document.body = body.container

let landing = new Landing();
body.add(landing);

let register = new Register();
let login = new Login();
let home = new Home();
