class Input extends Component {
    constructor() {
        super('input');
    }

    getValue() {
        return this.container.value
    }

    setType(type){
        this.container.type = type;
    }
}