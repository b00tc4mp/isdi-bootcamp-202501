class Image extends Component {
    constructor() {
        super('img')
    }

    setUrl = function (url) {
        this.container.src = url
    }
}