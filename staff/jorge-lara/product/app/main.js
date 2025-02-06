console.clear()


function Component(container) {
    this.container = container
}

// LANDING

let landing = new Component(document.createElement('div'))
landing.mount = function () {
    document.body.appendChild(this.container)

    let landingLogo = document.createElement('h1')
    landingLogo.textContent = 'Logo'
    this.container.appendChild(landingLogo)

    //register landing
    let registerAnchor = document.createElement('a');
    registerAnchor.textContent = 'Register'
    registerAnchor.style.cursor = 'pointer'
    registerAnchor.addEventListener('click', function () {
        document.body.removeChild(this.container)
        document.body.appendChild(registerDiv.container)
    }.bind(this))
    this.container.appendChild(registerAnchor);

    //login landing
    let loginAnchor = document.createElement('a');
    loginAnchor.textContent = 'Login'
    loginAnchor.style.cursor = 'pointer'
    loginAnchor.style.marginLeft = '25px'

    loginAnchor.addEventListener('click', function () {
        document.body.removeChild(this.container)
        document.body.appendChild(loginDiv.container)
    }.bind(this))
    this.container.appendChild(loginAnchor);
}


// REGISTER

let registerDiv = new Component(document.createElement('div'));
registerDiv.mount = function () {
    registerDiv.id = 'register_div';

    let registerLogo = document.createElement('h1');
    registerLogo.textContent = 'Logo'
    this.container.appendChild(registerLogo)

    //Form

    let registerForm = document.createElement('form');
    registerForm.style.display = 'flex'
    registerForm.style.flexDirection = 'column'
    registerForm.style.width = '250px'

    registerForm.addEventListener('submit', function (e) {
        e.preventDefault();
        document.body.removeChild(this.container);
        document.body.appendChild(loginDiv.container);

        let registeredUser ={
            name : nameInput.value,
            email : emailInput.value,
            username : usernameInput.value,
            password : passwordInput.value
        }

        console.log(registeredUser)
    }.bind(this))

    this.container.appendChild(registerForm);

    //Name Form
    let nameFormRegisterLabel = document.createElement('label')
    nameFormRegisterLabel.textContent = 'Name'
    registerForm.appendChild(nameFormRegisterLabel);

    let nameInput = document.createElement('input');
    registerForm.appendChild(nameInput);

    //Email form
    let emailFormRegisterLabel = document.createElement('label')
    emailFormRegisterLabel.textContent = 'Email';
    registerForm.appendChild(emailFormRegisterLabel);

    let emailInput = document.createElement('input');
    registerForm.appendChild(emailInput)

    //Username form
    let usernameFormRegisterLabel = document.createElement('label')
    usernameFormRegisterLabel.textContent = 'Username';
    registerForm.appendChild(usernameFormRegisterLabel);

    let usernameInput = document.createElement('input');
    registerForm.appendChild(usernameInput);

    //Password form
    let passwordFormRegisterLabel = document.createElement('label')
    passwordFormRegisterLabel.textContent = 'Password'
    registerForm.appendChild(passwordFormRegisterLabel)

    let passwordInput = document.createElement('input')
    registerForm.appendChild(passwordInput)

    //Div register buttons

    let buttonsFormDivRegister = document.createElement('div')
    buttonsFormDivRegister.style.display = 'flex'
    buttonsFormDivRegister.style.flexDirection = 'row'
    registerForm.appendChild(buttonsFormDivRegister);

    //Login anchor
    let registerLoginAnchor = document.createElement('a');
    registerLoginAnchor.textContent = 'Login'
    registerLoginAnchor.style.cursor = 'pointer'
    buttonsFormDivRegister.appendChild(registerLoginAnchor);

    registerLoginAnchor.addEventListener('click', function () {
        document.body.removeChild(this.container)
        document.body.appendChild(loginDiv.container)
    }.bind(this))

    //Register button
    let registerButton = document.createElement('button');
    registerButton.textContent = 'Register'
    registerButton.style.marginLeft = '50px'
    registerButton.type = 'submit'
    buttonsFormDivRegister.appendChild(registerButton);
}


// LOGIN

let loginDiv = new Component(document.createElement('div'));
loginDiv.mount = function () {
    loginDiv.id = 'login_div'

    let LoginLogo = document.createElement('h1');
    LoginLogo.textContent = 'Logo'
    this.container.appendChild(LoginLogo)

    //form

    let loginForm = document.createElement('form')
    loginForm.style.display = 'flex';
    loginForm.style.flexDirection = 'column';
    loginForm.style.width = '250px';
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();
        document.body.removeChild(this.container)
        document.body.appendChild(homeDiv.container)

        let userLogin  ={
            username : usernameInput.value,
            password : passwordInput.value
        }

        console.log(userLogin)

    }.bind(this))
    this.container.appendChild(loginForm)

    //Login username label
    let loginUsernameLabel = document.createElement('label')
    loginUsernameLabel.textContent = 'Username'
    loginForm.appendChild(loginUsernameLabel)
    let usernameInput = document.createElement('input');
    loginForm.appendChild(usernameInput);

    //Login password label
    let loginPasswordLabel = document.createElement('label');
    loginPasswordLabel.textContent = 'Password';
    loginForm.appendChild(loginPasswordLabel);
    let passwordInput = document.createElement('input')
    loginForm.appendChild(passwordInput)

    //Div login buttons

    let buttonsFormDivLogin = document.createElement('div');
    buttonsFormDivLogin.style.display = 'flex';
    buttonsFormDivLogin.style.flexDirection = 'row';
    loginForm.appendChild(buttonsFormDivLogin);

    //Register anchor
    let loginRegisterAnchor = document.createElement('a');
    loginRegisterAnchor.textContent = 'Register'
    loginRegisterAnchor.style.cursor = 'pointer'
    buttonsFormDivLogin.appendChild(loginRegisterAnchor);

    loginRegisterAnchor.addEventListener('click', function () {
        document.body.removeChild(this.container)
        document.body.appendChild(registerDiv.container)
    }.bind(this))

    //Login button
    let loginButton = document.createElement('button');
    loginButton.textContent = 'Login'
    loginButton.style.marginLeft = '50px';
    loginButton.type = 'submit'
    buttonsFormDivLogin.appendChild(loginButton);
}


// HOME

let homeDiv = new Component(document.createElement('div'));
homeDiv.mount = function () {
    homeDiv.id = 'home_div'
    // homeDiv.style.display = 'flex'
    // homeDiv.style.flexDirection = 'row'
    // homeDiv.style.width = '250px'

    let homeLogo = document.createElement('h1')
    homeLogo.textContent = 'Logo'
    homeLogo.style.width = '32px'
    this.container.appendChild(homeLogo)

    let signOutButton = document.createElement('button')
    signOutButton.textContent = 'Sign out'
    this.container.appendChild(signOutButton)
    signOutButton.addEventListener('click', function () {
        document.body.removeChild(this.container)
        document.body.appendChild(landing.container)
    }.bind(this))

    let postsDiv = document.createElement('div')
    postsDiv.style.display = 'flex'
    postsDiv.style.flexDirection = 'column'
    postsDiv.style.width = '250px'
    this.container.appendChild(postsDiv)

    let postContent = document.createElement('article')
    postsDiv.appendChild(postContent)


    let imgArray = ['https://static.vecteezy.com/system/resources/thumbnails/008/695/917/small_2x/no-image-available-icon-simple-two-colors-template-for-no-image-or-picture-coming-soon-and-placeholder-illustration-isolated-on-white-background-vector.jpg', 'https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg', 'https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM=']
    imgArray.forEach(function (image) {
        let img = document.createElement('img')
        img.src = image
        postContent.appendChild(img)
    })
}


landing.mount();
registerDiv.mount();
loginDiv.mount();
homeDiv.mount();