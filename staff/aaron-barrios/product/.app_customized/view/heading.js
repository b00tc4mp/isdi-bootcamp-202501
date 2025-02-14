class Heading extends Component {
    constructor(level) {
        super('h' + level)
    }

    setText(text) {
        this.container.textContent = text
    }
}