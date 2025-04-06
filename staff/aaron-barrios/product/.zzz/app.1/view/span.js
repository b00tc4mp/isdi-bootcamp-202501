class Span extends Component {
    constructor() {
        super('span')
    }
    setText(text) {
        this.container.textContent = text
    }
}