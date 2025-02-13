console.clear()

//DEPURACIÓN

document.body.style.backgroundColor = '#FFD033'
document.body.style.fontFamily = 'nunito'

var landing = {

    mount: function () {
        var container = document.createElement('div')
        landing.container = container
        document.body.appendChild(container)

        var logo = document.createElement('h1')
        logo.textContent = 'Bee you'
        container.appendChild(logo)

        //register button
        
        var registerButton = document.createElement('button')
        registerButton.textContent = 'Register'
        registerButton.addEventListener('click', function () {
            document.body.removeChild(container)
            document.body.appendChild(register.container)
        })
        container.appendChild(registerButton)

        // simple text

        var spaceText = document.createTextNode(' ')
        container.appendChild(spaceText)
        var orText = document.createTextNode('or')
        container.appendChild(orText) 
        var spaceText = document.createTextNode(' ')
        container.appendChild(spaceText)

        //login button

        var loginButton = document.createElement('button')
        loginButton.textContent = 'Login'
        loginButton.addEventListener('click', function () {
            document.body.removeChild(container)
            document.body.appendChild(login.container)
        })
        container.appendChild(loginButton)
    }
}

// REGISTER PAGE

var register = {
    mount: function () {
        var container = document.createElement('div')
        register.container = container

        var logo = document.createElement('h1')
        logo.textContent = 'Bee you'
        container.appendChild(logo)


        var title = document.createElement('h2')
        title.textContent = 'Create account'
        container.appendChild(title)

        //create form

        var form = document.createElement('form')
        container.appendChild(form)

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
            document.body.removeChild(container)
            document.body.appendChild(landing.container)
        })
        container.appendChild(returnButton)


        var spaceBetweenButton = document.createTextNode(' ')
        container.appendChild(spaceBetweenButton)
        
        //register button

        var button = document.createElement('button')
        button.textContent = 'Register'
            button.addEventListener('click', function () {
            document.body.removeChild(container)
            document.body.appendChild(login.container)
        })
        container.appendChild(button)
    }
}

//LOGIN PAGE

var login = {
    mount: function () {
        var container = document.createElement('div')
        login.container = container

        //logo

        var logo = document.createElement('h1')
        logo.textContent = 'Bee You'
        container.appendChild(logo)

        //title

        var title = document.createElement('h2')
        title.textContent = 'Login'
        container.appendChild(title)

        // create form

        var form = document.createElement('form')
        container.appendChild(form)

        //username

        var usernameLabel = document.createElement('label')
        usernameLabel.textContent = 'Username'
        form.appendChild(usernameLabel)

        var br = document.createElement('br')
        form.appendChild(br)

        var userNameInput = document.createElement('input')
        form.appendChild(userNameInput)

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
            document.body.removeChild(container)
            document.body.appendChild(landing.container)
        })
        container.appendChild(returnButton)

        var spaceBetweenButton = document.createTextNode(' ')
        container.appendChild(spaceBetweenButton)

        //login button

        var button = document.createElement('button')
        button.textContent = 'Login'
        
        button.addEventListener('click', function () {
            document.body.removeChild(container)
            document.body.appendChild(home.container)
        })
        container.appendChild(button)
    }
}

// HOMEPAGE

var home = {
    mount: function() {
        var container = document.createElement('div')
        home.container = container

        var logo = document.createElement('h1')
        logo.textContent = 'Bee You'
        container.appendChild(logo)
    
        //HOME FIRST POST
        
        firstPost = document.createElement('article') 
        container.appendChild(firstPost)
        
        firstPostName = document.createElement('h3')
        firstPostName.textContent = 'name1'
        firstPost.appendChild(firstPostName)
        
        
        var squareImg = document.createElement('div')
        container.appendChild(squareImg)
        
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
        container.appendChild(secondPost)
        
        var secondPostName = document.createElement('h3')
        secondPostName.textContent = 'name2'
        secondPost.appendChild(secondPostName)
        
        var squareImg2 = document.createElement('div')
        container.appendChild(squareImg2)
        
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
        
        var logOutButton = document.createElement('button')
        logOutButton.textContent = 'Logout'

        //logout button

        logOutButton.addEventListener('click', function () {
            document.body.removeChild(container)
            document.body.appendChild(login.container)
        })
        container.appendChild(logOutButton)
    }
}

landing.mount()
register.mount()
login.mount()
home.mount()

