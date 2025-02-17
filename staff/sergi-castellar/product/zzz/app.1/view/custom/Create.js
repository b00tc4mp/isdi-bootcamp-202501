function Create() {
    Component.call(this, "div");

    var logo = new Heading(1);
    logo.setText("Logo");
    this.add(logo);

    var inputForm = new Form();
    inputForm.setId("create-post");
    inputForm.addSubmitListener(function (event) {
        event.preventDefault();

        var imageSrc = imageInput.getValue();
        var textDescription = descriptionInput.getValue();

        try {

            this.createPostSubmitListener()
        } catch (error) {
            console.error(error)
            alert(error.message)
        }
    }.bind(this));
    inputForm.container.style.display = "flex";
    inputForm.container.style.flexDirection = "column";
    this.add(inputForm);

    var imageLabel = new Label();
    imageLabel.setHtmlFor("image-route");
    imageLabel.setText("Image route");
    inputForm.add(imageLabel);

    var imageInput = new Input();
    imageInput.setType("text");
    imageInput.setId("image-route");
    imageInput.setPlaceholder('image route')
    inputForm.add(imageInput);

    var descriptionLabel = new Label();
    descriptionLabel.setHtmlFor("description");
    descriptionLabel.setText("Description");
    inputForm.add(descriptionLabel);

    var descriptionInput = new Input();
    descriptionInput.setType("text");
    descriptionInput.setId("description");
    descriptionInput.setPlaceholder('description')
    inputForm.add(descriptionInput);

    inputForm.container.querySelectorAll("input").forEach(function (child) {
        child.style.width = "300px";
    })

    var bubttonsDiv = new Div();
    bubttonsDiv.container.style.width = '310px'
    bubttonsDiv.container.style.marginTop = '15px'
    bubttonsDiv.container.style.display = 'flex'
    bubttonsDiv.container.style.justifyContent = 'space-between'
    inputForm.add(bubttonsDiv);

    var cancelButton = new Button();
    cancelButton.setText("Cancel");
    bubttonsDiv.add(cancelButton);

    var createButton = new Button();
    createButton.setType("submit");
    createButton.setForm("create-post");
    createButton.setText("Create");
    bubttonsDiv.add(createButton);
}

Create.prototype = Object.create(Component.prototype);
Create.prototype.constructor = Create;

Create.prototype.addCreatePostSubmitListener = function (listener) {
    this.createPostSubmitListener = listener
}