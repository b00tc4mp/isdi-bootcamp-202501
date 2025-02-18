class CreatePost extends Section {
    constructor() {
        super()

        const modalContent = new Section()
        modalContent.container.style.backgroundColor = 'white'
        modalContent.container.style.padding = '20px'
        modalContent.container.style.borderRadius = '8px'
        modalContent.container.style.width = '400px'
        modalContent.container.style.display = 'flex'
        modalContent.container.style.flexDirection = 'column'
        modalContent.container.style.alignItems = 'center'
        this.add(modalContent)

        const createPostTitle = new Heading(2)
        createPostTitle.setText("Create new post")
        modalContent.add(createPostTitle)

        const inputForm = new Form()
        inputForm.setId("create-post")
        inputForm.addSubmitListener(event => {
            event.preventDefault()

            const imageSrc = imageInput.getValue()
            const textDescription = descriptionInput.getValue()
            try {
                logic.createNewPost(imageSrc, textDescription)

                inputForm.clear()

                alert('Post created')

                this.createPostSubmitListener()
            } catch (error) {
                logic.helper.handleError(error)
            }
        })
        inputForm.container.style.display = "flex"
        inputForm.container.style.flexDirection = "column"
        modalContent.add(inputForm)

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

        inputForm.container.querySelectorAll("input").forEach(child => {
            child.style.width = "300px"
        })

        const buttonsDiv = new Div()
        buttonsDiv.container.style.width = '310px'
        buttonsDiv.container.style.marginTop = '15px'
        buttonsDiv.container.style.display = 'flex'
        buttonsDiv.container.style.justifyContent = 'space-between'
        inputForm.add(buttonsDiv)

        const cancelAnchor = new Anchor()
        cancelAnchor.setText("Cancel")
        buttonsDiv.add(cancelAnchor)
        cancelAnchor.addClickListener(() => {
            this.cancelClickListener()
        })

        const createButton = new Button()
        createButton.setType("submit")
        createButton.setForm("create-post")
        createButton.setText("Create")
        buttonsDiv.add(createButton)
    }

    addCreatePostSubmitListener(listener) {
        this.createPostSubmitListener = listener
    }

    addCancelClickListener(listener) {
        this.cancelClickListener = listener
    }
}