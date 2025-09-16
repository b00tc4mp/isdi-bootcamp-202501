function createPost(image, title) {
    //valido que la imagen y el titulo sean de tipo string
    this.validate.text(image, "image");
    this.validate.maxLength(1000);
    this.validate.text(title, "title");
    this.validate.maxLength(500);

    const { userId } = data;
    //creo un objeto post con los datos que recibo
    const post = {
      author: userId,
      image: image,
      title: title,
      userId: userId,
      createdAt: new Date(),
      modifiedAt: null,
      likes: [],
    };

    data.posts.insertOne(post);
  }