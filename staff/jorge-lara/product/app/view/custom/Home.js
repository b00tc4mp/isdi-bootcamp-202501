function Home() {
    Component.call(this, 'div');

    let logoHome = new Heading(1);
    logoHome.setText('Home');
    this.add(logoHome);

    let userLogged = new Heading(2);
    this.add(userLogged);
    this.userLogged = userLogged;

    let signOutButton = new Button();
    signOutButton.setText('Sign out');
    this.add(signOutButton);


    signOutButton.addClickListener(function () {
        try {
            logic.logoutUser();

            this.logoutClickListener();
        } catch (error) {
            console.error(error);

            alert(error.message);
        }
    }.bind(this))

    let addPostButton = new Button();
    addPostButton.setText('+');
    this.add(addPostButton);

    addPostButton.addClickListener(function () {
        try {
            this.postClickListener();
        } catch (error) {
            console.error(error);

            alert(error.message);
        }
    }.bind(this))

    let postsSection = new Section();
    postsSection.setOrientation('flex', 'column');
    postsSection.container.style.width = '250px';
    this.add(postsSection);
    this.postsSection = postsSection;
}

Home.prototype = Object.create(Component.prototype);
Home.prototype.constructor = Home;

Home.prototype.addSignoutClickListener = function (listener) {
    this.logoutClickListener = listener;
}

Home.prototype.addPostClickListener = function (listener) {
    this.postClickListener = listener;
}

Home.prototype.setUserLoggedText = function (text) {
    this.userLogged.setText(text);
}

Home.prototype.setPosts = function (posts) {
    this.postsSection.container.innerHTML ='';
    for (const post of posts) {
        let postArticle = new Article();

        let authorHeading = new Heading(3);
        authorHeading.setText(post.author);
        postArticle.add(authorHeading);

        let postImage = new Image();
        postImage.setUrl(post.image);
        postArticle.add(postImage);

        let postText = new Paragraph();
        postText.setText(post.text);
        postArticle.add(postText);

        let postDate = new Time();
        postDate.setText(post.createdAt.toISOString());
        postArticle.add(postDate);

        this.postsSection.add(postArticle);
    }
}