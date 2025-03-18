class Time extends Component {
    constructor() {
        super('time')
        this.container.style.display = 'block'
        this.container.style.marginTop = '15px'
    }

    setText(text) {
        this.container.textContent = text
    }
}