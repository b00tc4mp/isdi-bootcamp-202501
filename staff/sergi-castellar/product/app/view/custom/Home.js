class Home extends Component {
    constructor() {
        super("div")

        const logo = new Heading(1)
        logo.setText("Logo")
        this.add(logo)

        const welcomeUsername = new Heading(3)
        this.add(welcomeUsername)
        this.welcomeUsername = welcomeUsername


        const logoutButton = new Button
        logoutButton.setText('Logout')
        logoutButton.addClickListener(() => {
            try {
                logic.logoutUser()

                this.logoutClickListener()
            } catch (error) {
                console.error(error)

                alert(error.message)
            }
        })
        this.add(logoutButton)

        const postArticleDiv = new Section()
        postArticleDiv.container.style.display = 'flex'
        postArticleDiv.container.style.flexDirection = 'column'
        postArticleDiv.container.style.width = '500px'
        postArticleDiv.container.style.textAlign = 'justify'
        this.add(postArticleDiv)
        this.postArticleDiv = postArticleDiv

        const footer = new Footer()
        footer.container.style.position = 'fixed'
        footer.container.style.bottom = '0'
        footer.container.style.left = '0'
        footer.container.style.width = '100%'
        footer.container.style.display = 'flex'
        footer.container.style.justifyContent = 'center'
        this.add(footer)

        const addPostButton = new Button()
        addPostButton.setText('+')
        addPostButton.container.style.fontSize = '30px'
        addPostButton.container.style.display = 'flex'
        addPostButton.container.style.justifyContent = 'center'
        addPostButton.container.style.marginBottom = '10px'
        addPostButton.addClickListener(() => {
            try {
                this.createPostClickListener()
            } catch (error) {
                console.error(error)
                alert(error)
            }
        })
        footer.add(addPostButton)
    }

    addLogoutClickListener(listener) {
        this.logoutClickListener = listener
    }

    setWelcomeText(text) {
        this.welcomeUsername.setText(text)
    }

    loadUsername() {
        try {
            const userId = logic.getUserId()
            const username = logic.getUserUsername(userId)

            home.setWelcomeText(`Welcome, ${username}!`)
        } catch (error) {
            console.error(error)
            alert(error.message)
        }
    }

    loadPosts() {
        try {
            this.postArticleDiv.container.innerHTML = ''

            const posts = logic.getPosts()

            for (let i = posts.length - 1; i > -1; i--) {
                let post = posts[i]

                const { authorId, imageSrc, textDescription, createdAt } = post

                const newPost = new Post(authorId, imageSrc, textDescription, createdAt)
                this.postArticleDiv.add(newPost)
            }
        } catch (error) {
            console.error(error)
            alert(error.message)
        }
    }

    addCreatePostClickListener(listener) {
        this.createPostClickListener = listener
    }
}