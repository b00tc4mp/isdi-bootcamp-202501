function Home() {
    Component.call(this, 'div')

    var logo = new Heading(1)
    logo.setText('Logo')
    this.add(logo)

    var welcome = new Heading(3)
    welcome.setText('Welcome!')
    this.welcome = welcome
    this.add(welcome)

    var postsSection = new Section()
    this.add(postsSection)
    this.postsSection = postsSection

    var footer = new Footer()
    footer.container.style.display = 'flex'
    footer.container.style.position = 'fixed'
    footer.container.style.height = '40px'
    footer.container.style.bottom = '0'
    footer.container.style.width = '100%'
    footer.container.style.justifyContent = 'space-around'
    footer.container.style.alignItems = 'center'
    footer.container.style.backgroundColor = 'white'

    this.add(footer)

    var postButton = new Button()
    postButton.setText('➕')
    postButton.container.style.borderRadius = '50%'
    postButton.addClickListener(function () {
        this.addPostButton()
    }.bind(this))
    footer.add(postButton)

    var logoutButton = new Button()
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

Home.prototype = Object.create(Component.prototype)
Home.prototype.constructor = Home

Home.prototype.addLogoutClickListener = function (listener) {
    this.logoutClickListener = listener
}

Home.prototype.setWelcomeText = function (text) {
    this.welcome.setText(text)
}

Home.prototype.addPostSubmitListener = function (callback) {
    this.addPostButton = callback
}

Home.prototype.setPosts = function (posts) {
    this.postsSection.clear()
    for (var i = posts.length - 1; i >= 0; i--) {
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
        postDate.setText(post.createdAt)
        postArticle.add(postDate)

        var likeAnchor = new Anchor()
        likeAnchor.setText('🤍')
        likeAnchor.addClickListener(function () {
            this.innerText = (this.innerText === '🤍' ? '🩷' : '🤍')
        })
        postArticle.add(likeAnchor)

        this.postsSection.add(postArticle)
    }
}
