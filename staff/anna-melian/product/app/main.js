console.clear()
document.body.style.background = 'lightcyan'
document.body.style.placeItems = 'center'

function Component(tagName) {
    this.container = document.createElement(tagName)
}


Component.prototype.add = function (child) {
    this.container.appendChild(child.container)
}

Component.prototype.addClickListener = function (callback) {
    this.container.addEventListener('click', callback)
}

function Form() {
    Component.call(this, 'form')
}


Form.prototype = Object.create(Component.prototype)
Form.prototype.constructor = Form

function Input() {
    Component.call(this, 'input')
}


Input.prototype = Object.create(Component.prototype)
Input.prototype.constructor = Input

function Label() {
    Component.call(this, 'label')
}

Label.prototype = Object.create(Component.prototype)
Label.prototype.constructor = Label

Input.prototype.setType = function (type) {
    this.container.type = type
}

Input.prototype.setPlaceHolder = function (placeholder) {
    this.container.placeholder = placeholder
}


function Button() {
    Component.call(this, 'button')
}

Button.prototype = Object.create(Component.prototype)
Button.prototype.constructor = Button

Button.prototype.setType = function (type) {
    this.container.type = type
}


Button.prototype.setText = function (text) {
    this.container.textContent = text
}

function Heading(level) {
    Component.call(this, 'h' + level)
}

Heading.prototype = Object.create(Component.prototype)
Heading.prototype.constructor = Heading

Heading.prototype.setText = function (text) {
    this.container.textContent = text
}


function Anchor() {
    Component.call(this, 'a')
}

Anchor.prototype = Object.create(Component.prototype)
Anchor.prototype.constructor = Anchor

Anchor.prototype.setText = function (text) {
    this.container.textContent = text
}

function Body() {
    Component.call(this, 'body')
}

Body.prototype = Object.create(Component.prototype)
Body.prototype.constructor = Body


// body

const body = new Body()
document.body = body.container



// landing

function Landing() {
    Component.call(this, 'div')

    this.container.style.textAlign = 'center'

    var logo = new Heading(1)
    this.add(logo)
    logo.setText('Logo')


    var registerAnchor = new Anchor()
    registerAnchor.addClickListener(function () {
        document.body.removeChild(this.container)
        document.body.appendChild(register.container)
    }.bind(this))
    this.add(registerAnchor)

    registerAnchor.setText('Register')

    var orText = document.createTextNode(' or ')
    this.container.appendChild(orText)

    var loginAnchor = new Anchor()


    loginAnchor.addClickListener(function () {
        document.body.removeChild(this.container)
        document.body.appendChild(login.container)
    }.bind(this))
    this.add(loginAnchor)

    loginAnchor.setText('Login')
}

Landing.prototype = Object.create(Component.prototype)
Landing.prototype.constructor = Landing

var landing = new Landing()
body.add(landing)


/* register */
function Register() {
    Component.call(this, 'div')
    var logo = new Heading(1)
    this.add(logo)
    logo.setText('Logo')

    var intructions = new Heading(4)
    this.add(intructions)
    intructions.setText('To register, enter the following information. ')

    // from

    var form = new Form()

    this.container.addEventListener('submit', function (event) {
        event.preventDefault()

        console.log('register submit')

        var name = formNameInput.value
        var email = formEmailInput.value
        var username = formUsernameInput.value
        var password = formPasswordInput.value

        console.log(name, email, username, password)

        document.body.removeChild(this.container)
        document.body.appendChild(login.container)
    }.bind(this))
    this.add(form)

    //name
    var formNameLabel = document.createElement('label')
    this.container.appendChild(formNameLabel)
    form.textContent = 'Name'

    var formNameInput = new Input()
    form.bind(this).container.appendChild(formNameInput)

    // email
    var formEmailLabel = new Label()
    form.appendChild(formEmailLabel)
    formEmailLabel.setText('E-mail')

    var formEmailInput = new Input()
    form.appendChild(formEmailInput)

    // username

    var formUsernameLabel = new Label()
    form.appendChild(formUsernameLabel)

    formUsernameLabel.setText('Username')

    var formUsernameInput = new Input()
    form.appendChild(formUsernameInput)

    // password

    var formPasswordLabel = new Label()
    form.appendChild(formPasswordLabel)
    formPasswordLabel.setText('Password')

    var formPasswordInput = new Input()
    form.appendChild(formPasswordInput)

    // submit botton
    var formSubmitButton = new Button()
    form.appendChild(formSubmitButton)
    formSubmitButton.setText('Create new account')

    // anchor 

    var loginAnchor = new Anchor()
    loginAnchor.style.textDecoration = 'underline'
    loginAnchor.setText('Login')

    loginAnchor.addClickListener(function () {
        document.body.removeChild(this.container)
        document.body.appendChild(login.container)
    }.bind(this))
    this.add(loginAnchor)
}

Register.prototype = Object.create(Component.prototype)
Register.prototype.constructor = register

var register = new Register()



/* login */

var login = new Component(document.createElement('div'))
login.mount = function () {
    var logo = document.createElement('h1')
    this.container.appendChild(logo)
    logo.textContent = 'Logo'

    var intructions = document.createElement('p')
    this.container.appendChild(intructions)
    intructions.textContent = 'To login enter your credentials.'

    // form

    var form = document.createElement('form')
    form.style.display = 'flex'
    form.style.gap = '15px'
    form.style.flexDirection = 'column'

    form.addEventListener('submit', function (event) {
        event.preventDefault()

        console.log('login submit')

        var username = formUsernameInput.value
        var password = formPasswordInput.value

        console.log(username, password)

        document.body.removeChild(login.container)
        document.body.appendChild(home.container)
    })

    this.container.appendChild(form)

    // username

    var formUsernameLabel = document.createElement('label')
    form.appendChild(formUsernameLabel)

    formUsernameLabel.textContent = 'Name'

    var formUsernameInput = document.createElement('input')
    form.appendChild(formUsernameInput)

    // password

    var formPasswordLabel = document.createElement('label')
    form.appendChild(formPasswordLabel)

    formPasswordLabel.textContent = 'Password'

    var formPasswordInput = document.createElement('input')
    form.appendChild(formPasswordInput)

    // submit

    var formSubmitButton = document.createElement('button')
    form.appendChild(formSubmitButton)

    formSubmitButton.textContent = 'Login'

    // anchor

    var registerAnchor = document.createElement('a')
    registerAnchor.style.textDecoration = 'underline'
    registerAnchor.textContent = 'Register'

    registerAnchor.addEventListener('click', function () {
        document.body.removeChild(login.container)
        document.body.appendChild(register.container)
    }.bind(this))
    this.container.appendChild(registerAnchor)
}

/* home */

var home = new Component(document.createElement('div'))
home.mount = function () {

    var logo = document.createElement('h1')
    this.container.appendChild(logo)

    logo.textContent = 'Logo'

    var containerTop = document.createElement('span')
    containerTop.style.display = 'flex'
    containerTop.style.marginTop = '30px'
    containerTop.style.justifyContent = 'space-between'
    this.container.appendChild(containerTop)

    var greeting = document.createTextNode('Hello, User!')
    containerTop.appendChild(greeting)

    var exitButton = document.createElement('button')
    containerTop.appendChild(exitButton)

    exitButton.textContent = 'Exit'

    exitButton.addEventListener('click', function () {
        document.body.removeChild(home.container)
        document.body.appendChild(landing.container)
    })

    // component post
    function Post(container, userName, imgAdress, date) {
        this.container = container
        this.userName = userName
        this.imgAdress = imgAdress
        this.date = date
        this.structure = function () {
            home.container.appendChild(this.container)

            this.container.style.background = 'lightblue'
            this.container.style.marginTop = '50px'
            this.container.style.width = '500px'

            var postUserName = document.createElement('p')
            postUserName.style.fontWeight = 'bold'
            this.container.appendChild(postUserName)

            postUserName.textContent = this.userName

            var postPhoto = document.createElement('img')
            postPhoto.src = this.imgAdress
            postPhoto.style.width = '500px'
            postPhoto.style.display = 'block'
            this.container.appendChild(postPhoto)

            var postPhotoCaption = document.createElement('span')
            postPhotoCaption.style.display = 'flex'
            postPhotoCaption.style.justifyContent = 'space-between'
            postPhotoCaption.style.width = '500px'
            this.container.appendChild(postPhotoCaption)

            var postPhotoCaptionText = document.createTextNode('Caption')
            postPhotoCaption.appendChild(postPhotoCaptionText)

            var postPhotoCaptionLikeButton = document.createElement('button')
            postPhotoCaption.appendChild(postPhotoCaptionLikeButton)

            var postPhotoCaptionLikeButtonWhite = document.createTextNode('🤍')
            postPhotoCaptionLikeButton.appendChild(postPhotoCaptionLikeButtonWhite)

            var postPhotoCaptionLikeButtonRed = document.createTextNode('💙')

            var postLike = false
            postPhotoCaptionLikeButton.addEventListener('click', function () {
                if (!postLike) {
                    postPhotoCaptionLikeButton.removeChild(postPhotoCaptionLikeButtonWhite)
                    postPhotoCaptionLikeButton.appendChild(postPhotoCaptionLikeButtonRed)
                    postLike = true
                }
                else {
                    postPhotoCaptionLikeButton.removeChild(postPhotoCaptionLikeButtonRed)
                    postPhotoCaptionLikeButton.appendChild(postPhotoCaptionLikeButtonWhite)
                    postLike = false
                }
            })

            var postPhotoCaptionDate = document.createElement('p')
            this.container.appendChild(postPhotoCaptionDate)

            postPhotoCaptionDate.textContent = date
        }
        this.structure()
    }

    // post1
    var post1 = new Post(document.createElement('div'), 'username1', 'https://imgs.search.brave.com/gLe1nNepyk97sd_4fBikHFr8rWHTdPIChvqye9jikaU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvNjc1/MjU4NDEyL2VzL2Zv/dG8vYm9zcXVlLWRl/LXNlY3VveWFzLmpw/Zz9zPTYxMng2MTIm/dz0wJms9MjAmYz1y/NXZqRjRkSWhnVkdo/aXFUMFhmV2Z0MUVa/SFU1X1hwZnJndTky/QUk5SWFjPQ', '6 hour ago')

    // post 2
    var post2 = new Post(document.createElement('div'), 'username2', 'https://imgs.search.brave.com/Cnh02OiyfEeEPUHV_Tc2KU6AN48vRUngZI01EopI4XE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cmV2aXN0YW94aWdl/bm8uZXMvdXBsb2Fk/cy9zMS85Ni85Ny84/Ny8zL3J1dGFzLWNv/bi10b2RvLWVsLWVz/cGxlbmRvci1kZWwt/b3Rvbm8tZW4tbGEt/cHJvdmluY2lhLWRl/LWxlb24uanBlZw', '3 days ago')


    // post 3
    var post3 = new Post(document.createElement('div'), 'username3', 'https://imgs.search.brave.com/2T65C8AIVGMdeWWfmDLdz3T-jDOaI_iqKbmnBnw3zXs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTM4/MzQyNTA4Ni9lcy9m/b3RvL3NlbmRlcm8t/bSVDMyVBMWdpY28t/ZGVsLWJvc3F1ZS15/LXQlQzMlQkFuZWwt/ZGUtJUMzJUExcmJv/bGVzLWFsLWFtYW5l/Y2VyLWVuLXByaW1h/dmVyYS5qcGc_cz02/MTJ4NjEyJnc9MCZr/PTIwJmM9TFE5R1VX/MTctclV2dkhKampn/eGZ2VS1yMlZ2UDJl/eFRyT21kcFNFQlA4/Zz0', '1 week ago')


    // post 4
    var post4 = new Post(document.createElement('div'), 'username4', 'https://imgs.search.brave.com/U4-w0Zr88dLLLn8MpUKZX5VMd36FmA8leGiN0nwKuIU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTE4/ODEwODQ0L2VzL2Zv/dG8vbHV6LWEtdHJh/diVDMyVBOXMtZGUt/Ym9zcXVlLmpwZz9z/PTYxMng2MTImdz0w/Jms9MjAmYz12RDZi/TzFILU9YWEp3WWRO/c2xEYXB4TzNhZkJk/MzJLRkVQUnpXeC1Y/ZUVvPQ', '2 month ago')

}


login.mount()
home.mount()
