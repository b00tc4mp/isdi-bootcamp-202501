class Anchor extends Component {
    constructor() {
        super('a')
        this.container.style.textDecoration = 'underline'
        this.container.style.fontWeight = 'bold'
    }

    setText(text) {
        this.container.textContent = text
    }
}