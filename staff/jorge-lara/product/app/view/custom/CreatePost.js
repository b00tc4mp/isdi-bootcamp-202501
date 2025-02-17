class CreatePost extends Component {
    constructor() {
        super('div');

        const logo = new Heading(1);
        logo.setText('Create a post');
        this.add(logo);

        const postForm = new Form();
        postForm.setOrientation('flex', 'column');
        postForm.container.style.width = '250px';

        postForm.addSubmitListener(e => {
            e.preventDefault();
            const text = titleInput.getValue();
            const imageUrl = imageInput.getValue();
            try {
                logic.addPost(text, imageUrl)

                postForm.clear();

                this.createPostSubmitListener();
            } catch (error) {
                console.error(error);

                alert(error.message);
            }

        })
        this.add(postForm);

        //Title
        const titleLabel = new Label();
        titleLabel.setText('Title');
        postForm.add(titleLabel);

        const titleInput = new Input();
        postForm.add(titleInput);

        //Image
        const imageLabel = new Label();
        imageLabel.setText('Enter image url');
        postForm.add(imageLabel);

        const imageInput = new Input();
        postForm.add(imageInput);

        const spanButtons = new Span();
        postForm.add(spanButtons);

        const cancelAnchor = new Anchor();
        cancelAnchor.setText('Cancel');
        cancelAnchor.setCursor('pointer');

        cancelAnchor.addClickListener(() => {
            postForm.clear();

            this.cancelClickListener();
        })
        spanButtons.add(cancelAnchor);

        const postButton = new Button();
        postButton.setText('Post');
        postButton.setType('submit');
        postButton.container.style.marginLeft = '50px';
        spanButtons.add(postButton);
    }
    addCreatePostSubmitListener(listener) {
        this.createPostSubmitListener = listener;
    }
    
    addCancelClickListener(listener) {
        this.cancelClickListener = listener;
    }
}
