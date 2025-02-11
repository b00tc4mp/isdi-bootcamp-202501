// FUNCION PARA CREAR IMAGENES

function Imagen(){
    Component.call(this, 'img')
}

Imagen.prototype = Object.create(Component.prototype)
Imagen.prototype.constructor = Imagen