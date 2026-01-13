class Input extends Component {
    constructor() {
            super ('input')
    }
    setType(type) {
        this.container.type = type
    }
    setPlaceholder (placeholder) {
        this.container.placeholder = placeholder
    }
    getValue = function() {
        return this.container.value
    }
}
