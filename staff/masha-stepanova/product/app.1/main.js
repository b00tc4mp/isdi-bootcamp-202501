
const body = new Body()
body.container = document.body
body.container.style.fontFamily = 'sans-serif'
body.container.style.backgroundSize = 'cover'
body.container.style.backgroundImage = "url('https://imgs.search.brave.com/eVpWbjn73TWzvc2fj025Cfg5iapsH_pxWBSvRjS-2IM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvaGQvbGln/aHQtZ3JlZW4tdGV4/dHVyZS1waG9uZS0x/cXh1NXl1YnM5dm03/ZXBmLmpwZw')"

var landing = new Landing()
landing.container.style.display = 'flex'
landing.container.style.flexDirection = 'column'
landing.container.style.justifyContent = 'center'
landing.container.style.alignItems = 'center'
landing.container.style.padding = '50px'

landing.addRegisterClickListener(function () {
    body.remove(landing)
    body.add(register)
})

landing.addLoginClickListener(function () {
    body.remove(landing)
    body.add(login)
})
body.add(landing)

var register = new Register()
register.container.style.display = 'flex'
register.container.style.flexDirection = 'column'
register.container.style.justifyContent = 'center'
register.container.style.alignItems = 'center'
register.container.style.padding = '40px'
register.container.style.gap = '0.3rem'

register.addLoginClickListener(function () {
    body.remove(register)
    body.add(login)
})

register.addRegisterSubmitListener(function () {
    body.remove(register)
    body.add(login)
})

var login = new Login()
login.container.style.display = 'flex'
login.container.style.flexDirection = 'column'
login.container.style.justifyContent = 'center'
login.container.style.alignItems = 'center'
login.container.style.padding = '40px'
login.container.style.gap = '0.3rem'

login.addRegisterClickListener(function () {
    body.remove(login)
    body.add(register)
})
login.addLoginSubmitListener(function () {
    try {
        const name = logic.getUserName()

        home.setWelcomeText('Welcome, ' + name + '!')

        const posts = logic.getPosts()

        home.setPosts(posts)

        body.remove(login)
        body.add(home)
    } catch (error) {
        console.error(error)

        alert(error.message)
    }
})

var home = new Home()
home.container.style.display = 'flex'
home.container.style.flexDirection = 'column'
home.container.style.justifyContent = 'center'
home.container.style.alignItems = 'center'
home.container.style.padding = '40px'
home.container.style.gap = '0.3rem'

home.addLogoutClickListener(function () {
    body.remove(home)
    body.add(landing)
})

home.addPostSubmitListener(function () {
    body.remove(home)
    body.add(addPost)
})

var addPost = new AddPost()
addPost.container.style.display = 'flex'
addPost.container.style.flexDirection = 'column'
addPost.container.style.justifyContent = 'center'
addPost.container.style.alignItems = 'center'
addPost.container.style.padding = '40px'
addPost.container.style.gap = '0.3rem'

addPost.addPostSubmitListener(function () {
    try {
        const name = logic.getUserName()

        home.setWelcomeText('Welcome, ' + name + '!')

        const posts = logic.getPosts()

        home.setPosts(posts)

        body.remove(addPost)
        body.add(home)
    } catch (error) {
        console.error(error)

        alert(error.message)
    }
})
