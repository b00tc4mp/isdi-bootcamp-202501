class Home extends Component {
    constructor() {
        super('div')

        const logo = new Heading(1)
        logo.setText('Bee you')
        this.add(logo)

        const welcome = new Heading(2)
        welcome.setText('Hello, World!')
        this.add(welcome)
        this.welcome = welcome

        const postSection = new Section()
        this.add(postSection)
        this.postSection = postSection  //esto me permite acceder a esta seccion desde cualquier lugar.

        const addPostButton = new Button()
        addPostButton.setText('+')
        addPostButton.addClickListener(() => {

            const createPost = new CreatePost()

            createPost.addCreatePostSubmitListener(() => {
                this.remove(createPost)

                this.loadPosts()
                this.add(postSection)
                this.add(addPostButton)
            })

            createPost.addCancelClickListener(() => {
                this.remove(createPost)
                this.add(postSection)
                this.add(addPostButton)
            })

            this.remove(postSection)
            this.remove(addPostButton)
            this.add(createPost)
        })

        this.add(addPostButton)

        //logout anchor

        const logoutAnchor = new Anchor()
        logoutAnchor.setText('Logout')
        logoutAnchor.addClickListener(() => {
            try {
                logic.logoutUser()

                this.logoutClickListener()

            } catch (error) {
                console.error(error)

                alert(error.message)
            }
        })

        this.add(logoutAnchor)

    }


    addLogoutClickListener(listener) {
        this.logoutClickListener = listener
    }

    loadUserName() {
        try {
            const name = logic.getUserName()

            this.welcome.setText(`Hello ${name} !`)
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    loadPosts() {
        this.postSection.container.innerHTML = ''  //limpiamos la pantalla, porque asi cuando se refresque no nos repita los posts

        try {
            const posts = logic.getPosts()

            for (let i = posts.length - 1; i > -1; i--) {
                const post = posts[i]

                const postArticle = new Article()

                const authorHeading = new Heading(3)
                authorHeading.setText(post.author)
                postArticle.add(authorHeading)  //ponemos la cabecera en el article

                const postImage = new Image()
                postImage.setSrc(post.image)
                postArticle.add(postImage) //ponemos la imagen dentro del article

                const postText = new Paragraph()
                postText.setText(post.text)
                postArticle.add(postText)

                const postDate = new Time()
                postDate.setText(post.createdAt.toISOString())  //debemos convertirlo a String porque la fecha es un objeto
                postArticle.add(postDate)

                const likeButton = new Button()
                likeButton.setText(`${post.liked? '❤️':'🤍'} (${post.totalLikes})`)
                likeButton.addClickListener(() => {
                    try {
                        logic.toggleLikePost(post.id)
                        
                        this.loadPosts()
                    } catch (error) {
                        console.error(error)

                        alert(error.message)
                    }
                })
                postArticle.add(likeButton)

                this.postSection.add(postArticle)
            }
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }
}
