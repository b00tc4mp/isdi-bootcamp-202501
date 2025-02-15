class CreatePost extends Section {
    constructor() {
        super()

        const logo = new Heading(1)
        logo.setText("Logo")
        this.add(logo)

        const inputForm = new Form()
        inputForm.setId("create-post")
        inputForm.addSubmitListener((event) => {
            event.preventDefault()

            const imageSrc = imageInput.getValue()
            const textDescription = descriptionInput.getValue()
            try {
                logic.createNewPost(imageSrc, textDescription)

                inputForm.clear()

                alert('Post created')

                this.createPostSubmitListener()
            } catch (error) {
                console.error(error)
                alert(error.message)
            }
        })
        inputForm.container.style.display = "flex"
        inputForm.container.style.flexDirection = "column"
        this.add(inputForm)
        const imageLabel = new Label()
        imageLabel.setHtmlFor("image-route")
        imageLabel.setText("Image route")
        inputForm.add(imageLabel)

        const imageInput = new Input()
        imageInput.setType("url")
        imageInput.setId("image-route")
        imageInput.setPlaceholder('image route')
        inputForm.add(imageInput)

        const descriptionLabel = new Label()
        descriptionLabel.setHtmlFor("description")
        descriptionLabel.setText("Description")
        inputForm.add(descriptionLabel)

        const descriptionInput = new Input()
        descriptionInput.setType("text")
        descriptionInput.setId("description")
        descriptionInput.setPlaceholder('description')
        inputForm.add(descriptionInput)

        inputForm.container.querySelectorAll("input").forEach((child) => {
            child.style.width = "300px"
        })

        const bubttonsDiv = new Div()
        bubttonsDiv.container.style.width = '310px'
        bubttonsDiv.container.style.marginTop = '15px'
        bubttonsDiv.container.style.display = 'flex'
        bubttonsDiv.container.style.justifyContent = 'space-between'
        inputForm.add(bubttonsDiv)

        const cancelAnchor = new Anchor()
        cancelAnchor.setText("Cancel")
        bubttonsDiv.add(cancelAnchor)
        cancelAnchor.addClickListener(() => {
            this.cancelClickListener()
        })

        const createButton = new Button()
        createButton.setType("submit")
        createButton.setForm("create-post")
        createButton.setText("Create")
        bubttonsDiv.add(createButton)
    }

    addCreatePostSubmitListener(listener) {
        this.createPostSubmitListener = listener
    }

    addCancelClickListener(listener) {
        this.cancelClickListener = listener
    }
}