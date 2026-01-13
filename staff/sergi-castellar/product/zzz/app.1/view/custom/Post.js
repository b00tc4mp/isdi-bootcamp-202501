function Post(authorId, imageSrc, textDescription, createdAt) {
    Component.call(this, "article");

    this.container.style.width = '400px'

    var header = new Header();
    this.add(header);

    try {
        var authorUsername = logic.getUserUsername(authorId)
    } catch (error) {
        console.error(error)
        alert(error)
    }

    var author = new Heading(2);
    author.setText(authorUsername);
    header.add(author);

    var figure = new Figure();
    figure.container.style.display = 'flex'
    figure.container.style.justifyContent = 'center'
    this.add(figure);

    var image = new Image();
    image.setSrc(imageSrc);
    image.container.style.width = '300px'
    figure.add(image);

    var footer = new Footer();
    this.add(footer);

    var iconSection = new Section();
    footer.add(iconSection);

    var likeAnchor = new Anchor();
    likeAnchor.setClass("unliked");
    likeAnchor.setText("🤍");
    likeAnchor.addClickListener(function () {
        if (this.className === "unliked") {
            this.className = "liked";
            this.textContent = "❤️";
        } else if (this.className === "liked") {
            this.className = "unliked";
            this.textContent = "🤍";
        }
    });
    likeAnchor.container.style.cursor = 'pointer'
    iconSection.add(likeAnchor);

    var datePost = new Paragraph();
    datePost.setText(createdAt)
    datePost.container.style.textAlign = 'justify'
    footer.add(datePost);

    var datePost = new Paragraph();
    datePost.setText(textDescription)
    datePost.container.style.textAlign = 'justify'
    footer.add(datePost);
}

Post.prototype = Object.create(Component.prototype);
Post.prototype.constructor = Post;