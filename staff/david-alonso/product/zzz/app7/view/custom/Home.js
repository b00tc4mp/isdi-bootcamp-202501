// ****  HOME 

function Home() {
    Component.call(this, 'div')

    var logo = new Heading(1)
    logo.setText('Home')
    this.add(logo)

    // Form
    var form = new Form()
    this.add(form)

    //     // Imagenes
    var coment = new Heading(5)
    coment.setText('Winnie the Pooh Junior vs Senior')
    form.add(coment)

    var news1 = new Picture()
    news1.setSrc('https://i.pinimg.com/236x/ff/a1/22/ffa122f36bffb392661c0de948475635.jpg')
    news1.container.style.width = '60%'
    form.add(news1)

    var coment = new Heading(5)
    coment.setText('SpongeBob in his first programming class')
    form.add(coment)

    var news2 = new Picture()
    news2.setSrc('https://i.pinimg.com/564x/bd/68/af/bd68af256a4c6fd0ada2f60183e88f39.jpg')
    news2.container.style.width = '60%'
    form.add(news2)

    var coment = new Heading(5)
    coment.setText('The Full-Stack hamburger')
    form.add(coment)

    var news3 = new Picture()
    news3.setSrc('https://image.spreadshirtmedia.net/image-server/v1/products/T1459A839PA4459PT28D179581354W8333H10000/views/1,width=378,height=378,appearanceId=839,backgroundColor=F2F2F2/programador-informatico-codificadores-software-burger-lovers.jpg')
    news3.container.style.width = '60%'
    form.add(news3)

    // Exit
    var exitButton = new Button()
    exitButton.setText('EXIT')
    exitButton.addClickListener(function () {
        body.remove(home)
        body.add(landing)
    }.bind(this))
    form.add(exitButton)

}

Home.prototype = Object.create(Component.prototype)
Home.prototype.constructor = Home

// Creamos un metodo para el cambio de ventana
Home.prototype.addExitClickListener = function (listener) {
    this.exitClickListener = listener
}

