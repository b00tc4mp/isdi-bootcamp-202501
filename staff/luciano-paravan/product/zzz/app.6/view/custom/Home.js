function Home () {
    //debugger
    Component.call(this, 'div')

    var logo = new Heading(1)
    logo.setText('Logo')
    this.add(logo)
    
    var welcome = new Heading(2)
    welcome.setText('Welcome!')
    this.add(welcome)
    this.welcome = welcome

    var logoutButton = new Button()
    logoutButton.setText('Log out')
    logoutButton.container.style.color = '#FFFFFF'
    logoutButton.container.style.backgroundColor = '#428A82'
    this.add(logoutButton)
    
    logoutButton.addClickListener(function () {
        try {
            logic.logoutUser() 

            this.logoutClickListener()
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
        
    }.bind(this))

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

Home.prototype = Object.create(Component.prototype)
Home.prototype.constructor = Home

Home.prototype.addLogoutClickListener = function (listener) {
    this.logoutClickListener = listener
}

Home.prototype.loadUserName = function () {
    try {
        const name = logic.getUserName()

        this.welcome.setText(`Hello, ${name}!`)
    } catch (error) {
        console.error(error)

        alert(error.message)
    }
    
}

Home.prototype.loadPosts = function () {
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

            this.postsSection.add(postArticle)        }
    } catch (error) {
        console.error(error)

        alert(error.message)
    }
    
}

