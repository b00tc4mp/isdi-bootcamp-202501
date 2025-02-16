class Input extends Component {
    constructor() {
        super('input')
    }
    setType = function (type) {
        this.container.type = type
    }

    setPlaceholder = function (placeholder) {
        this.container.placeholder = placeholder
    }

    getValue = function () {
        return this.container.value
    }
}