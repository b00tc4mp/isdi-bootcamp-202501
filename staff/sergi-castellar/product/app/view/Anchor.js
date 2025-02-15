class Anchor extends Component {
    constructor() {
        super(`a`)
    }

    setClass(aClass) {
        this.container.className = aClass
    }

    setText(text) {
        this.container.textContent = text
    }
}