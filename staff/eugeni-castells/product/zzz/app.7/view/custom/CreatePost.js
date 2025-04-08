function CreatePost() {
  Component.call(this, "div");
  this.setStyle(style.screenStyle);

  var createPostHeader = new Header(2, "What's the post like?");

  this.add(createPostHeader);

  var form = new Form();

  form.setStyle(style.formStyle);

  this.add(form);

  form.addSubmitListener(
    function (event) {
      event.preventDefault();
      try {
        postImage = imageInput.getValue();

        postBio = postBio.getValue();

        logic.addPost(postImage, postBio);

        alert("Post created correctly!");

        this.addSubmitListener();
      } catch (error) {
        console.error(error);

        alert(error.message);
      }
    }.bind(this)
  );

  var imageInput = new Input("text");
  imageInput.setPlaceholder("Image URL");
  form.add(imageInput);

  var postBio = new Input("text");
  postBio.setPlaceholder("Post bio");
  form.add(postBio);

  var submitButton = new Button("Create post");
  submitButton.setType("submit");
  form.add(submitButton);

  this.add(form);
}

CreatePost.prototype = Object.create(Component.prototype);
CreatePost.prototype.constructor = CreatePost;

CreatePost.prototype.addCreatePostSubmitListener = function (listener) {
  this.addSubmitListener = listener;
};
