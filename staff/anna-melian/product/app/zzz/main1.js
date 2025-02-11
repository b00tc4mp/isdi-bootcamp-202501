console.clear()

function Component(tagName) {
    this.container = document.createElement(tagName)
}

Component.prototype.add = function (child) {
    this.container.appendChild(child.container)
}

Component.prototype.remove = function (child) {
    this.container.removeChild(child.container)
}

Component.prototype.addClickListener = function (callback) {
    this.container.addEventListener('click', callback)
}

function Form() {
    Component.call(this, 'form')
}

Form.prototype = Object.create(Component.prototype)
Form.prototype.constructor = Form

Form.prototype.addSubmitListener = function (callback) {
    this.container.addEventListener('submit', callback)
}

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

Label.prototype.setText = function (text) {
    this.container.textContent = text
}

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

function Span() {
    Component.call(this, 'span')
}

Span.prototype = Object.create(Component.prototype)
Span.prototype.constructor = Span

function Img() {
    Component.call(this, 'img')
}

Img.prototype = Object.create(Component.prototype)
Img.prototype.constructor = Img


function Post(username, imgAdress, date) {
    Component.call(this, 'div')
    this.container.style.marginTop = '50px'
    this.container.style.background = 'lightblue'
    this.Username(username)
    this.Img(imgAdress)
    this.Caption()
    this.Date(date)
}

Post.prototype = Object.create(Component.prototype)
Post.prototype.constructor = Post

Post.prototype.Username = function (userName) {
    var userPost = new Heading(7)
    userPost.container.style.fontWeight = 'bold'
    userPost.setText(userName)
    this.add(userPost)
}

Post.prototype.Img = function (img) {
    var userImg = new Img()
    userImg.container.src = img
    userImg.container.style.width = '500px'
    userImg.container.style.height = '300px'
    userImg.container.style.display = 'block'
    this.add(userImg)
}

Post.prototype.Caption = function () {
    var caption = new Span()
    caption.container.style.display = 'flex'
    caption.container.style.justifyContent = 'space-between'
    caption.container.style.marginBottom = '25px'

    var captionText = new Heading(7)
    captionText.setText('Caption')
    caption.add(captionText)
    var like = new Button()
    like.setText('🤍')
    like.addClickListener(function () {
        like.container.innerText = like.container.innerText === '🤍' ? '💙' : '🤍'
    })
    caption.add(like)
    this.add(caption)
}

Post.prototype.Date = function (time) {
    var date = new Heading(7)
    date.setText(time)
    this.add(date)
}


function Body() {
    Component.call(this, 'body')
}

Body.prototype = Object.create(Component.prototype)
Body.prototype.constructor = Body


// body

const body = new Body()
document.body = body.container


body.container.style.background = 'lightcyan'
body.container.style.placeItems = 'center'


// landing

function Landing() {
    Component.call(this, 'div')

    this.container.style.textAlign = 'center'

    var logo = new Heading(1)
    this.add(logo)
    logo.setText('Logo')

    var registerAnchor = new Anchor()
    registerAnchor.addClickListener(function () {
        body.remove(this)
        body.add(register)
    }.bind(this))
    this.add(registerAnchor)

    registerAnchor.setText('Register')

    var orText = new Heading(4)
    orText.setText(' or ')
    this.add(orText)

    var loginAnchor = new Anchor()

    loginAnchor.addClickListener(function () {
        body.remove(this)
        body.add(login)
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

    form.addSubmitListener(function (event) {
        event.preventDefault()

        console.log('register submit')

        var name = formNameInput.container.value
        var email = formEmailInput.container.value
        var username = formUsernameInput.container.value
        var password = formPasswordInput.container.value

        console.log(name, email, username, password)

        body.remove(register)
        body.add(login)

    })

    this.add(form)

    //name
    var formNameLabel = new Label()
    form.add(formNameLabel)
    formNameLabel.setText('Name')

    var formNameInput = new Input()
    form.add(formNameInput)
    formNameInput.setType('Name')

    // email
    var formEmailLabel = new Label()
    form.add(formEmailLabel)
    formEmailLabel.setText('E-mail')

    var formEmailInput = new Input()
    formEmailInput.setType('E-mail')
    form.add(formEmailInput)

    // username

    var formUsernameLabel = new Label()
    form.add(formUsernameLabel)

    formUsernameLabel.setText('Username')

    var formUsernameInput = new Input()
    formUsernameInput.setType('Username')
    form.add(formUsernameInput)

    // password

    var formPasswordLabel = new Label()
    form.add(formPasswordLabel)
    formPasswordLabel.setText('Password')

    var formPasswordInput = new Input()
    formPasswordInput.setType('Password')
    form.add(formPasswordInput)

    // submit botton
    var formSubmitButton = new Button()
    form.add(formSubmitButton)
    formSubmitButton.setText('Create new account')

    // anchor 

    var loginAnchor = new Anchor()
    loginAnchor.setText('Login')

    loginAnchor.addClickListener(function () {
        body.remove(this)
        body.add(login)
    }.bind(this))
    this.add(loginAnchor)
}

Register.prototype = Object.create(Component.prototype)
Register.prototype.constructor = Register

var register = new Register()



/* login */
function Login() {
    Component.call(this, 'div')
    var logo = new Heading(1)
    this.add(logo)
    logo.setText('Logo')

    var intructions = new Heading(4)
    this.add(intructions)
    intructions.setText('To login enter your credentials.')

    // form

    var form = new Form()

    form.addSubmitListener(function (event) {
        event.preventDefault()

        console.log('login submit')

        var username = formUsernameInput.container.value
        var password = formPasswordInput.container.value

        console.log(username, password)

        body.remove(login)
        body.add(home)
    })

    this.add(form)

    // username

    var formUsernameLabel = new Label()
    form.add(formUsernameLabel)
    formUsernameLabel.setText('Username')

    var formUsernameInput = new Input()
    formUsernameInput.setType('Username')
    form.add(formUsernameInput)

    // password

    var formPasswordLabel = new Label()
    form.add(formPasswordLabel)

    formPasswordLabel.setText('Password')

    var formPasswordInput = new Input()
    formPasswordInput.setType('Password')
    form.add(formPasswordInput)

    // submit button

    var formSubmitButton = new Button()
    form.add(formSubmitButton)
    formSubmitButton.setText('Login')

    // anchor

    var registerAnchor = new Anchor()
    registerAnchor.setText('Register')

    registerAnchor.addClickListener(function () {
        body.remove(login)
        body.add(register)
    })
    this.add(registerAnchor)
}

Login.prototype = Object.create(Component.prototype)
Login.prototype.constructor = Login

var login = new Login()

//home

function Home() {
    Component.call(this, 'div')
    var logo = new Heading(1)
    this.add(logo)

    logo.setText('Logo')

    var containerTop = new Span()
    containerTop.container.style.display = 'flex'
    containerTop.container.style.marginTop = '30px'
    containerTop.container.style.justifyContent = 'space-between'
    this.add(containerTop)

    var greeting = new Heading(3)
    greeting.setText('Hello User!')
    containerTop.add(greeting)

    var exitButton = new Button()
    containerTop.add(exitButton)

    exitButton.setText('Exit')

    exitButton.addClickListener(function () {
        body.remove(home)
        body.add(landing)
    })

    var post1 = new Post('username1', 'https://imgs.search.brave.com/gLe1nNepyk97sd_4fBikHFr8rWHTdPIChvqye9jikaU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvNjc1/MjU4NDEyL2VzL2Zv/dG8vYm9zcXVlLWRl/LXNlY3VveWFzLmpw/Zz9zPTYxMng2MTIm/dz0wJms9MjAmYz1y/NXZqRjRkSWhnVkdo/aXFUMFhmV2Z0MUVa/SFU1X1hwZnJndTky/QUk5SWFjPQ', '6 hour ago')
    this.add(post1)

    var post2 = new Post('username2', 'https://imgs.search.brave.com/Cnh02OiyfEeEPUHV_Tc2KU6AN48vRUngZI01EopI4XE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cmV2aXN0YW94aWdl/bm8uZXMvdXBsb2Fk/cy9zMS85Ni85Ny84/Ny8zL3J1dGFzLWNv/bi10b2RvLWVsLWVz/cGxlbmRvci1kZWwt/b3Rvbm8tZW4tbGEt/cHJvdmluY2lhLWRl/LWxlb24uanBlZw', '3 days ago')
    this.add(post2)

    var post3 = new Post('username3', 'https://imgs.search.brave.com/2T65C8AIVGMdeWWfmDLdz3T-jDOaI_iqKbmnBnw3zXs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTM4/MzQyNTA4Ni9lcy9m/b3RvL3NlbmRlcm8t/bSVDMyVBMWdpY28t/ZGVsLWJvc3F1ZS15/LXQlQzMlQkFuZWwt/ZGUtJUMzJUExcmJv/bGVzLWFsLWFtYW5l/Y2VyLWVuLXByaW1h/dmVyYS5qcGc_cz02/MTJ4NjEyJnc9MCZr/PTIwJmM9TFE5R1VX/MTctclV2dkhKampn/eGZ2VS1yMlZ2UDJl/eFRyT21kcFNFQlA4/Zz0', '2 weeks ago')
    this.add(post3)

    var post4 = new Post('username4', 'https://imgs.search.brave.com/U4-w0Zr88dLLLn8MpUKZX5VMd36FmA8leGiN0nwKuIU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTE4/ODEwODQ0L2VzL2Zv/dG8vbHV6LWEtdHJh/diVDMyVBOXMtZGUt/Ym9zcXVlLmpwZz9z/PTYxMng2MTImdz0w/Jms9MjAmYz12RDZi/TzFILU9YWEp3WWRO/c2xEYXB4TzNhZkJk/MzJLRkVQUnpXeC1Y/ZUVvPQ', '1 month ago')
    this.add(post4)
}

Home.prototype = Object.create(Component.prototype)
Home.prototype.constructor = Home

var home = new Home()
