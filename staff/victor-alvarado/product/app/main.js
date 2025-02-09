console.clear()
console.log('Hello, App!')

//contenedor principal
var container = document.createElement('div')
document.body.appendChild(container)
  
//funcion para mostrar las pantallas
function showScreen(screen) {
  container.innerHTML = ''
  if (screen === 'landing') landing.mount()
  if (screen === 'register') register.mount()
  if (screen === 'login') login.mount()
  if (screen === 'home') home.mount()

}


// landing

var landing = {
    mount: function () {
        container.innerHTML = ''
  
        var landingLogo = document.createElement('h1')
        landingLogo.textContent = 'Logo'
        container.appendChild(landingLogo)
  
     
      

//enlace register
var landingRegisterAnchor = document.createElement('a')
landingRegisterAnchor.href = '#' 
landingRegisterAnchor.textContent = 'Register'
landingRegisterAnchor.addEventListener('click', function () {
  showScreen('register')
})
container.appendChild(landingRegisterAnchor)


//texto "or"
var landingOrspan = document.createElement('span')
landingOrspan.innerHTML = ' &nbsp;or&nbsp; '
container.appendChild(landingOrspan)

//enlace Login


var landingLoginAnchor = document.createElement('a')
landingLoginAnchor.href = '#'
landingLoginAnchor.textContent ='Login'
landingLoginAnchor.addEventListener('click', function() {
  showScreen('login')
})
container.appendChild(landingLoginAnchor)
 }
}

// Login
var login = {
  mount: function () {
      container.innerHTML = ''

      var loginLogo = document.createElement('h1')
      loginLogo.textContent = 'Login'
      container.appendChild(loginLogo)

      // Crear formulario de login
      var loginForm = document.createElement('form')
      container.appendChild(loginForm)

      // Función para crear un campo de input
      function createInput(labelText, type, form) {
          var label = document.createElement('label')
          label.innerText = labelText
          var input = document.createElement('input')
          input.type = type
          input.required = true
          input.style.display = 'block'
          input.style.marginBottom = '10px'
          form.appendChild(label)
          form.appendChild(input)
          return input
      }

      // Crear campos de correo electrónico y contraseña
      var emailInput = createInput('E-mail', 'email', loginForm)
      var passwordInput = createInput('Password', 'password', loginForm)

      // Botón de login
      var loginButton = document.createElement('button')
      loginButton.innerText = 'Login'
      loginButton.type = 'submit'
      loginForm.appendChild(loginButton)

      // Evitar el registro real, solo redirigir a la pantalla de inicio
      loginForm.addEventListener('submit', function (event) {
          event.preventDefault()
          console.log('Login attempt:', {
              email: emailInput.value,
              password: passwordInput.value
          })
          alert('Bienvenido de nuevo!')  // Mensaje ficticio
          showScreen('home')  // Redirigir a la pantalla principal
      })

      // Botón para volver a la pantalla de inicio
      var backToLanding = document.createElement('button')
      backToLanding.innerText = 'Back'
      backToLanding.addEventListener('click', function () {
          showScreen('landing')
      })
      container.appendChild(backToLanding)
  }
}

//register

var register = {
    mount: function () {
 container.innerHTML = ''


var registerLogo = document.createElement('h1')
registerLogo.textContent = 'Register'
container.appendChild(registerLogo)

//Crear formulario
var registerForm = document.createElement('form')
container.appendChild(registerForm)

//funcion para crear un campo input
function createInput(labelText, type, form) {
var label = document.createElement('label')
label.innerText = labelText
var input = document.createElement('input')
input.type = type
input.required = true

input.style.display = 'block'
input.style.marginBottom = '10px'
form.appendChild(label)
form.appendChild(input)
return input

}

// crear campos nombre email username y pasword

var nameInput = createInput('Name', 'text', registerForm)
var emailInput = createInput('E-mail', 'e-mail', registerForm)
var usernameInput = createInput('Username', 'text', registerForm)
var passwordInput = createInput('Password', 'password', registerForm)


//boton register
var registerButton = document.createElement('button')
registerButton.innerText = 'Register'
registerButton.style.marginTop = '10px'
registerButton.type = 'submit'
registerForm.appendChild(registerButton)


//boton para guardar los cambios en la consola

registerForm.addEventListener('submit',function (event) {
event.preventDefault()
console.log('User registred:', {
name: nameInput.value,
email: emailInput.value,
username: usernameInput.value,
password: passwordInput.value
})

alert('Usuario registrado correctamente!')
showScreen('login')

})

//boton para volver a la landing

var backToLanding = document.createElement('button')
backToLanding.innerText = 'Back'
backToLanding.style.marginTop = '10px'
backToLanding.addEventListener('click', function () {
  showScreen('landing')
})
container.appendChild(backToLanding)
}
}

// home
var home = {
  mount: function () {
      container.innerHTML = ''
  
var homeLogo = document.createElement('h1')
homeLogo.textContent = 'Bienvenido al inicio'
container.appendChild(homeLogo)
// crear imagen

var homeImage = document.createElement('img')
homeImage.src = 'https://www.dzoom.org.es/wp-content/uploads/2017/07/seebensee-2384369-810x540.jpg'
homeImage.alt = 'Imagen de un bonito paisaje'
homeImage.style.width = '600px'
homeImage.style.display = 'block'
homeImage.style.marginBottom = '10px'
container.appendChild(homeImage)

// boton volver a la pantalla principal

var homeButton = document.createElement('button')
homeButton.innerText = 'volver al inicio'
homeButton.style.marginTop = '10px'
homeButton.style.display = 'block'
homeButton.addEventListener('click', function () {
  showScreen('landing')
})
container.appendChild(homeButton)

}
}
//iniciar patalla de landing
showScreen('landing')