  class Image extends Component {
    constructor(){
      super('img')

    }
    //Este metodo me permite setear el src de la imagen
    setSrc(src){
      this.container.src = src
    }
  }