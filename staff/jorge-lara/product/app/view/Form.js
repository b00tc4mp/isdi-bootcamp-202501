class Form extends Component {
    constructor() {
        super('form')
    }

    setOrientation(type, orientation) {
        this.container.style.display = type;
        this.container.style.flexDirection = orientation
    }

    clear() {
        this.container.reset();
    }

    addSubmitListener(listener) {
        this.container.addEventListener('submit', listener)
    }
}