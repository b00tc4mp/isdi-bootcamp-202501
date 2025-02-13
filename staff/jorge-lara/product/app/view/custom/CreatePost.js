function CreatePost() {
    Component.call(this, 'div');

    let logo = new Heading(1);
    logo.setText('Create a post');
    this.add(logo);

    let postForm = new Form();
    postForm.setOrientation('flex', 'column');
    postForm.container.style.width = '250px';

    postForm.addSubmitListener(function (e) {
        e.preventDefault();
        let text = titleInput.getValue();
        let imageUrl = imageInput.getValue();
        try {
            logic.addPost(text, imageUrl)

            //postForm.clear();

            this.createPostSubmitListener();
        } catch (error) {
            console.error(error);

            alert(error.message);
        }

    }.bind(this))
    this.add(postForm);

    //Title
    let titleLabel = new Label();
    titleLabel.setText('Title');
    postForm.add(titleLabel);

    let titleInput = new Input();
    postForm.add(titleInput);

    //Image
    let imageLabel = new Label();
    imageLabel.setText('Enter image url');
    postForm.add(imageLabel);

    let imageInput = new Input();
    postForm.add(imageInput);

    let spanButtons = new Span();
    postForm.add(spanButtons);

    let cancelAnchor = new Anchor();
    cancelAnchor.setText('Cancel');
    cancelAnchor.setCursor('pointer');

    cancelAnchor.addClickListener(function () {
        postForm.clear();

        this.cancelClickListener();
    }.bind(this))
    spanButtons.add(cancelAnchor);

    let postButton = new Button();
    postButton.setText('Post');
    postButton.setType('submit');
    postButton.container.style.marginLeft = '50px';
    spanButtons.add(postButton);


}
CreatePost.prototype = Object.create(Component.prototype);
CreatePost.prototype.constructor = CreatePost;

CreatePost.prototype.addCreatePostSubmitListener = function (listener){
    this.createPostSubmitListener = listener;
}

CreatePost.prototype.addCancelClickListener = function (listener) {
    this.cancelClickListener = listener;
}