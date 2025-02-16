class Section extends Component {
    constructor() {
        super('section');
    }

    setOrientation(type, orientation) {
        this.container.style.display = type;
        this.container.style.flexDirection = orientation
    }
}