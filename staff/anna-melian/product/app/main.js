console.clear()

// landing

var landing = {
    mount: function () {
        var container = document.createElement('div')
        landing.container = container
        document.body.appendChild(container)

        var logo = document.createElement('h1')
        container.appendChild(logo)
        logo.textContent = 'Logo'

        var registerAnchor = document.createElement('a')
        registerAnchor.style.textDecoration = 'underline'
        container.appendChild(registerAnchor)

        registerAnchor.addEventListener('click', function () {
            document.body.removeChild(container)
            document.body.appendChild(register.container)
        })

        registerAnchor.textContent = 'Register'

        var orText = document.createTextNode(' or ')
        container.appendChild(orText)

        var loginAnchor = document.createElement('a')
        loginAnchor.style.textDecoration = 'underline'
        container.appendChild(loginAnchor)

        loginAnchor.addEventListener('click', function () {
            document.body.removeChild(container)
            document.body.appendChild(login.container)
        })
        loginAnchor.textContent = 'Login'

    }
}

landing.mount()


/* register */

var register = {
    mount: function () {
        var container = document.createElement('div')
        register.container = container

        var logo = document.createElement('h1')
        container.appendChild(logo)

        logo.textContent = 'Logo'

        var intructions = document.createElement('p')
        container.appendChild(intructions)

        intructions.textContent = 'To register, enter the following information. '

        // from

        var form = document.createElement('form')
        form.style.display = 'flex'
        form.style.gap = '15px'
        form.style.flexDirection = 'column'

        container.appendChild(form)

        //name
        var formNameLabel = document.createElement('label')

        form.appendChild(formNameLabel)
        formNameLabel.textContent = 'Name'

        var formNameInput = document.createElement('input')
        form.appendChild(formNameInput)


        // email
        var formEmailLabel = document.createElement('label')
        form.appendChild(formEmailLabel)

        formEmailLabel.textContent = 'E-mail'

        var formEmailInput = document.createElement('input')
        form.appendChild(formEmailInput)

        // username

        var formUsernameLabel = document.createElement('label')
        form.appendChild(formUsernameLabel)

        formUsernameLabel.textContent = 'Username'

        var formUsernameInput = document.createElement('input')
        form.appendChild(formUsernameInput)

        // password

        var formPasswordLabel = document.createElement('label')
        form.appendChild(formPasswordLabel)

        formPasswordLabel.textContent = 'Password'

        var formPasswordInput = document.createElement('input')
        form.appendChild(formPasswordInput)


        // submit botton
        var formSubmitButton = document.createElement('button')
        form.appendChild(formSubmitButton)

        formSubmitButton.textContent = 'Create new account'

        formSubmitButton.addEventListener('click', function () {
            document.body.removeChild(container)
            document.body.appendChild(login.container)
        })

        // anchor 

        var loginAnchor = document.createElement('a')
        loginAnchor.style.textDecoration = 'underline'
        container.appendChild(loginAnchor)

        loginAnchor.textContent = 'Login'

        loginAnchor.addEventListener('click', function () {
            document.body.removeChild(container)
            document.body.appendChild(login.container)
        })


    }
}
register.mount()

/* login */

var login = {
    mount: function () {
        var container = document.createElement('div')
        login.container = container

        var logo = document.createElement('h1')
        container.appendChild(logo)

        logo.textContent = 'Logo'

        var intructions = document.createElement('p')
        container.appendChild(intructions)

        intructions.textContent = 'To login enter your credentials.'

        // form

        var form = document.createElement('form')
        form.style.display = 'flex'
        form.style.gap = '15px'
        form.style.flexDirection = 'column'
        container.appendChild(form)

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

        formSubmitButton.addEventListener('click', function () {
            document.body.removeChild(container)
            document.body.appendChild(home.container)
        })

        // anchor

        var registerAnchor = document.createElement('a')
        registerAnchor.style.textDecoration = 'underline'
        container.appendChild(registerAnchor)

        registerAnchor.textContent = 'Register'

        registerAnchor.addEventListener('click', function () {
            document.body.removeChild(container)
            document.body.appendChild(register.container)
        })

    }
}

login.mount()

/* home */

var home = {
    mount: function () {
        var container = document.createElement('div')
        home.container = container


        var logo = document.createElement('h1')
        container.appendChild(logo)

        logo.textContent = 'Logo'

        var containerTop = document.createElement('span')
        containerTop.style.display = 'flex'
        containerTop.style.justifyContent = 'space-between'
        container.appendChild(containerTop)

        var greeting = document.createTextNode('Hello, User!')
        containerTop.appendChild(greeting)

        var exitButton = document.createElement('button')
        containerTop.appendChild(exitButton)

        exitButton.textContent = 'Exit'

        exitButton.addEventListener('click', function () {
            document.body.removeChild(container)
            document.body.appendChild(landing.container)
        })

        var space = document.createElement('div')
        space.style.height = '50px'
        container.appendChild(space)


        // Post 1
        var post1 = document.createElement('div')
        post1.style.background = 'lightblue'
        post1.style.width = '500px'
        container.appendChild(post1)

        var post1UserName = document.createElement('p')
        post1UserName.style.fontWeight = 'bold'
        post1.appendChild(post1UserName)

        var post1UserNameText = document.createTextNode('username1')
        post1UserName.appendChild(post1UserNameText)

        var post1Photo = document.createElement('img')
        post1Photo.src = 'https://imgs.search.brave.com/gLe1nNepyk97sd_4fBikHFr8rWHTdPIChvqye9jikaU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvNjc1/MjU4NDEyL2VzL2Zv/dG8vYm9zcXVlLWRl/LXNlY3VveWFzLmpw/Zz9zPTYxMng2MTIm/dz0wJms9MjAmYz1y/NXZqRjRkSWhnVkdo/aXFUMFhmV2Z0MUVa/SFU1X1hwZnJndTky/QUk5SWFjPQ'
        post1Photo.style.width = '500px'
        post1Photo.style.display = 'block'
        post1.appendChild(post1Photo)

        var post1PhotoCaption = document.createElement('span')
        post1PhotoCaption.style.display = 'flex'
        post1PhotoCaption.style.justifyContent = 'space-between'
        post1PhotoCaption.style.width = '500px'
        post1.appendChild(post1PhotoCaption)

        var post1PhotoCaptionText = document.createTextNode('Caption')
        post1PhotoCaption.appendChild(post1PhotoCaptionText)

        var post1PhotoCaptionLikeButton = document.createElement('button')
        post1PhotoCaption.appendChild(post1PhotoCaptionLikeButton)

        var post1PhotoCaptionLikeButtonWhite = document.createTextNode('🤍')
        post1PhotoCaptionLikeButton.appendChild(post1PhotoCaptionLikeButtonWhite)

        var post1PhotoCaptionLikeButtonRed = document.createTextNode('💙')

        var post1Like = false
        post1PhotoCaptionLikeButton.addEventListener('click', function () {
            if (!post1Like) {
                post1PhotoCaptionLikeButton.removeChild(post1PhotoCaptionLikeButtonWhite)
                post1PhotoCaptionLikeButton.appendChild(post1PhotoCaptionLikeButtonRed)
                post1Like = true
            }
            else {
                post1PhotoCaptionLikeButton.removeChild(post1PhotoCaptionLikeButtonRed)
                post1PhotoCaptionLikeButton.appendChild(post1PhotoCaptionLikeButtonWhite)
                post1Like = false
            }
        })

        var post1PhotoCaptionDate = document.createElement('p')
        post1.appendChild(post1PhotoCaptionDate)

        var post1PhotoCaptionDateText = document.createTextNode('1 hours ago')
        post1PhotoCaptionDate.appendChild(post1PhotoCaptionDateText)


        var spaceBetweenPost12 = document.createElement('div')
        spaceBetweenPost12.style.height = '50px'
        container.appendChild(spaceBetweenPost12)

        //post 2
        var post2 = document.createElement('div')
        post2.style.background = 'darkseagreen'
        post2.style.width = '500px'
        container.appendChild(post2)

        var post2UserName = document.createElement('p')
        post2UserName.style.fontWeight = 'bold'
        post2.appendChild(post2UserName)

        var post2UserNameText = document.createTextNode('username2')
        post2UserName.appendChild(post2UserNameText)

        var post2Photo = document.createElement('img')
        post2Photo.src = 'https://imgs.search.brave.com/Cnh02OiyfEeEPUHV_Tc2KU6AN48vRUngZI01EopI4XE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cmV2aXN0YW94aWdl/bm8uZXMvdXBsb2Fk/cy9zMS85Ni85Ny84/Ny8zL3J1dGFzLWNv/bi10b2RvLWVsLWVz/cGxlbmRvci1kZWwt/b3Rvbm8tZW4tbGEt/cHJvdmluY2lhLWRl/LWxlb24uanBlZw'
        post2Photo.style.width = '500px'
        post2Photo.style.display = 'block'
        post2.appendChild(post2Photo)

        var post2PhotoCaption = document.createElement('span')
        post2PhotoCaption.style.display = 'flex'
        post2PhotoCaption.style.justifyContent = 'space-between'
        post2PhotoCaption.style.width = '500px'
        post2.appendChild(post2PhotoCaption)

        var post2PhotoCaptionText = document.createTextNode('Caption')
        post2PhotoCaption.appendChild(post2PhotoCaptionText)

        var post2PhotoCaptionLikeButton = document.createElement('button')
        post2PhotoCaption.appendChild(post2PhotoCaptionLikeButton)

        var post2PhotoCaptionLikeButtonWhite = document.createTextNode('🤍')
        post2PhotoCaptionLikeButton.appendChild(post2PhotoCaptionLikeButtonWhite)

        var post2PhotoCaptionLikeButtonRed = document.createTextNode('💚')

        var post2Like = false
        post2PhotoCaptionLikeButton.addEventListener('click', function () {
            if (!post2Like) {
                post2PhotoCaptionLikeButton.removeChild(post2PhotoCaptionLikeButtonWhite)
                post2PhotoCaptionLikeButton.appendChild(post2PhotoCaptionLikeButtonRed)
                post2Like = true
            }
            else {
                post2PhotoCaptionLikeButton.removeChild(post2PhotoCaptionLikeButtonRed)
                post2PhotoCaptionLikeButton.appendChild(post2PhotoCaptionLikeButtonWhite)
                post2Like = false
            }
        })

        var post2PhotoCaptionDate = document.createElement('p')
        post2.appendChild(post2PhotoCaptionDate)

        var post2PhotoCaptionDateText = document.createTextNode('4 days ago')
        post2PhotoCaptionDate.appendChild(post2PhotoCaptionDateText)

        //space between posts
        var spaceBetweenPost23 = document.createElement('div')
        spaceBetweenPost23.style.height = '50px'
        container.appendChild(spaceBetweenPost23)

        //post 3
        var post3 = document.createElement('div')
        post3.style.background = 'lightcoral'
        post3.style.width = '500px'
        container.appendChild(post3)

        var post3UserName = document.createElement('p')
        post3UserName.style.fontWeight = 'bold'
        post3.appendChild(post3UserName)

        var post3UserNameText = document.createTextNode('username3')
        post3UserName.appendChild(post3UserNameText)

        var post3Photo = document.createElement('img')
        post3Photo.src = 'https://imgs.search.brave.com/2T65C8AIVGMdeWWfmDLdz3T-jDOaI_iqKbmnBnw3zXs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTM4/MzQyNTA4Ni9lcy9m/b3RvL3NlbmRlcm8t/bSVDMyVBMWdpY28t/ZGVsLWJvc3F1ZS15/LXQlQzMlQkFuZWwt/ZGUtJUMzJUExcmJv/bGVzLWFsLWFtYW5l/Y2VyLWVuLXByaW1h/dmVyYS5qcGc_cz02/MTJ4NjEyJnc9MCZr/PTIwJmM9TFE5R1VX/MTctclV2dkhKampn/eGZ2VS1yMlZ2UDJl/eFRyT21kcFNFQlA4/Zz0'
        post3Photo.style.width = '500px'
        post3Photo.style.display = 'block'
        post3.appendChild(post3Photo)

        var post3PhotoCaption = document.createElement('span')
        post3PhotoCaption.style.display = 'flex'
        post3PhotoCaption.style.justifyContent = 'space-between'
        post3PhotoCaption.style.width = '500px'
        post3.appendChild(post3PhotoCaption)

        var post3PhotoCaptionText = document.createTextNode('Caption')
        post3PhotoCaption.appendChild(post3PhotoCaptionText)

        var post3PhotoCaptionLikeButton = document.createElement('button')
        post3PhotoCaption.appendChild(post3PhotoCaptionLikeButton)

        var post3PhotoCaptionLikeButtonWhite = document.createTextNode('🤍')
        post3PhotoCaptionLikeButton.appendChild(post3PhotoCaptionLikeButtonWhite)

        var post3PhotoCaptionLikeButtonRed = document.createTextNode('❤️')

        var post3Like = false
        post3PhotoCaptionLikeButton.addEventListener('click', function () {
            if (!post3Like) {
                post3PhotoCaptionLikeButton.removeChild(post3PhotoCaptionLikeButtonWhite)
                post3PhotoCaptionLikeButton.appendChild(post3PhotoCaptionLikeButtonRed)
                post3Like = true
            }
            else {
                post3PhotoCaptionLikeButton.removeChild(post3PhotoCaptionLikeButtonRed)
                post3PhotoCaptionLikeButton.appendChild(post3PhotoCaptionLikeButtonWhite)
                post3Like = false
            }
        })

        var post3PhotoCaptionDate = document.createElement('p')
        post3.appendChild(post3PhotoCaptionDate)

        var post3PhotoCaptionDateText = document.createTextNode('3 weeks ago')
        post3PhotoCaptionDate.appendChild(post3PhotoCaptionDateText)

        //space between posts
        var spaceBetweenPost34 = document.createElement('div')
        spaceBetweenPost34.style.height = '50px'
        container.appendChild(spaceBetweenPost34)

        //post 4
        var post4 = document.createElement('div')
        post4.style.background = 'moccasin'
        post4.style.width = '500px'
        container.appendChild(post4)

        var post4UserName = document.createElement('p')
        post4UserName.style.fontWeight = 'bold'
        post4.appendChild(post4UserName)

        var post4UserNameText = document.createTextNode('username4')
        post4UserName.appendChild(post4UserNameText)

        var post4Photo = document.createElement('img')
        post4Photo.src = 'https://imgs.search.brave.com/U4-w0Zr88dLLLn8MpUKZX5VMd36FmA8leGiN0nwKuIU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTE4/ODEwODQ0L2VzL2Zv/dG8vbHV6LWEtdHJh/diVDMyVBOXMtZGUt/Ym9zcXVlLmpwZz9z/PTYxMng2MTImdz0w/Jms9MjAmYz12RDZi/TzFILU9YWEp3WWRO/c2xEYXB4TzNhZkJk/MzJLRkVQUnpXeC1Y/ZUVvPQ'
        post4Photo.style.width = '500px'
        post4Photo.style.display = 'block'
        post4.appendChild(post4Photo)

        var post4PhotoCaption = document.createElement('span')
        post4PhotoCaption.style.display = 'flex'
        post4PhotoCaption.style.justifyContent = 'space-between'
        post4PhotoCaption.style.width = '500px'
        post4.appendChild(post4PhotoCaption)

        var post4PhotoCaptionText = document.createTextNode('Caption')
        post4PhotoCaption.appendChild(post4PhotoCaptionText)

        var post4PhotoCaptionLikeButton = document.createElement('button')
        post4PhotoCaption.appendChild(post4PhotoCaptionLikeButton)

        var post4PhotoCaptionLikeButtonWhite = document.createTextNode('🤍')
        post4PhotoCaptionLikeButton.appendChild(post4PhotoCaptionLikeButtonWhite)

        var post4PhotoCaptionLikeButtonRed = document.createTextNode('💛')

        var post4Like = false
        post4PhotoCaptionLikeButton.addEventListener('click', function () {
            if (!post4Like) {
                post4PhotoCaptionLikeButton.removeChild(post4PhotoCaptionLikeButtonWhite)
                post4PhotoCaptionLikeButton.appendChild(post4PhotoCaptionLikeButtonRed)
                post4Like = true
            }
            else {
                post4PhotoCaptionLikeButton.removeChild(post4PhotoCaptionLikeButtonRed)
                post4PhotoCaptionLikeButton.appendChild(post4PhotoCaptionLikeButtonWhite)
                post4Like = false
            }
        })

        var post4PhotoCaptionDate = document.createElement('p')
        post4.appendChild(post4PhotoCaptionDate)

        var post4PhotoCaptionDateText = document.createTextNode('1 month ago')
        post4PhotoCaptionDate.appendChild(post4PhotoCaptionDateText)
    }
}

home.mount()


//posts saved


