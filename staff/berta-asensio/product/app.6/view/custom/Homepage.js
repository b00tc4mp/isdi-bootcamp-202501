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
    this.add(addPostButton)
    this.addPostButton = addPostButton

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

Home.prototype.setWelcomeText = function(text) {
    this.welcome.setText(text)
}

Home.prototype.setPosts = function(posts) {
    for (var i = 0; i < posts.length; i++) {
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
}

