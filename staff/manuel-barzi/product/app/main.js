console.clear()
console.log('Hello, App!')

// landing

var landing = document.createElement('div')
document.body.appendChild(landing)

var landingLogo = document.createElement('h1')
landing.appendChild(landingLogo)

//var landingLogoText = new Text('Logo')
var landingLogoText = document.createTextNode('Logo')
landingLogo.appendChild(landingLogoText)


// register

var register = document.createElement('div')
document.body.appendChild(register)

// login

var login = document.createElement('div')
document.body.appendChild(login)

// home

var home = document.createElement('div')
document.body.appendChild(home)

// ...