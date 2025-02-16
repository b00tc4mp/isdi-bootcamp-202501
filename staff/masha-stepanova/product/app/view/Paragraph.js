class Paragraph extends Component {
    constructor() {
        super('p')
    }

    setText = function (description) {
        this.container.textContent = description
    }
}