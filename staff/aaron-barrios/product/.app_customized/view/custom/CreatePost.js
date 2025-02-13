function CreatePost() {
    Component.call(this, 'div')

    var form = new Form()
    form.container.style.display = 'flex'
    form.container.style.flexDirection = 'column'
    form.container.style.justifyContent = 'left'
    form.container.style.gap = '5px'
    this.add(form)

    var postTextLabel = new Label()
    postTextLabel.setText('Text')
    form.add(postTextLabel)

    var textInput = new Input()
    textInput.setType('text')
    textInput.container.style.width = '350px'
    form.add(textInput)

    var postImageLabel = new Label()
    postImageLabel.setText('Post Image')
    form.add(postImageLabel)

    var imageInput = new Input()
    imageInput.setType('text')
    imageInput.container.style.width = '350px'
    form.add(imageInput)

    var createPostButton = new Button()
    createPostButton.setType('submit')
    createPostButton.setText('Create')
    createPostButton.container.style.width = '80px'
    form.add(createPostButton)

    form.addSubmitListener(function (event) {
        event.preventDefault()

        var postText = textInput.getValue()
        var postImage = imageInput.getValue()

        try {
            logic.createPost(postText, postImage)

            form.clear()

            alert('Post created!')

            this.createPostSubmitListener()

            //añadir aqui
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }.bind(this))

}

CreatePost.prototype = Object.create(Component.prototype)
CreatePost.prototype.constructor = CreatePost

CreatePost.prototype.addCreatePostSubmitListener = function (listener) {
    this.createPostSubmitListener = listener
}