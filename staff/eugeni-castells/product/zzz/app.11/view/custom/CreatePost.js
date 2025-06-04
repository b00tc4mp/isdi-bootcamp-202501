class CreatePost extends Component {
  constructor() {
    super("div");
    this.setStyle(style.screenStyle);

    const createPostHeader = new Header(2, "What's the post like?");

    this.add(createPostHeader);

    const form = new Form();

    form.setStyle(style.formStyle);

    this.add(form);

    form.addSubmitListener(
      function (event) {
        event.preventDefault();
        try {
          const postImage = imageInput.getValue();

          const bio = postBio.getValue();

          logic.addPost(postImage, bio);

          alert("Post created correctly!");

          this.addSubmitListener();
        } catch (error) {
          console.error(error);

          alert(error.message);
        }
      }.bind(this)
    );

    const imageInput = new Input("text");
    imageInput.setPlaceholder("Image URL");
    form.add(imageInput);

    const postBio = new Input("text");
    postBio.setPlaceholder("Post bio");
    form.add(postBio);

    const submitButton = new Button("Create post");
    submitButton.setType("submit");
    form.add(submitButton);

    this.add(form);
  }
  addCreatePostSubmitListener(listener) {
    this.addSubmitListener = listener;
  }
}
