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

    var postSection = new Section()
    this.add(postSection) 
    this.postSection = postSection
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

        this.postSection.add(postArticle)
        
    }
}