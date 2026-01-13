class CreatePost extends Section {
    constructor() {
        super()

        const form = new Form()
        form.addSubmitListener(event => {
            event.preventDefault()

            try {
                const image = imageInput.getValue()
                const text = textInput.getValue()

                logic.createPost(image, text)

                form.clear()

                this.createPostSubmitListener()
            } catch (error) {
                console.error(error)

                alert(error.message)
            }
        })
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
        cancelAnchor.addClickListener(() => {
            form.clear()

            this.cancelClickListener()
        })
        this.add(cancelAnchor)
    }

    addCreatePostSubmitListener(listener) {
        this.createPostSubmitListener = listener
    }

    addCancelClickListener(listener) {
        this.cancelClickListener = listener
    }
}