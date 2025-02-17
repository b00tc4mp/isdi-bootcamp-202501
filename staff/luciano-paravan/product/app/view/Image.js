class Image extends Component {
    constructor () {
        super('img')
    }

    setUrl (url) {
        this.container.src = url
    }
}