function AddPost() {
    Component.call(this, 'div')

    var logo = new Heading(1)
    logo.setText('Logo')
    this.add(logo)

    var explanation = new Paragraph()
    explanation.setText('To add new post you have to add the image link and a description to it. Try it now!')
    this.add(explanation)

    var form = new Form()
    form.container.style.display = 'flex'
    form.container.style.flexDirection = 'column'
    form.container.style.gap = '0.3rem'

    form.addSubmitListener(function (event) {
        event.preventDefault()

        var link = inputLink.getValue()
        var description = inputText.getValue()

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

    var labelLink = new Label()
    labelLink.setText('Add here a link to your image:')
    form.add(labelLink)

    var inputLink = new Input()
    inputLink.setType('text')
    form.add(inputLink)

    var labelText = new Label()
    labelText.setText('Add here a little description:')
    form.add(labelText)

    var inputText = new Input()
    inputText.setType('text')
    form.add(inputText)

    var submitButton = new Button()
    submitButton.setText('Add post')
    submitButton.setType('submit')
    form.add(submitButton)
}

AddPost.prototype = Object.create(Component.prototype)
AddPost.prototype.constructor = AddPost

AddPost.prototype.addPostSubmitListener = function (callback) {
    this.addSubmitButton = callback
}
