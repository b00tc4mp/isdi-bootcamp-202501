const rootElement = document.querySelector('div#root')

const root = ReactDOM.createRoot(rootElement)

const Component = React.Component

class GuessNumber extends Component {
    constructor() {
        console.log('GuessNumber constructor')

        super()

        this.state = {}
    }
}