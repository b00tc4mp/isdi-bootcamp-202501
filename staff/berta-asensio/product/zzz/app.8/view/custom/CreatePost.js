//El create post se heredará de Section, no será una página nueva: (Create post viene de section y section de component )
class CreatePost extends Section {
    constructor() {
        super()
    
        const form = new Form()
        form.addSubmitListener(function (event) {
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
        submitButton.setText('Add post')
        submitButton.setType('submit')
        form.add(submitButton)

        //creamos un anchor para volver atrás (cancelar)
        const cancelAnchor = new Anchor()
        cancelAnchor.setText('Cancel')
        cancelAnchor.addClickListener(function() {
            form.clear()

            this.cancelClickListener()
        }.bind(this))
        this.add(cancelAnchor) //no lo añadimos dentro del form, sino fuera, en la pagina.
    }


    addCreatePostSubmitListener(listener) {
        this.createPostSubmitListener = listener
    }

    addCancelClickListener(listener) {
        this.cancelClickListener = listener
    }
}