class Heading extends Component {
    constructor(level) {
        super('h' + level)
    }

    setText = function (text) {
        this.container.textContent = text
    }
}