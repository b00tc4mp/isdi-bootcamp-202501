console.clear()
console.log('Hello, App!')

// --- LANDING ---
var landing = {
    mount: function () {
        var container = document.createElement('div')
        landing.container = container
        document.body.appendChild(container)

        var logoh1 = document.createElement('h1')
        logoh1.textContent = 'Logo'
        container.appendChild(logoh1)

        //SPAN DE ANCHORS 
        var anchorsSpan = document.createElement('span')
        anchorsSpan.style.display = 'flex'
        anchorsSpan.style.justifyContent = 'left'
        anchorsSpan.style.gap = '5px'
        container.appendChild(anchorsSpan)

        var registerAnchor = document.createElement('a')
        registerAnchor.innerText = 'Register'
        registerAnchor.style.textDecoration = 'underline'
        registerAnchor.style.cursor = 'pointer'
        anchorsSpan.appendChild(registerAnchor)

        registerAnchor.addEventListener('click', function () {
            document.body.removeChild(container)
            document.body.appendChild(register.container)
        })

        var orText = document.createElement('text')
        orText.textContent = ' or '
        anchorsSpan.appendChild(orText)

        var loginAnchor = document.createElement('a')
        loginAnchor.innerText = 'Login'
        loginAnchor.style.textDecoration = 'underline'
        loginAnchor.style.cursor = 'pointer'
        anchorsSpan.appendChild(loginAnchor)

        loginAnchor.addEventListener('click', function () {
            document.body.removeChild(container)
            document.body.appendChild(login.container)
        })
    }
}


//--- REGISTER ---
var register = {
    mount: function () {
        var container = document.createElement('div')
        register.container = container
        container.style.width = '400px'

        var title = document.createElement('h2')
        title.textContent = 'Register'
        container.appendChild(title)

        var form = document.createElement('form')
        form.style.display = 'flex'
        form.style.flexDirection = 'column'
        form.style.justifyContent = 'left'
        form.style.gap = '5px'
        container.appendChild(form)

        //NAME
        var nameLabel = document.createElement('label')
        nameLabel.textContent = 'Name'
        form.appendChild(nameLabel)

        var nameInput = document.createElement('input')
        nameInput.style.width = '350px'
        form.appendChild(nameInput)

        //EMAIL
        var emailLabel = document.createElement('label')
        emailLabel.textContent = 'E-mail'
        form.appendChild(emailLabel)

        var labelInput = document.createElement('input')
        labelInput.style.width = '350px'
        form.appendChild(labelInput)

        //USERNAME
        var usernameLabel = document.createElement('label')
        usernameLabel.textContent = 'Username'
        form.appendChild(usernameLabel)

        var usernameInput = document.createElement('input')
        usernameInput.style.width = '350px'
        form.appendChild(usernameInput)

        //PASSWORD
        var passwordLabel = document.createElement('label')
        passwordLabel.textContent = 'Password'
        form.appendChild(passwordLabel)

        var passwordInput = document.createElement('input')
        passwordInput.style.width = '350px'
        form.appendChild(passwordInput)


        var lowerSpan = document.createElement('span')
        lowerSpan.style.margin = '10px'
        lowerSpan.style.marginRight = '55px'
        lowerSpan.style.display = 'flex'
        lowerSpan.style.justifyContent = 'space-between'
        lowerSpan.style.alignItems = 'center'
        lowerSpan.width = '100%'

        var loginAnchor = document.createElement('a')
        loginAnchor.innerText = 'Login'
        loginAnchor.style.textDecoration = 'underline'
        loginAnchor.style.cursor = 'pointer'
        lowerSpan.appendChild(loginAnchor)

        var registerButton = document.createElement('button')
        registerButton.textContent = 'Register'
        registerButton.type = 'submit'
        registerButton.style.width = '80px'
        lowerSpan.appendChild(registerButton)


        form.appendChild(lowerSpan)

        loginAnchor.addEventListener('click', function () {
            document.body.removeChild(container)
            document.body.appendChild(login.container)
        })

        form.addEventListener('submit', function (event) {
            event.preventDefault()
            document.body.removeChild(container)
            document.body.appendChild(login.container)
        })
    }
}


//--- LOGIN ---
var login = {
    mount: function () {
        var container = document.createElement('div')
        login.container = container
        container.style.width = '400px'

        var title = document.createElement('h2')
        title.textContent = 'Login'
        container.appendChild(title)

        var form = document.createElement('form')
        form.style.display = 'flex'
        form.style.flexDirection = 'column'
        form.style.justifyContent = 'left'
        form.style.gap = '5px'
        container.appendChild(form)

        //USERNAME
        var usernameLabel = document.createElement('label')
        usernameLabel.textContent = 'Username'
        form.appendChild(usernameLabel)

        var usernameInput = document.createElement('input')
        usernameInput.style.width = '350px'
        form.appendChild(usernameInput)

        //PASSWORD
        var passwordLabel = document.createElement('label')
        passwordLabel.textContent = 'Password'
        form.appendChild(passwordLabel)

        var passwordInput = document.createElement('input')
        passwordInput.style.width = '350px'
        form.appendChild(passwordInput)


        var lowerSpan = document.createElement('span')
        lowerSpan.style.margin = '10px'
        lowerSpan.style.marginRight = '60px'
        lowerSpan.style.display = 'flex'
        lowerSpan.style.justifyContent = 'space-between'
        container.appendChild(lowerSpan)

        var registerAnchor = document.createElement('a')
        registerAnchor.innerText = 'Register'
        registerAnchor.style.textDecoration = 'underline'
        registerAnchor.style.cursor = 'pointer'
        lowerSpan.appendChild(registerAnchor)

        var loginButton = document.createElement('button')
        loginButton.textContent = 'Login'
        loginButton.style.width = '80px'
        loginButton.type = 'submit'
        lowerSpan.appendChild(loginButton)


        form.appendChild(lowerSpan)

        registerAnchor.addEventListener('click', function () {
            document.body.removeChild(container)
            document.body.appendChild(register.container)
        })


        form.addEventListener('submit', function (event) {
            event.preventDefault()
            document.body.removeChild(container)
            document.body.appendChild(home.header)
            document.body.appendChild(home.main)
        })
    }
}


// ---- HOME ----
var home = {
    mount: function () {
        //Header
        var header = document.createElement('header')
        home.header = header
        header.style.width = '100%'
        header.style.height = '50px'
        header.style.margin = '10px'
        header.style.display = 'flex'
        header.style.justifyContent = 'space-between'
        header.style.alignItems = 'center'

        var logoTitle = document.createElement('h2')
        logoTitle.textContent = 'Logo'
        header.appendChild(logoTitle)

        var logoutButton = document.createElement('button')
        logoutButton.textContent = 'Logout'
        logoutButton.style.width = '100px'
        logoutButton.style.height = '35px'
        logoutButton.style.marginRight = '10px'
        header.appendChild(logoutButton)

        logoutButton.addEventListener('click', function () {
            document.body.removeChild(header)
            document.body.removeChild(main)
            document.body.appendChild(landing.container)
        })

        //MAIN HOME
        var main = document.createElement('main')
        home.main = main

        var posts = document.createElement('article')
        posts.style.display = 'flex'
        posts.style.width = '100%'
        posts.style.maxWidth = 'inherit'
        posts.style.flexDirection = 'column'
        posts.style.gap = '10px'
        main.appendChild(posts)


        //KIWIII POST
        var kiwiPost = document.createElement('img')
        kiwiPost.src = 'https://www.nutritionadvance.com/wp-content/uploads/2017/12/whole-kiwi-fruit-and-half-a-kiwi-showing-flesh.jpg'
        kiwiPost.style.width = '100%'
        kiwiPost.style.height = 'auto'
        posts.appendChild(kiwiPost)

        var kiwiMojis = document.createElement('span')
        kiwiMojis.style.display = 'flex'
        kiwiMojis.style.justifyContent = 'left'
        kiwiMojis.style.gap = '5px'
        posts.appendChild(kiwiMojis)

        var likeEmoji = document.createElement('a')
        likeEmoji.innerText = '❤️'
        kiwiMojis.appendChild(likeEmoji)

        var commentEmoji = document.createElement('a')
        commentEmoji.innerText = '📃'
        kiwiMojis.appendChild(commentEmoji)

        var comment = document.createElement('Text')
        comment.textContent = 'Comment...'
        comment.style.opacity = '60%'
        comment.style.color = 'black'
        kiwiMojis.appendChild(comment)


        //BANANA POST
        var bananaPost = document.createElement('img')
        bananaPost.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAVh4eUU6jtRS9zzlomMGLvWgpua5Xj5IcoQ&s'
        bananaPost.style.width = '100%'
        bananaPost.style.height = 'auto'
        posts.appendChild(bananaPost)

        var nanaMojis = document.createElement('span')
        nanaMojis.style.display = 'flex'
        nanaMojis.style.justifyContent = 'left'
        nanaMojis.style.gap = '5px'
        posts.appendChild(nanaMojis)

        var likeEmoji = document.createElement('a')
        likeEmoji.innerText = '❤️'
        nanaMojis.appendChild(likeEmoji)

        var commentEmoji = document.createElement('a')
        commentEmoji.innerText = '📃'
        nanaMojis.appendChild(commentEmoji)

        var comment = document.createElement('Text')
        comment.textContent = 'Comment...'
        comment.style.opacity = '60%'
        comment.style.color = 'black'
        nanaMojis.appendChild(comment)


        //ORANGE POST
        var orangePost = document.createElement('img')
        orangePost.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgqLw4idW1IdAusBGfdZPewk0HTJyRUzPCPg&s'
        orangePost.style.width = '100%'
        orangePost.style.height = 'auto'
        posts.appendChild(orangePost)

        var oraMojis = document.createElement('span')
        oraMojis.style.display = 'flex'
        oraMojis.style.justifyContent = 'left'
        oraMojis.style.gap = '5px'
        posts.appendChild(oraMojis)

        var likeEmoji = document.createElement('a')
        likeEmoji.innerText = '❤️'
        oraMojis.appendChild(likeEmoji)

        var commentEmoji = document.createElement('a')
        commentEmoji.innerText = '📃'
        oraMojis.appendChild(commentEmoji)

        var comment = document.createElement('Text')
        comment.textContent = 'Comment...'
        comment.style.opacity = '60%'
        comment.style.color = 'black'
        oraMojis.appendChild(comment)
    }
}

//LLAMAR FUNCIONES
landing.mount()
register.mount()
login.mount()
home.mount()
