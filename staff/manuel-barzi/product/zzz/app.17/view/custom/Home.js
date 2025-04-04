class Home extends Component {
    constructor() {
        super('div')

        const logo = new Heading(1)
        logo.setText('Logo')
        this.add(logo)

        const welcome = new Heading(2)
        welcome.setText('Hello, World!')
        this.add(welcome)
        this.welcome = welcome

        const logoutButton = new Button()
        logoutButton.setText('Logout')
        logoutButton.addClickListener(function () {
            try {
                logic.logoutUser()

                this.logoutClickListener()
            } catch (error) {
                console.error(error)

                alert(error.message)
            }
        }.bind(this))
        this.add(logoutButton)

        const postsSection = new Section()
        this.add(postsSection)
        this.postsSection = postsSection

        const addPostButton = new Button()
        addPostButton.setText('+')
        addPostButton.addClickListener(function () {
            const createPost = new CreatePost()

            createPost.addCreatePostSubmitListener(function () {
                this.remove(createPost)

                this.loadPosts()
                this.add(postsSection)
                this.add(addPostButton)
            }.bind(this))

            createPost.addCancelClickListener(function () {
                this.remove(createPost)
                this.add(postsSection)
                this.add(addPostButton)
            }.bind(this))

            this.remove(postsSection)
            this.remove(addPostButton)
            this.add(createPost)
        }.bind(this))
        this.add(addPostButton)
    }

    addLogoutClickListener(listener) {
        this.logoutClickListener = listener
    }

    loadUserName() {
        try {
            const name = logic.getUserName()

            this.welcome.setText(`Hello, ${name}!`)
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    loadPosts() {
        this.postsSection.container.innerHTML = ''

        try {
            const posts = logic.getPosts()

            for (let i = posts.length - 1; i > -1; i--) {
                const post = posts[i]

                const postArticle = new Article()

                const authorHeading = new Heading(3)
                authorHeading.setText(post.author)
                postArticle.add(authorHeading)

                const postImage = new Image()
                postImage.setUrl(post.image)
                postArticle.add(postImage)

                const postText = new Paragraph()
                postText.setText(post.text)
                postArticle.add(postText)

                const postDate = new Time()
                postDate.setText(post.createdAt.toISOString())
                postArticle.add(postDate)

                const likeButton = new Button()
                likeButton.setText(`${post.liked ? '♥️' : '🤍'} (${post.likesCount})`)
                likeButton.addClickListener(function () {
                    try {
                        logic.toggleLikePost(post.id)

                        // WARN
                        // if (likeButton.getText() === '🤍')
                        //     likeButton.setText('♥️')
                        // else
                        //     likeButton.setText('🤍')

                        this.loadPosts()
                    } catch (error) {
                        console.error(error)

                        alert(error.message)
                    }
                }.bind(this))
                postArticle.add(likeButton)

                this.postsSection.add(postArticle)
            }
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }
}