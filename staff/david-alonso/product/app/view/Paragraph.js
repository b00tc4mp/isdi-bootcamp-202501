// **** PARAGRAPH

class Paragraph extends Component {  // Creamos la funcion
    // Preparamos parallamarla con el This
    constructor() {
        super('p')
    }

    setText(text) {
        this.container.textContent = text
    }
}