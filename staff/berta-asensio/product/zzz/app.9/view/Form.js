class Form extends Component {
    constructor() {
        super('form')
    }
    addSubmitListener(listener) {
        this.container.addEventListener('submit', listener)
    }

    clear() {
        this.container.reset()
    }
}