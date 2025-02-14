function Body() {
    Component.call(this, 'body') // Crea el cuerpo del documento
}

Body.prototype = Object.create(Component.prototype);
Body.prototype.constructor = Body