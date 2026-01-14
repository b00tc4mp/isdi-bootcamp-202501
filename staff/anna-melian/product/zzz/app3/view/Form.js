class Form extends Component {
    constructor() {
        super('form')
        this.container.style.display = 'flex'
        this.container.style.flexDirection = 'column'
        this.container.style.gap = '10px'
    }

    addSubmitListener(listener) {
        this.container.addEventListener('submit', listener)
    }

    clear() {
        this.container.reset()
    }
}