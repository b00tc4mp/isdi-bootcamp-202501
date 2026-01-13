function Home() {
    Component.call(this, 'div')

    var logo = new Heading(1)
    logo.setText('Logo')
    this.add(logo)

    var welcome = new Heading(2)
    welcome.setText('Hello, World!')
    this.add(welcome)
    this.welcome = welcome

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
    this.add(addPostButton)
}

Home.prototype = Object.create(Component.prototype)
Home.prototype.constructor = Home

Home.prototype.addLogoutClickListener = function (listener) {
    this.logoutClickListener = listener
}

Home.prototype.setWelcomeText = function (text) {
    this.welcome.setText(text)
}

Home.prototype.setPosts = function (posts) {
    for (var i = 0; i < posts.length; i++) {
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
}