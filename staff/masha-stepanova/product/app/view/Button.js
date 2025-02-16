class Button extends Component {
    constructor() {
        super('button')
    }

    setType = function (type) {
        this.container.type = type
    }

    setText = function (text) {
        this.container.textContent = text
    }
}