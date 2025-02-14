function Home() {
    Component.call(this, 'div')

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
        logic.logoutUser()

        this.logoutClickListener()
    }.bind(this))
    header.add(logoutButton)

    //MAIN HOME
    const main = new Main()
    this.add(main)

    const postsSection = new Section()
    main.add(postsSection)
    this.postsSection = postsSection

    const createPostButton = new Button()
    createPostButton.setText('🧉')
    createPostButton.addClickListener(function () {
        this.createPostClickListener()
    }.bind(this))
    main.add(createPostButton)
}

Home.prototype = Object.create(Component.prototype)
Home.prototype.constructor = Home

Home.prototype.setWelcomeText = function (text) {
    this.welcome.setText(text)
}

Home.prototype.addLogoutClickListener = function (listener) {
    this.logoutClickListener = listener
}

Home.prototype.addCreatePostClickListener = function (listener) {
    this.createPostClickListener = listener
}

Home.prototype.setPosts = function (posts) {
    //LIMPIAR TODOS LOS POSTS AL REFRESCAR
    this.postsSection.container.innerHTML = ''

    for (let i = posts.length - 1; i >= 0; i--) {
        const post = posts[i]

        const postArticle = new Article()
        postArticle.container.style.width = '100%'
        postArticle.container.style.padding = '10px'
        postArticle.container.style.border = '1px solid #ccc'
        postArticle.container.style.borderRadius = '5px'
        postArticle.container.style.backgroundColor = '#f9f9f9'
        //poner gap

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
}