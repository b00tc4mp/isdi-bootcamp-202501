class CreatePost extends (updatePostsCallback) {
    constructor() {
        super('div')

        this.updatePostsCallback = updatePostsCallback

        const form = new Form()
        form.container.style.display = 'flex'
        form.container.style.flexDirection = 'column'
        form.container.style.justifyContent = 'left'
        form.container.style.gap = '5px'
        this.add(form)

        const postTextLabel = new Label()
        postTextLabel.setText('Text')
        form.add(postTextLabel)

        const textInput = new Input()
        textInput.setType('text')
        textInput.container.style.width = '350px'
        form.add(textInput)

        const postImageLabel = new Label()
        postImageLabel.setText('Post Image')
        form.add(postImageLabel)

        const imageInput = new Input()
        imageInput.setType('text')
        imageInput.container.style.width = '350px'
        form.add(imageInput)

        const createPostButton = new Button()
        createPostButton.setType('submit')
        createPostButton.setText('Create')
        createPostButton.container.style.width = '80px'
        form.add(createPostButton)

        form.addSubmitListener(function (event) {
            event.preventDefault()

            const postText = textInput.getValue()
            const postImage = imageInput.getValue()

            try {
                logic.createPost(postText, postImage)

                form.clear()

                alert('Post created!')

                this.createPostSubmitListener()

                //REFRESCAR POSTS
                if (this.updatePostsCallback) {
                    const updatedPosts = logic.getPosts()
                    this.updatePostsCallback(updatedPosts)
                }
            } catch (error) {
                console.error(error)

                alert(error.message)
            }
        }.bind(this))

    }

    addCreatePostSubmitListener(listener) {
        this.createPostSubmitListener = listener
    }
}
