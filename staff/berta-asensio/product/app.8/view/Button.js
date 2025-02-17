class Button extends Component {
    constructor() {
        super('button')
    }
    
    setType(type) {
        this.container.type = type
    }

    setText(text) {
        this.container.textContent = text
    }

}
