console.clear()

document.body.style.backgroundColor = '#FFD033'
document.body.style.fontFamily = 'nunito'

/*
La función COMPONENT (constructora) se define como un "constructor de objetos" lo que significa que cuando
se crea una nueva instancia ("variable") de Component, se crea un nuevo objeto con una propiedad llamada
CONTAINER. Esta propiedad es un contenedor (en este caso un DIV) que se pasa como argumento al crear el objeto.
*/

function Component(container) {
    this.container = container
}

//LANDING

/*
La variable LANDING es una nueva instancia de COMPONENT y se le pasa un nuevo DIV creado con document.createElement('div')
como el contenedor. A esta nueva instancia, se le agrega un método llamado MOUNT que contiene código para "montar"
el componente DOM (es decir, todo el arbol de elementos de una pagina web)
*/

var landing = new Component(document.createElement('div'))
landing.mount = function () {
    document.body.appendChild(this.container)

    var logo = document.createElement('h1')
    logo.textContent = 'Bee you'
    this.container.appendChild(logo)

    //register button
    /* 
    document.body.removeChild(this.container): esta línea dará error porque el this está dentro de una funcion, 
    por lo que me referenciará a la función de registerButton no a la de Component. Para sacar el this de la 
    función y que se referencie a la otra, utilizamos el método bind.
    */
    var registerButton = document.createElement('button')
    registerButton.textContent = 'Register'
    registerButton.addEventListener('click', function () {
        document.body.removeChild(this.container)
        document.body.appendChild(register.container)
    }.bind(this))
    this.container.appendChild(registerButton)

    // simple text

    var spaceText = document.createTextNode(' ')
    this.container.appendChild(spaceText)
    var orText = document.createTextNode('or')
    this.container.appendChild(orText)
    var spaceText2 = document.createTextNode(' ')
    this.container.appendChild(spaceText2)

    //login button

    var loginButton = document.createElement('button')
    loginButton.textContent = 'Login'
    loginButton.addEventListener('click', function () {
        document.body.removeChild(this.container)
        document.body.appendChild(login.container)
    }.bind(this))
    this.container.appendChild(loginButton)
}

// REGISTER PAGE

var register = new Component(document.createElement('div'))
register.mount = function () {
    var logo = document.createElement('h1')
    logo.textContent = 'Bee you'
    this.container.appendChild(logo)


    var title = document.createElement('h2')
    title.textContent = 'Create account'
    this.container.appendChild(title)

    //create form

    var form = document.createElement('form')
    //creamos este addEventListener para crear un boton submit
    form.addEventListener('submit', function (event) {
        debugger
        event.preventDefault()  //evita el envio por defecto del formulario

        var name = nameInput.value
        var username = usernameInput.value
        var password = passwordInput.value
        var email = emailInput.value

        console.log(name, username, password, email)

    })
    this.container.appendChild(form)


    //name

    var nameLabel = document.createElement('label')
    nameLabel.textContent = 'Name'
    form.appendChild(nameLabel)

    var br = document.createElement('br')
    form.appendChild(br)

    var nameInput = document.createElement('input')
    form.appendChild(nameInput)

    var br = document.createElement('br')
    form.appendChild(br)

    //username

    var usernameLabel = document.createElement('label')
    usernameLabel.textContent = 'Username'
    form.appendChild(usernameLabel)

    var br = document.createElement('br')
    form.appendChild(br)

    var usernameInput = document.createElement('input')
    form.appendChild(usernameInput)

    var br = document.createElement('br')
    form.appendChild(br)

    //password

    var passwordLabel = document.createElement('label')
    passwordLabel.textContent = 'Password'
    form.appendChild(passwordLabel)

    var br = document.createElement('br')
    form.appendChild(br)

    var passwordInput = document.createElement('input')
    form.append(passwordInput)

    var br = document.createElement('br')
    form.appendChild(br)

    //email

    var emailLabel = document.createElement('label')
    emailLabel.textContent = 'Email'
    form.appendChild(emailLabel)

    var br = document.createElement('br')
    form.appendChild(br)

    var emailInput = document.createElement('input')
    form.appendChild(emailInput)

    var br = document.createElement('br')
    form.appendChild(br)

    //return button 

    var returnButton = document.createElement('button')
    returnButton.textContent = 'Return'
    returnButton.addEventListener('click', function () {
        document.body.removeChild(this.container)
        document.body.appendChild(landing.container)
    }.bind(this))
    form.appendChild(returnButton)


    var spaceBetweenButton = document.createTextNode(' ')
    form.appendChild(spaceBetweenButton)

    //register button

    var button = document.createElement('button')
    button.textContent = 'Register'
    form.appendChild(button)
}

//LOGIN PAGE

var login = new Component(document.createElement('div'))
login.mount = function () {

    //logo

    var logo = document.createElement('h1')
    logo.textContent = 'Bee You'
    this.container.appendChild(logo)

    //title

    var title = document.createElement('h2')
    title.textContent = 'Login'
    this.container.appendChild(title)

    // create form

    var form = document.createElement('form')
    form.addEventListener('submit', function (event) {
        debugger
        event.preventDefault()

        var username = usernameInput.value
        var password = passwordInput.value

        console.log(username, password)
    })
    this.container.appendChild(form)

    //username

    var usernameLabel = document.createElement('label')
    usernameLabel.textContent = 'Username'
    form.appendChild(usernameLabel)

    var br = document.createElement('br')
    form.appendChild(br)

    var usernameInput = document.createElement('input')
    form.appendChild(usernameInput)

    var br = document.createElement('br')
    form.appendChild(br)

    //password

    var passwordLabel = document.createElement('label')
    passwordLabel.textContent = 'Password'
    form.appendChild(passwordLabel)

    var br = document.createElement('br')
    form.appendChild(br)

    var passwordInput = document.createElement('input')
    form.appendChild(passwordInput)

    var br = document.createElement('br')
    form.appendChild(br)

    //return button

    var returnButton = document.createElement('button')
    returnButton.textContent = 'Return'
    returnButton.addEventListener('click', function () {
        document.body.removeChild(this.container)
        document.body.appendChild(landing.container)
    }.bind(this))
    form.appendChild(returnButton)

    var spaceBetweenButton = document.createTextNode(' ')
    form.appendChild(spaceBetweenButton)

    //login button

    var button = document.createElement('button')
    button.textContent = 'Login'
    form.appendChild(button)

}



// HOMEPAGE

var home = new Component(document.createElement('div'))
home.mount = function () {

    var logo = document.createElement('h1')
    logo.textContent = 'Bee You'
    this.container.appendChild(logo)

    //HOME FIRST POST

    var firstPost = document.createElement('article')
    this.container.appendChild(firstPost)

    var firstPostName = document.createElement('h3')
    firstPostName.textContent = 'name1'
    firstPost.appendChild(firstPostName)


    var squareImg = document.createElement('div')
    this.container.appendChild(squareImg)

    squareImg.style.width = '200px'
    squareImg.style.height = '200px'
    squareImg.style.overflow = 'hidden'

    var firstPostPicture = document.createElement('img')
    firstPostPicture.src = 'https://imgs.search.brave.com/2EcBw2UdTyJRdsx6Gp7xfBHA0A1__0QFLtCgvSXM8HE/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9jaGlj/YS1lbi1waWNvLWRl/LW1vbnRhJUMzJUIx/YS1taXJhbmRvLWhl/cm1vc2FzLW1vbnRh/JUMzJUIxYXMtYWwt/YXRhcmRlY2VyLWNv/bi1oaWVyYmEtdmVy/ZGUtaGVybW9zby12/YWxsZS1uaWVibGEt/dmVyYW5vLXBhaXNh/amUtbXVqZXItam92/ZW4tMjEyMzQyMDQ4/LmpwZw'

    firstPostPicture.style.width = '50%'
    firstPostPicture.style.height = '75%'
    firstPostPicture.style.objectFit = 'cover'
    firstPostPicture.style.objectPosition = 'top'

    squareImg.appendChild(firstPostPicture)

    // HOME SECOND POST

    var secondPost = document.createElement('article')
    this.container.appendChild(secondPost)

    var secondPostName = document.createElement('h3')
    secondPostName.textContent = 'name2'
    secondPost.appendChild(secondPostName)

    var squareImg2 = document.createElement('div')
    this.container.appendChild(squareImg2)

    squareImg2.style.width = '200px'
    squareImg2.style.height = '200px'
    squareImg2.style.overflow = 'hidden'

    var secondPostPicture = document.createElement('img')
    secondPostPicture.src = 'https://imgs.search.brave.com/IECfcLf6yGbgIjkrA3ODeCopIIl7bBMn9KCd8-fWCn8/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAxNi8x/MS8yMy8xNS8xNC9i/ZWFjaC0xODUzNDQy/XzY0MC5qcGc'

    secondPostPicture.style.width = '50%'
    secondPostPicture.style.height = '75%'
    secondPostPicture.style.objectFit = 'cover'
    secondPostPicture.style.objectPosition = 'top'

    squareImg2.appendChild(secondPostPicture)

    //logout button

    var logOutButton = document.createElement('button')
    logOutButton.textContent = 'Logout'

    logOutButton.addEventListener('click', function () {
        document.body.removeChild(this.container)
        document.body.appendChild(login.container)
    }.bind(this))
    this.container.appendChild(logOutButton)
}

landing.mount()
register.mount()
login.mount()
home.mount()

