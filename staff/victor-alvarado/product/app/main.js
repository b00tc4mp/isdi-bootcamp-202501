console.clear();
console.log('Hello, App!');

function Component(container) {
    this.container = container;
}

Component.prototype.clear = function() {
    this.container.innerHTML = '';
};

function createInput(labelText, type, form) {
    var label = document.createElement('label');
    label.innerText = labelText;
    label.style.display = 'block';
    var input = document.createElement('input');
    input.type = type;
    input.required = true;
    input.style.display = 'block';
    form.appendChild(label);
    form.appendChild(input);
    return input;
}

var container = document.createElement('div');
document.body.appendChild(container);

function showScreen(screen) {
    container.innerHTML = '';
    screens[screen].mount();
}

function Landing(container) {
    Component.call(this, container);
}
Landing.prototype = Object.create(Component.prototype);
Landing.prototype.mount = function() {
    this.clear();
    var title = document.createElement('h1');
    title.textContent = 'Logo';
    this.container.appendChild(title);
    
    var registerLink = document.createElement('a');
    registerLink.href = '#';
    registerLink.textContent = 'Register';
    registerLink.addEventListener('click', function() { showScreen('register'); });
    this.container.appendChild(registerLink);
    
    var spanOr = document.createElement('span');
    spanOr.innerHTML = ' &nbsp;or&nbsp; ';
    this.container.appendChild(spanOr);
    
    var loginLink = document.createElement('a');
    loginLink.href = '#';
    loginLink.textContent = 'Login';
    loginLink.addEventListener('click', function() { showScreen('login'); });
    this.container.appendChild(loginLink);
};

function Register(container) {
    Component.call(this, container);
}
Register.prototype = Object.create(Component.prototype);
Register.prototype.mount = function() {
    this.clear();
    var title = document.createElement('h1');
    title.textContent = 'Register';
    this.container.appendChild(title);
    
    var form = document.createElement('form');
    this.container.appendChild(form);
    
    var nameInput = createInput('Name', 'text', form);
    var emailInput = createInput('E-mail', 'email', form);
    var usernameInput = createInput('Username', 'text', form);
    var passwordInput = createInput('Password', 'password', form);
    
    var registerButton = document.createElement('button');
    registerButton.textContent = 'Register';
    registerButton.type = 'submit';
    form.appendChild(registerButton);
    
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        console.log('User registered:', {
            name: nameInput.value,
            email: emailInput.value,
            username: usernameInput.value,
            password: passwordInput.value
        });
        alert('Usuario registrado correctamente!');
        showScreen('login');
    });
    
    var backButton = document.createElement('button');
    backButton.textContent = 'Back';
    backButton.addEventListener('click', function() { showScreen('landing'); });
    this.container.appendChild(backButton);
};

function Login(container) {
    Component.call(this, container);
}
Login.prototype = Object.create(Component.prototype);
Login.prototype.mount = function() {
    this.clear();
    var title = document.createElement('h1');
    title.textContent = 'Login';
    this.container.appendChild(title);
    
    var form = document.createElement('form');
    this.container.appendChild(form);
    
    var emailInput = createInput('E-mail', 'email', form);
    var passwordInput = createInput('Password', 'password', form);
    
    var loginButton = document.createElement('button');
    loginButton.textContent = 'Login';
    loginButton.type = 'submit';
    form.appendChild(loginButton);
    
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        alert('Bienvenido de nuevo!');
        showScreen('home');
    });
    
    var backButton = document.createElement('button');
    backButton.textContent = 'Back';
    backButton.addEventListener('click', function() { showScreen('landing'); });
    this.container.appendChild(backButton);
};

function Home(container) {
    Component.call(this, container);
}
Home.prototype = Object.create(Component.prototype);
Home.prototype.mount = function() {
    this.clear();
    var title = document.createElement('h1');
    title.textContent = 'Bienvenido al inicio';
    this.container.appendChild(title);
    
    var homeImage = document.createElement('img');
    homeImage.src = 'https://www.dzoom.org.es/wp-content/uploads/2017/07/seebensee-2384369-810x540.jpg';
    homeImage.alt = 'Imagen de un bonito paisaje';
    homeImage.style.width = '600px';
    this.container.appendChild(homeImage);
    
    var homeButton = document.createElement('button');
    homeButton.textContent = 'Volver al inicio';
    homeButton.addEventListener('click', function() { showScreen('landing'); });
    this.container.appendChild(homeButton);
};

var screens = {
    landing: new Landing(container),
    register: new Register(container),
    login: new Login(container),
    home: new Home(container)
};

showScreen('landing');
