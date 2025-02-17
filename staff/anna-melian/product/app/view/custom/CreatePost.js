class CreatePost extends Section {
    constructor() {
        super()

        var form = new Form()
        form.addSubmitListener(function (event) {
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

        var imageLabel = new Label()
        imageLabel.setText('Image')
        form.add(imageLabel)

        var imageInput = new Input()
        imageInput.setType('url')
        form.add(imageInput)

        var textLabel = new Label()
        textLabel.setText('Text')
        form.add(textLabel)

        var textInput = new Input()
        textInput.setType('text')
        form.add(textInput)

        var submitButton = new Button()
        submitButton.setText('Create')
        submitButton.setType('submit')
        form.add(submitButton)

        var cancelAnchor = new Anchor()
        cancelAnchor.setText('Cancel')
        cancelAnchor.addClickListener(function () {
            form.clear()

            this.cancelClickListener()
        }.bind(this))
        this.add(cancelAnchor)

    }

    addCreatePostSubmitListener(listener) {
        this.createPostSubmitListener = listener
    }

    addCancelClickListener(listener) {
        this.cancelClickListener = listener
    }

}



/*


    like.setText('🤍')
    like.addClickListener(function () {
        like.container.innerText = like.container.innerText === '🤍' ? '💙' : '🤍'
    })

*/