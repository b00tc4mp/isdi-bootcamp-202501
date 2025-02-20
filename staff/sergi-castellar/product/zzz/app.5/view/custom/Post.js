class Post extends Component {
    constructor(post) {
        super("article")

        const { id: currentPostId, authorId: currentPostAuthorId, imageSrc: currentPostImageSrc, textDescription: currentPostTextDescription, createdAt: currentPostCreatedAt, modifiedAt: currentPostModifiedAt, likes: currentPostLikes, liked: isCurrentPostLiked } = post

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
        image.container.style.height = '300px'
        image.container.style.overflow = 'hidden'
        image.container.style.position = 'relative'
        image.container.style.objectFit = 'cover'

        figure.add(image)

        const postInfoSection = new Section()
        this.add(postInfoSection)

        const iconSection = new Section()
        postInfoSection.add(iconSection)

        let likeButton = new Button()
        likeButton.setText(`${currentPostLikes.length} ${isCurrentPostLiked ? '❤️' : '🤍'}`)
        likeButton.addClickListener(() => {
            try {
                logic.toggleLike(currentPostId)

                this.loadPosts()
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
            likesParagraph.setText(`${this.likesToString(likesUsernames)}`)
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

    addLoadPosts(listener) {
        this.loadPosts = listener
    }

    likesToString(likes) {
        if (likes.length === 0) {
            return ''
        } else if (likes.length < 3) {
            return `${likes.join(' and ')} liked that.`
        } else {
            const firstLike = likes[0]
            const secondLike = likes[1]
            const restLikes = likes.length - 2

            return `${firstLike}, ${secondLike} and ${restLikes} more people liked that.`
        }
    }
}