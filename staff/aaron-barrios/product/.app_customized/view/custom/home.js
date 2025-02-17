class Home extends Component {
    constructor() {
        super('div')

        //Header
        const header = new Header()
        header.container.style.width = '100%'
        header.container.style.height = '50px'
        header.container.style.margin = '10px'
        header.container.style.display = 'flex'
        header.container.style.justifyContent = 'space-between'
        header.container.style.alignItems = 'center'
        this.add(header)

        const welcome = new Heading(2)
        welcome.setText('Logo')
        header.add(welcome)
        this.welcome = welcome

        const logoutButton = new Button()
        logoutButton.setText('Logout')
        logoutButton.container.style.width = '100px'
        logoutButton.container.style.height = '35px'
        logoutButton.container.style.marginRight = '10px'
        logoutButton.addClickListener(function () {
            try {
                logic.logoutUser()

                this.logoutClickListener()
            } catch (error) {
                console.error(error)

                alert(error.message)
            }
        }.bind(this))
        header.add(logoutButton)

        //MAIN HOME
        const main = new Main()
        this.add(main)

        this.postsSection = new Section()
        this.add(this.postsSection)
        this.postsSection = this.postsSection

        const createPostButton = new Button()
        createPostButton.setText('🧉')
        createPostButton.addClickListener(function () {
            const createPost = new CreatePost()

            createPost.addCreatePostSubmitListener(function () {
                this.remove(createPost)

                this.loadPosts()
                this.add(this.postsSection)
                this.add(createPostButton)
            }.bind(this))

            createPost.addCancelClickListener(function () {
                this.remove(createPost)
                this.add(this.postsSection)
                this.add(createPostButton)
            }.bind(this))

            this.remove(this.postsSection)
            this.remove(createPostButton)
            this.add(createPost)
        }.bind(this))
        this.add(createPostButton)
    }
    addLogoutClickListener(listener) {
        this.logoutClickListener = listener
    }

    loadUsername() {
        try {
            const name = logic.getUsername()

            this.welcome.setText(`Hello, ${name}!`)
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    loadPosts() {
        // Limpiar contenido antes de agregar nuevos posts
        this.postsSection.container.innerHTML = ''

        try {
            const posts = logic.getPosts()

            for (let i = posts.length - 1; i > -1; i--) {
                const post = posts[i];

                const postArticle = new Article()
                postArticle.container.style.width = '100%'
                postArticle.container.style.padding = '10px'
                postArticle.container.style.border = '1px solid #ccc'
                postArticle.container.style.borderRadius = '5px'
                postArticle.container.style.backgroundColor = '#f9f9f9'
                //PONER GAP

                const authorHeading = new Heading(3)
                authorHeading.setText(post.author)
                postArticle.add(authorHeading)

                const postImage = new Image()
                postImage.setUrl(post.image)
                postImage.container.style.width = '100%'
                postImage.container.style.height = 'auto'
                postImage.container.style.objectFit = 'cover'
                postArticle.add(postImage)

                const postText = new Paragraph()
                postText.setText(post.text)
                postArticle.add(postText)

                const postDate = new Time()
                postDate.setText(post.createdAt.toISOString())
                postArticle.add(postDate)

                this.postsSection.add(postArticle)
            }
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }
}
