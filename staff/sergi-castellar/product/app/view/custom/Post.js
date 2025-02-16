class Post extends Component {
    constructor(authorId, imageSrc, textDescription, createdAt) {
        super("article")

        this.container.style.width = '400px'

        const header = new Header()
        this.add(header)

        let authorName = ''
        try {
            authorName = logic.getUserProperty(authorId, 'name')

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
        image.setSrc(imageSrc)
        image.container.style.width = '300px'
        figure.add(image)

        const footer = new Footer()
        this.add(footer)

        const iconSection = new Section()
        footer.add(iconSection)

        let likeAnchor = new Anchor()
        likeAnchor.setClass("unliked")
        likeAnchor.setText("🤍")
        likeAnchor.addClickListener(() => {
            const elementContainer = likeAnchor.container
            if (elementContainer.className === "unliked") {
                elementContainer.className = "liked"
                elementContainer.textContent = "❤️"
            } else if (elementContainer.className === "liked") {
                elementContainer.className = "unliked"
                elementContainer.textContent = "🤍"
            }
        })
        likeAnchor.container.style.cursor = 'pointer'
        iconSection.add(likeAnchor)

        let authorUsername
        try {
            authorUsername = logic.getUserProperty(authorId, 'username')

            const datePost = new Paragraph()
            datePost.setText(`${authorUsername}, ${createdAt.toLocaleString()}: ${textDescription}`)
            datePost.container.style.textAlign = 'justify'
            footer.add(datePost)
        } catch (error) {
            logic.helper.handleError()
        }
    }
}