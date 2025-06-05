function Home() {
    Component.call(this, 'div')

    var logo = new Heading(1)
    logo.setText('Bee you')
    this.add(logo)

    var welcome = new Heading(2)
    welcome.setText('Hello, World!')
    this.add(welcome)
    this.welcome = welcome

    var postSection = new Section()
    this.add(postSection)
    this.postSection = postSection  //esto me permite acceder a esta seccion desde cualquier lugar.

    var addPostButton = new Button()
    addPostButton.setText('+')
    addPostButton.addClickListener(function() {

        var createPost = new CreatePost()

        createPost.addCreatePostSubmitListener(function() {
            this.remove(createPost)

            this.loadPosts()
            this.add(postSection)
            this.add(addPostButton)
        }.bind(this))

        this.remove(postSection)
        this.remove(addPostButton)
        this.add(createPost)
    }.bind(this))

    this.add(addPostButton)

    //logout anchor

    var logoutAnchor = new Paragraph()
    logoutAnchor.setText('Logout')
    logoutAnchor.addClickListener(function() {
        try {
            logic.logoutUser()

            this.logoutClickListener()

        } catch(error) {
            console.error(error)

            alert(error.message)
        }
    }.bind(this))

    this.add(logoutAnchor)

}

Home.prototype = Object.create(Component.prototype)
Home.prototype.constructor = Home

Home.prototype.addLogoutClickListener = function(listener) {
    this.logoutClickListener = listener
}

Home.prototype.loadUserName = function() {
    try {
        var name = logic.getUserName()

        this.welcome.setText('Hello ' + name + '!')
    } catch (error) {
        console.error(error)

        alert(error.message)
    }
}

Home.prototype.loadPosts = function() {
    this.postSection.container.innerHTML = ''  //limpiamos la pantalla, porque asi cuando se refresque no nos repita los posts

    try {
        var posts = logic.getPosts()

        for (var i = posts.length - 1; i > -1; i--) {
            var post = posts[i]

            var postArticle = new Article()

            var authorHeading = new Heading(3)
            authorHeading.setText(post.author)
            postArticle.add(authorHeading)  //ponemos la cabecera en el article

            var postImage = new Image()
            postImage.setSrc(post.image)
            postArticle.add(postImage) //ponemos la imagen dentro del article

            var postText = new Paragraph()
            postText.setText(post.text)
            postArticle.add(postText)

            var postDate = new Time()
            postDate.setText(post.createdAt.toISOString())  //debemos convertirlo a String porque la fecha es un objeto
            postArticle.add(postDate)

            this.postSection.add(postArticle)
        }
    } catch(error) {
        console.error(error)

        alert(error.message)
    }
}

