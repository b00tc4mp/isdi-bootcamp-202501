class Post extends Component {
    constructor(post) {
        super("article")

        const { id: currentPostId, authorId: currentPostAuthorId, imageSrc: currentPostImageSrc, textDescription: currentPostTextDescription, createdAt: currentPostCreatedAt, modifiedAt: currentPostModifiedAt, likes: currentPostLikes } = post

        this.container.style.width = '400px'

        const header = new Header()
        this.add(header)

        let authorName = ''
        try {
            authorName = logic.getUserProperty(currentPostAuthorId, 'name')

            const author = new Heading(2)
            author.setText(authorName)
            header.add(author)
        } catch (error) {
            logic.helper.handleError(error)
        }

        const figure = new Figure()
        figure.container.style.display = 'flex'
        figure.container.style.justifyContent = 'center'
        this.add(figure)

        const image = new Image()
        image.setSrc(currentPostImageSrc)
        image.container.style.width = '300px'
        figure.add(image)

        const postInfoSection = new Section()
        this.add(postInfoSection)

        const iconSection = new Section()
        postInfoSection.add(iconSection)

        let likeButton = new Button()
        likeButton.setClass("unliked")
        likeButton.setText("🤍")
        likeButton.addClickListener(() => {
            const elementContainer = likeButton.container
            if (elementContainer.className === "unliked") {
                elementContainer.className = "liked"
                elementContainer.textContent = "❤️"
            } else if (elementContainer.className === "liked") {
                elementContainer.className = "unliked"
                elementContainer.textContent = "🤍"
            }

            try {
                logic.toggleLike(currentPostId)


            } catch (error) {
                logic.helper.handleError()
            }
        })
        likeButton.container.style.cursor = 'pointer'
        likeButton.container.style.background = 'transparent'
        likeButton.container.style.border = 'none'
        likeButton.container.style.fontSize = '18px'

        iconSection.add(likeButton)

        const likeSection = new Section()
        postInfoSection.add(likeSection)

        try {
            const likesUsernames = logic.getLikesUsernames(currentPostLikes)
            const likesParagraph = new Paragraph()
            likesParagraph.setText(`${logic.likesToString(likesUsernames)}`)
            likeSection.add(likesParagraph)
        } catch (error) {
            logic.helper.handleError()
        }

        const descriptionSection = new Section()
        postInfoSection.add(descriptionSection)
        descriptionSection.container.style.display = 'flex'

        try {
            let authorUsername = logic.getUserProperty(currentPostAuthorId, 'username')

            const authorParagraph = new Paragraph()
            authorParagraph.setText(`${authorUsername}`)
            authorParagraph.container.style.fontWeight = 'bold'
            authorParagraph.container.style.marginRight = '4px'
            descriptionSection.add(authorParagraph)

            const descriptionParagraph = new Paragraph()
            descriptionParagraph.setText(`${currentPostTextDescription}`)
            descriptionSection.add(descriptionParagraph)
        } catch (error) {
            logic.helper.handleError()
        }
    }
}