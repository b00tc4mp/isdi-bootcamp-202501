
const body = new Body()
body.container = document.body
body.container.style.fontFamily = 'sans-serif'
body.container.style.backgroundSize = 'cover'
body.container.style.backgroundImage = "url('https://imgs.search.brave.com/eVpWbjn73TWzvc2fj025Cfg5iapsH_pxWBSvRjS-2IM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvaGQvbGln/aHQtZ3JlZW4tdGV4/dHVyZS1waG9uZS0x/cXh1NXl1YnM5dm03/ZXBmLmpwZw')"

var landing = new Landing()
landing.container.style.display = 'flex'
//landing.container.style.flexDirection = 'column'
landing.container.style.justifyContent = 'center'

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
register.addLoginClickListener(function () {
    body.remove(register)
    body.add(login)
})

register.addRegisterSubmitListener(function () {
    body.remove(register)
    body.add(login)
})

var login = new Login()
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

home.addLogoutClickListener(function () {
    body.remove(home)
    body.add(landing)
})