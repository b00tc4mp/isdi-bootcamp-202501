class Image extends Component {
    constructor() {
        super('img')
        this.container.style.width = '500px'
    }

    setUrl(url) {
        this.container.src = url
    }
}