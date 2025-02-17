class Home extends Component {
    constructor() {
        super('div')

        var logo = new Heading(1)
        this.add(logo)

        logo.setText('Logo')

        var greeting = new Heading(3)
        greeting.setText('Hello User!')
        this.add(greeting)
        this.greeting = greeting

        var logoutButton = new Button()
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

        var postsSection = new Section()
        this.add(postsSection)
        this.postsSection = postsSection

        var addPostButton = new Button()
        addPostButton.setText('+')
        addPostButton.addClickListener(function () {
            var createPost = new CreatePost()

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

    addLogoutClickListener = function (listener) {
        this.logoutClickListener = listener
    }
    loadUserName = function () {
        try {
            const name = logic.getUserName()

            this.greeting.setText(`Hello, ${name} !`)
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    loadPosts = function () {
        this.postsSection.container.innerHTML = ''

        try {
            const posts = logic.getPosts()

            for (var i = posts.length - 1; i > -1; i--) {
                var post = posts[i]

                var postArticle = new Article()

                var authorHeading = new Heading(3)
                authorHeading.setText(post.author)
                postArticle.add(authorHeading)

                var postImage = new Image()
                postImage.setUrl(post.image)
                postArticle.add(postImage)

                var postText = new Paragraph()
                postText.setText(post.text)
                postArticle.add(postText)

                var postDate = new Time()
                postDate.setText(post.createdAt.toISOString())
                postArticle.add(postDate)

                this.postsSection.add(postArticle)
            }
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    setGreetingText = function (text) {
        this.greeting.setText(text)
    }


}