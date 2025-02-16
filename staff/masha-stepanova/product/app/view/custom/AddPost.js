class AddPost extends Section {
    constructor() {
        super()

        const logo = new Heading(1)
        logo.setText('Logo')
        this.add(logo)

        const explanation = new Paragraph()
        explanation.setText('To add new post you have to add the image link and a description to it. Try it now!')
        this.add(explanation)

        const form = new Form()
        form.container.style.display = 'flex'
        form.container.style.flexDirection = 'column'
        form.container.style.gap = '0.3rem'

        form.addSubmitListener(function (event) {
            event.preventDefault()

            const link = inputLink.getValue()
            const description = inputText.getValue()

            try {
                logic.addPost(link, description)

                form.clear()

                this.addSubmitButton()
            } catch (error) {
                console.log(error)

                alert(error.message)
            }
        }.bind(this))
        this.add(form)

        const labelLink = new Label()
        labelLink.setText('Add here a link to your image:')
        form.add(labelLink)

        const inputLink = new Input()
        inputLink.setType('text')
        form.add(inputLink)

        const labelText = new Label()
        labelText.setText('Add here a little description:')
        form.add(labelText)

        const inputText = new Input()
        inputText.setType('text')
        form.add(inputText)

        const submitButton = new Button()
        submitButton.setText('Add post')
        submitButton.setType('submit')
        form.add(submitButton)

        const cancelAnchor = new Anchor()
        cancelAnchor.setText('Cancel')
        cancelAnchor.addClickListener(function () {
            this.cancelClickListener()
        }.bind(this))
        this.add(cancelAnchor)
    }

    addPostSubmitListener = function (callback) {
        this.addSubmitButton = callback
    }

    addCancelClickListener = function (callback) {
        this.cancelClickListener = callback
    }
}
