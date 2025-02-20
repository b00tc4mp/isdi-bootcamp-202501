class Text extends Component {
    constructor() {
        super('text')
    }

    setText = function (description) {
        this.container.innerText = description
    }
}