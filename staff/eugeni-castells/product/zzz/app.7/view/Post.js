function Post(postInfo) {
  Article.call(this);

  var postHeading = new Header(3, postInfo.author);

  this.add(postHeading);

  var postImage = new Image(postInfo.image);
  postImage.setStyle(style.postImage);
  this.add(postImage);

  var postText = new Paragraph(postInfo.text);
  this.add(postText);

  var postTime = new Time(postInfo.createdAt);
  this.add(postTime);
}

Post.prototype = Object.create(Article.prototype);
Post.prototype.constructor = Post;
