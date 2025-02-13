function Home() {
    Component.call(this, 'div')

    //Header
    var header = new Header()
    header.container.style.width = '100%'
    header.container.style.height = '50px'
    header.container.style.margin = '10px'
    header.container.style.display = 'flex'
    header.container.style.justifyContent = 'space-between'
    header.container.style.alignItems = 'center'
    this.add(header)

    var welcome = new Heading(2)
    welcome.setText('Logo')
    header.add(welcome)
    this.welcome = welcome

    var logoutButton = new Button()
    logoutButton.setText('Logout')
    logoutButton.container.style.width = '100px'
    logoutButton.container.style.height = '35px'
    logoutButton.container.style.marginRight = '10px'
    logoutButton.addClickListener(function () {
        logic.logoutUser()

        this.logoutClickListener()
    }.bind(this))
    header.add(logoutButton)

    //MAIN HOME
    var main = new Main()
    this.add(main)

    var postsSection = new Section()
    main.add(postsSection)
    this.postsSection = postsSection

    var createPostButton = new Button()
    createPostButton.addClickListener(function () {
        logic.createPost()

        //refrescar vista
    })
    main.add(createPostButton)
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
    //LIMPIAR TODOS LOS POSTS AL REFRESCAR
    this.postsSection.container.innerHTML = ''

    for (var i = 0; i < posts.length; i++) {
        var post = posts[i]

        var postArticle = new Article()
        postArticle.container.style.width = '100%'
        postArticle.container.style.padding = '10px'
        postArticle.container.style.border = '1px solid #ccc'
        postArticle.container.style.borderRadius = '5px'
        postArticle.container.style.backgroundColor = '#f9f9f9'
        //poner gap

        var authorHeading = new Heading(3)
        authorHeading.setText(postArticle.author)
        postArticle.add(authorHeading)

        var postImage = new Image()
        postImage.setUrl(post.image)
        postImage.container.style.width = '100%'
        postImage.container.style.height = 'auto'
        postImage.container.style.objectFit = 'cover'
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