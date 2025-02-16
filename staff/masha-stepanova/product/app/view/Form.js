class Form extends Component {
    constructor() {
        super('form')
    }

    addSubmitListener = function (callback) {
        this.container.addEventListener('submit', callback)
    }

    clear = function () {
        this.container.reset()
    }
}


