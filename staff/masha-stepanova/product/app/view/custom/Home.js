class Home extends Component {
    constructor() {
        super('div')

        const logo = new Heading(1)
        logo.setText('Logo')
        this.add(logo)

        const welcome = new Heading(3)
        welcome.setText('Welcome!')
        this.welcome = welcome
        this.add(welcome)

        const postsSection = new Section()
        this.add(postsSection)
        this.postsSection = postsSection

        const footer = new Footer()
        footer.container.style.display = 'flex'
        footer.container.style.position = 'fixed'
        footer.container.style.height = '40px'
        footer.container.style.bottom = '0'
        footer.container.style.width = '100%'
        footer.container.style.justifyContent = 'space-around'
        footer.container.style.alignItems = 'center'
        footer.container.style.backgroundColor = 'white'

        this.add(footer)

        const postButton = new Button()
        postButton.setText('➕')
        postButton.container.style.borderRadius = '50%'
        postButton.addClickListener(function () {
            this.addPostButton()
        }.bind(this))
        footer.add(postButton)

        const logoutButton = new Button()
        logoutButton.setText('Logout')
        logoutButton.addClickListener(function () {
            try {
                logic.logoutUser()

                this.logoutClickListener()
            } catch (error) {
                console.log(error)

                alert(error.message)
            }
        }.bind(this))
        footer.add(logoutButton)
    }

    addLogoutClickListener = function (listener) {
        this.logoutClickListener = listener
    }

    setWelcomeText = function (text) {
        this.welcome.setText(text)
    }

    addPostSubmitListener = function (callback) {
        this.addPostButton = callback
    }

    setPosts = function (posts) {
        this.postsSection.clear()
        for (var i = posts.length - 1; i >= 0; i--) {
            const post = posts[i]

            const postArticle = new Article()

            const authorHeading = new Heading(3)
            for (var j = 0; j < data.users.length; j++) {
                const user = data.users[j]
                if (post.author === user.id)
                    authorHeading.setText(user.username)
            }
            postArticle.add(authorHeading)

            const postImage = new Image()
            postImage.setUrl(post.image)
            postArticle.add(postImage)

            const postText = new Paragraph()
            postText.setText(post.text)
            postArticle.add(postText)

            const likeSection = new Section()

            const numberOfLikes = new Text()
            numberOfLikes.setText(post.likes.length)
            likeSection.add(numberOfLikes)

            const likeAnchor = new Anchor()
            if (!logic.isPostLikedByUser(post))
                likeAnchor.setText('🤍')
            else
                likeAnchor.setText('🩷')
            likeAnchor.addClickListener(function () {
                logic.likePost(post)

                if (this.innerText === '🤍') {
                    this.innerText = '🩷'
                    numberOfLikes.setText(post.likes.length)
                } else {
                    this.innerText = '🤍'
                    numberOfLikes.setText(post.likes.length)
                }
            })
            likeSection.add(likeAnchor)
            postArticle.add(likeSection)

            const postDate = new Time()
            postDate.setText(post.createdAt)
            postArticle.add(postDate)

            this.postsSection.add(postArticle)
        }
    }

}