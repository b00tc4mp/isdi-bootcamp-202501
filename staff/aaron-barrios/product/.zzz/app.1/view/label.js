class Label extends Component {
    constructor() {
        super('label')
    }
    setText(text) {
        this.container.textContent = text
    }

    setType(type) {
        this.container.type = type
    }
}

