function CreatePost() {
    Section.call(this)

    var form = new Form()
    form.addSubmitListener(function(event) {
        event.preventDefault()

        try {
            var image = imageInput.getValue()
            var text = textInput.getValue()

            logic.createPost(image, text)

            form.clear()

            this.createPostSubmitListener()
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }.bind(this))
    this.add(form)

    const imageLabel = new Label()
    imageLabel.setText('Image')
    form.add(imageLabel)

    const imageInput = new Input()
    imageInput.setType('url')
    form.add(imageInput)

    const textLabel = new Label()
    textLabel.setText('Text')
    form.add(textLabel)

    const textInput = new Input()
    textInput.setType('text')
    form.add(textInput)

    const submitButton = new Button()
    submitButton.setText('Create')
    submitButton.setType('submit')
    form.add(submitButton)

    const cancelAnchor = new Anchor()
    cancelAnchor.setText('Cancel')
    cancelAnchor.addClickListener(function() {
        form.clear()

        this.cancelClickListener()
    }.bind(this))
    this.add(cancelAnchor)
}

CreatePost.prototype = Object.create(Section.prototype)
CreatePost.prototype.constructor = CreatePost

CreatePost.prototype.addCreatePostSubmitListener = function(listener) {
    this.createPostSubmitListener = listener
}

CreatePost.prototype.addCancelClickListener = function(listener) {
    this.cancelClickListener = listener
}