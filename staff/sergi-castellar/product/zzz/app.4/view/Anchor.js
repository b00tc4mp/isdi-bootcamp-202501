class Anchor extends Component {
    constructor() {
        super(`a`)
    }

    setText(text) {
        this.container.textContent = text
    }
}