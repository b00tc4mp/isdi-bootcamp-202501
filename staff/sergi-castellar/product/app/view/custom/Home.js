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
            const modalBackground = new Div()
            modalBackground.container.style.position = 'fixed'
            modalBackground.container.style.top = '0'
            modalBackground.container.style.left = '0'
            modalBackground.container.style.width = '100%'
            modalBackground.container.style.height = '100%'
            modalBackground.container.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'
            modalBackground.container.style.display = 'flex'
            modalBackground.container.style.justifyContent = 'center'
            modalBackground.container.style.alignItems = 'center'
            //modalBackground.container.style.zIndex = '1000'
            this.add(modalBackground)

            const createPost = new CreatePost()
            createPost.container.style.backgroundColor = 'white'
            createPost.container.style.padding = '20px'
            createPost.container.style.borderRadius = '8px'
            createPost.container.style.width = '400px'
            createPost.container.style.display = 'flex'
            createPost.container.style.flexDirection = 'column'
            createPost.container.style.alignItems = 'center'


            modalBackground.add(createPost)

            createPost.addCreatePostSubmitListener(() => {
                this.remove(modalBackground)

                this.loadPosts()
            })

            createPost.addCancelClickListener(() => {
                this.remove(modalBackground)
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
            const userId = logic.getUserId()
            const username = logic.getUserProperty(userId, 'username')

            home.setWelcomeText(`Welcome, ${username}!`)
        } catch (error) {
            logic.helper.handleError(error)
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
            logic.helper.handleError(error)
        }
    }

    addCreatePostClickListener(listener) {
        this.createPostClickListener = listener
    }
}