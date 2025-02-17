class Home extends Component {
    constructor() {
        super('div');

        const logoHome = new Heading(1);
        logoHome.setText('Home');
        this.add(logoHome);

        const userLogged = new Heading(2);
        this.add(userLogged);
        this.userLogged = userLogged;

        const signOutButton = new Button();
        signOutButton.setText('Sign out');

        signOutButton.addClickListener(() => {
            try {
                logic.logoutUser();

                this.logoutClickListener();
            } catch (error) {
                console.error(error);

                alert(error.message);
            }
        })
        this.add(signOutButton);

        const addPostButton = new Button();
        addPostButton.setText('+');
        this.add(addPostButton);

        addPostButton.addClickListener(() => {
            try {
                this.postClickListener();
            } catch (error) {
                console.error(error);

                alert(error.message);
            }
        })

        const postsSection = new Section();
        postsSection.setOrientation('flex', 'column');
        postsSection.container.style.width = '250px';
        this.add(postsSection);
        this.postsSection = postsSection;

    }
    addSignoutClickListener(listener) {
        this.logoutClickListener = listener;
    }

    addPostClickListener(listener) {
        this.postClickListener = listener;
    }

    setUserLoggedText(text) {
        this.userLogged.setText(text);
    }

    loadPosts() {
        this.postsSection.container.innerHTML = '';
        try {
            const posts = logic.getPosts();

            for (const post of posts.slice().reverse()) {
                const postArticle = new Article();

                const authorHeading = new Heading(3);
                authorHeading.setText(post.author);
                postArticle.add(authorHeading);

                const postImage = new Img();
                postImage.setUrl(post.image);
                postArticle.add(postImage);

                const postText = new Paragraph();
                postText.setText(post.text);
                postArticle.add(postText);

                const postDate = new Time();
                postDate.setText(post.createdAt.toISOString());
                postArticle.add(postDate);

                const likeButton = new Button();
                likeButton.setText(`${post.liked ? '❤️' : '🤍'} (${post.likesCount})`);
                likeButton.addClickListener(() => {
                    try {
                        logic.toggleLikePost(post.id);

                        this.loadPosts();
                    } catch (error) {
                        console.log(error);

                        alert(error);
                    }
                })
                postArticle.add(likeButton);

                this.postsSection.add(postArticle);
            }
        } catch (error) {
            console.log(error);

            alert.message(error);
        }
    }
}