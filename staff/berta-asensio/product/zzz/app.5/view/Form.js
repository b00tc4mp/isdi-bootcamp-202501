function Form() {
    Component.call(this, 'form')
}

Form.prototype = Object.create(Component.prototype)
Form.prototype.constructor = Form

Form.prototype.addSubmitListener = function(listener) {
    this.container.addEventListener('submit', listener)
}

//Creamos este metodo para  llamar aquí a la funcion reset. Luego, en register page llamamos a clear. Así dejamos aquí el DOM
Form.prototype.clear = function () {
    this.container.reset()
}