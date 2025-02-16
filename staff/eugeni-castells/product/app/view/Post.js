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
  }
}
