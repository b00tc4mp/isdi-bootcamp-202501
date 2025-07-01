function modifyPost(postId, image, title) {
    // Validar el ID del post
    // this.validate.id(postId, "postId");

    // Validar la imagen y el título
    this.validate.text(image, "image");
    this.validate.maxLength(image, 1000, "image");
    this.validate.text(title, "title");
    this.validate.maxLength(title, 500, "title");

    // Obtener el ID del usuario actual
    const { userId } = data;

    // Buscar el post en la data
    const foundPost = data.posts.findOne((post) => post.id === postId);

    // Si no se encuentra el post, lanzar un error
    if (!foundPost) throw new NotFoundError("post not found");

    // Si el autor del post no es el usuario actual, lanzar un error
    if (foundPost.author !== userId) throw new OwnershipError("user is not author of post");

    // Actualizar el post con los nuevos datos
    foundPost.image = image;
    foundPost.title = title;
    foundPost.modifiedAt = new Date();

    // Actualizar el post en la data
    data.posts.updateOne(foundPost);
  }