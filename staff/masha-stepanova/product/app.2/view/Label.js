class Label extends Component {
    constructor() {
        super('label')
    }

    setText = function (text) {
        this.container.innerText = text
    }
}