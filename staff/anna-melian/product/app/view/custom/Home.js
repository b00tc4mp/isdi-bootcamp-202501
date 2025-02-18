class Home extends Component {
    constructor() {
        super('div')

        const logo = new Heading(1)
        this.add(logo)

        logo.setText('Logo')

        const greeting = new Heading(3)
        greeting.setText('Hello User!')
        this.add(greeting)
        this.greeting = greeting

        const logoutButton = new Button()
        logoutButton.setText('Logout')
        logoutButton.addClickListener(() => {
            try {
                logic.logoutUser()

                this.logoutClickListener()
            } catch (error) {
                console.error(error)

                alert(error.message)
            }
        })
        this.add(logoutButton)

        const postsSection = new Section()
        this.add(postsSection)
        this.postsSection = postsSection

        const addPostButton = new Button()
        addPostButton.setText('+')
        addPostButton.addClickListener(() => {
            const createPost = new CreatePost()

            createPost.addCreatePostSubmitListener(() => {
                this.remove(createPost)

                this.loadPosts()
                this.add(postsSection)
                this.add(addPostButton)
            })

            createPost.addCancelClickListener(() => {
                this.remove(createPost)
                this.add(postsSection)
                this.add(addPostButton)
            })

            this.remove(postsSection)
            this.remove(addPostButton)
            this.add(createPost)
        })
        this.add(addPostButton)
    }

    addLogoutClickListener(listener) {
        this.logoutClickListener = listener
    }
    loadUserName() {
        try {
            const name = logic.getUserName()

            this.greeting.setText(`Hello, ${name} !`)
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    loadPosts() {
        this.postsSection.container.innerHTML = ''

        try {
            const posts = logic.getPosts()

            for (let i = posts.length - 1; i > -1; i--) {
                const post = posts[i]
                const authorUsername = logic.getAuthorUsername(post)

                const postArticle = new Article()

                //username author
                const authorHeading = new Heading(3)
                authorHeading.setText(authorUsername)
                postArticle.add(authorHeading)

                //image
                const postImage = new Image()
                postImage.setUrl(post.image)
                postArticle.add(postImage)


                //Caption
                const postText = new Paragraph()
                postText.setText(post.text)
                postArticle.add(postText)

                //like button
                const likeButton = new Button()
                likeButton.setText(`${post.liked ? '💙' : '🤍'} (${post.likesCount})`)
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


                // comment section

                const commentsSection = new Section()
                if (post.comments.length != 0) {
                    const comments = logic.getComments(post)
                    for (let i = 0; i < comments.length; i++) {
                        const comment = new Paragraph()
                        comment.setText(comments[i])
                        commentsSection.add(comment)
                    }
                }

                postArticle.add(commentsSection)

                //comment button
                const commentAuthor = logic.getCommentCreator()
                const commentButton = new Button()
                commentButton.setText('💬')
                commentButton.addClickListener(() => {
                    const createComment = new CreateComment(post, commentAuthor)

                    createComment.addCreatePostSubmitListener(() => {
                        postArticle.remove(createComment)
                        this.loadPosts()
                    })

                    createComment.addCancelClickListener(() => {
                        postArticle.remove(createComment)
                    })
                    postArticle.remove(commentButton)
                    postArticle.add(createComment)


                })

                postArticle.add(commentButton)


                //Date
                const postDate = new Time()
                postDate.setText(post.createdAt.toISOString())
                postArticle.add(postDate)

                this.postsSection.add(postArticle)
            }
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

}