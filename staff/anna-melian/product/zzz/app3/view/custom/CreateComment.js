class CreateComment extends Section {
    constructor(post, author) {
        super()

        const form = new Form()
        form.addSubmitListener(event => {
            event.preventDefault()

            try {
                const text = textInput.getValue()
                logic.addComment(post, author, text)

                form.clear()

                this.createCommentSubmitListener()
            } catch (error) {
                console.error(error)
                alert(error.message)
            }
        })
        this.add(form)

        const textLabel = new Label()
        textLabel.setText('Write your comment: ')
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
        this.createCommentSubmitListener = listener
    }

    addCancelClickListener(listener) {
        this.cancelClickListener = listener
    }
}