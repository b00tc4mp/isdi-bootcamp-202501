//El create post se heredará de Section, no será una página nueva: (Create post viene de section y section de component )
function CreatePost() {
    Section.call(this)

    //Montamos un formulario

    var form = new Form()
    form.addSubmitListener(function (event) {
        event.preventDefault()

        try {
            var image = imageInput.getValue()
            var text = textInput.getValue()

            logic.createPost(image, text)

            form.clear()

            this.createPostSubmitListener()

        } catch(error) {
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
    submitButton.setText ('Add post')
    submitButton.setType('submit')
    form.add(submitButton)

    //creamos un anchor para volver atrás (cancelar)
    var cancelAnchor = new Anchor()
    cancelAnchor.setText('Cancel')
    this.add(cancelAnchor) //no lo añadimos dentro del form, sino fuera, en la pagina.
}



CreatePost.prototype = Object.create(Section.prototype)
CreatePost.prototype.constructor = CreatePost

CreatePost.prototype.addCreatePostSubmitListener = function(listener) {
    this.createPostSubmitListener = listener //esta funcion debemos llamarla desde el componente superior, que es home, dentro de la función de createPost
}