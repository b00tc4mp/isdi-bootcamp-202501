function Home() {
    Component.call(this, "div");

    var logo = new Heading(1);
    logo.setText("Logo");
    this.add(logo);

    var welcomeUsername = new Heading(3)
    this.add(welcomeUsername)
    this.welcomeUsername = welcomeUsername


    var logoutButton = new Button
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

    var postArticleDiv = new Section();
    postArticleDiv.container.style.display = 'flex'
    postArticleDiv.container.style.flexDirection = 'column'
    postArticleDiv.container.style.width = '500px'
    postArticleDiv.container.style.textAlign = 'justify'
    this.add(postArticleDiv)
    this.postArticleDiv = postArticleDiv

    var footer = new Footer()
    footer.container.style.position = 'fixed'
    footer.container.style.bottom = '0';
    footer.container.style.left = '0';
    footer.container.style.width = '100%';
    footer.container.style.display = 'flex'
    footer.container.style.justifyContent = 'center'
    this.add(footer)

    var addPostButton = new Button()
    addPostButton.setText('+')
    addPostButton.container.style.fontSize = '30px'
    addPostButton.container.style.display = 'flex'
    addPostButton.container.style.justifyContent = 'center'
    addPostButton.container.style.marginBottom = '10px'
    addPostButton.addClickListener(function () {
        try {
            this.createPostClickListener()
        } catch (error) {
            console.error(error)
            alert(error)
        }
    }.bind(this))
    footer.add(addPostButton)
}

Home.prototype = Object.create(Component.prototype);
Home.prototype.constructor = Home;

Home.prototype.addLogoutClickListener = function (listener) {
    this.logoutClickListener = listener
}

Home.prototype.setWelcomeText = function (text) {
    this.welcomeUsername.setText(text)
}

Home.prototype.setPosts = function (posts) {
    for (var i = posts.length - 1; i >= 0; i--) {
        var { authorId, imageSrc, textDescription, createdAt } = posts[i]

        var post = new Post(authorId, imageSrc, textDescription, createdAt);
        this.postArticleDiv.add(post);
    }
}

Home.prototype.addCreatePostClickListener = function (listener) {
    this.createPostClickListener = listener
}