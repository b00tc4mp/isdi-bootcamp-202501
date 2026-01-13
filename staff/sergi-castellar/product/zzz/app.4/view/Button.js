class Button extends Component {
    constructor() {
        super("button")
    }

    setForm(form) {
        this.container.setAttribute('form', form)
    }

    setType(type) {
        this.container.type = type
    }

    setText(text) {
        this.container.textContent = text
    }
}