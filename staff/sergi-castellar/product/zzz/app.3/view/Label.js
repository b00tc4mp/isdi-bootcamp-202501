class Label extends Component {
    constructor() {
        super("label")
    }

    setHtmlFor(htmlFor) {
        this.container.htmlFor = htmlFor
    }

    setText(text) {
        this.container.textContent = text
    }
}