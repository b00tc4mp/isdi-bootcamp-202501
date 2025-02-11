function Home(){
    Div.call(this)

    //GENERO EL CABECERO
    var header = new Headers(1)
    header.setText('HOME')
    this.add(header)

    //BOTON LOG OUT
    var logOutButton = new Button()
    logOutButton.setText('LOGOUT')
    this.logOutButton = logOutButton
    this.add(logOutButton) 
}

Home.prototype = Object.create(Component.prototype)
Home.prototype.constructor = Home

Home.prototype.addHomeLogout = function(listener){
    this.logOutButton.addClickListener(listener)
}