// ****  HOME 

function Home() {
    Component.call(this, 'div')

    var logo = new Heading(1)
    logo.setText('Home')
    this.add(logo)

    // Texto de bienvenida
    var welcome = new Heading(2)
    welcome.setText('Hello, World')
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
}

Home.prototype = Object.create(Component.prototype)
Home.prototype.constructor = Home

// Creamos un metodo para el cambio de ventana
Home.prototype.addLogoutClickListener = function (listener) {
    this.logoutClickListener = listener
}

Home.prototype.setWelcomeText = function (text) {
    this.welcome.setText(text)
}

// Bucle que genera el Post con toda la informacion
Home.prototype.setPosts = function (posts) {
    for (var i = 0; i < posts.length; i++) {
        var post = posts[i]
        body.container = document.body

        var postArticle = new Article()

        // Crea el texto con el nombre del Autor del post
        var authorHeading = new Heading(4)
        authorHeading.setText(post.author)
        postArticle.add(authorHeading)

        // Crea la Imagen del post
        var postImage = new Image()
        postImage.setUrl(post.image)
        postArticle.add(postImage)
        postImage.container.style.maxWidth = '600px'

        // Crea el texto escrito por el Autor del post
        var postText = new Paragraph()
        postText.setText(post.text)
        postArticle.add(postText)

        // Crea la fecha de subida del post
        var postDate = new Time()
        postDate.setText(post.createdAt.toLocaleDateString())
        postArticle.add(postDate)

        // Añade el PostArticle al PostsSection
        this.postsSection.add(postArticle)
    }

}

