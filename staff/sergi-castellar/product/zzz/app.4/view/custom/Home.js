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
                logic.helper.handleError(error)
            }
        })
        this.add(logoutButton)

        const postsSection = new Section()
        postsSection.container.style.display = 'flex'
        postsSection.container.style.alignItems = 'center'
        postsSection.container.style.flexDirection = 'column'
        postsSection.container.style.width = '500px'
        postsSection.container.style.marginBottom = '30px'
        postsSection.container.style.textAlign = 'justify'
        this.add(postsSection)
        this.postArticleDiv = postsSection

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
            const createPost = new CreatePost()
            createPost.container.style.position = 'fixed'
            createPost.container.style.top = '0'
            createPost.container.style.left = '0'
            createPost.container.style.width = '100%'
            createPost.container.style.height = '100%'
            createPost.container.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'
            createPost.container.style.display = 'flex'
            createPost.container.style.justifyContent = 'center'
            createPost.container.style.alignItems = 'center'
            this.add(createPost)

            createPost.addCreatePostSubmitListener(() => {
                this.remove(createPost)

                this.loadPosts()
            })

            createPost.addCancelClickListener(() => {
                this.remove(createPost)
            })
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
            const userId = logic.helper.getUserId()
            const username = logic.getUserProperty(userId, 'username')

            this.setWelcomeText(`Welcome, ${username}!`)
        } catch (error) {
            logic.helper.handleError(error)
        }
    }

    loadPosts() {
        this.postArticleDiv.container.innerHTML = ''

        try {
            const posts = logic.getPosts()

            for (let i = posts.length - 1; i > -1; i--) {
                let post = posts[i]

                const newPost = new Post(post)
                newPost.addLoadPosts(() => {
                    try {
                        this.loadPosts()
                    } catch (error) {
                        logic.helper.handleError()
                    }
                })
                this.postArticleDiv.add(newPost)
            }
        } catch (error) {
            logic.helper.handleError(error)
        }
    }

    addCreatePostClickListener(listener) {
        this.createPostClickListener = listener
    }
}