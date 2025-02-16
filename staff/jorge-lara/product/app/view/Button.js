class Button extends Component {
    constructor() {
        super('button')
    }
    
    setText = function (text) {
        this.container.textContent = text;
    }

    setType = function (type) {
        this.container.type = type
    }
}   