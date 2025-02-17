console.log('Hello, App!')

// body

var body = new Body()
body.container = document.body

// LANDING
var landing = new Landing()
body.add(landing)
landing.addLandingLoginAnchor(function(){
    body.remove(landing)
    body.add(login)
})
landing.addLandingRegisterAnchor(function(){
    body.remove(landing)
    body.add(register)
})

//LOGIN
var login = new Login()
login.addAnchorListener(function(){
    body.remove(login)
    body.add(register)
})
login.addSubmitLoginListener(function(){
    try{
        const name = logic.getUserName() // Obtener nombre del usuario

        home.setWelcomeText('Hello, ' + name + '!') // Obtener funcion de home de saludar 

       const posts = logic.getPosts() // Obtener posts de logic

        home.setPosts(posts) // Funcion para generar posts
    
        body.remove(login)
        body.add(home)
    }catch(error){

        alert(error.message)
    }
})

//REGISTER
var register = new Register()
//*1 MAIN SE ENCARGA DE QUITAR UNA PAGINA Y PONER OTRA, ES SU RESPONSABILIDAD
register.addLoginClickListener(function() {
    body.remove(register)
    body.add(login)
})
//*2
register.addRegisterSubmitListener(function(){
    body.remove(register)
    body.add(login)
})

//HOME
var home = new Home()
home.addHomeLogout(function(){
    body.remove(home)
    body.add(landing)
})