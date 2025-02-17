class Post extends Article {
  constructor(postInfo) {
    super();

    const postHeading = new Header(3, postInfo.author);

    this.add(postHeading);

    const postImage = new Image(postInfo.image);
    postImage.setStyle(style.postImage);
    this.add(postImage);

    const postText = new Paragraph(postInfo.text);
    this.add(postText);

    const postTime = new Time(postInfo.createdAt);
    this.add(postTime);

    const heart = new Button();
    postInfo.liked ? heart.setText("❤️") : heart.setText("🤍");

    this.add(heart);

    this.heart = heart;

    heart.addClickListener(
      function () {
        logic.updatePostLikes(postInfo.id);
        this.clickLike();
      }.bind(this)
    );
  }
  addLikeClickListener = function (listener) {
    this.clickLike = listener;
  };
}
