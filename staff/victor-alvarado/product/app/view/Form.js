
function Form() {
    Component.call(this, 'form'); // Crea un <form> usando el constructor de Component
}

Form.prototype = Object.create(Component.prototype);
Form.prototype.constructor = Form // Asegura que el constructor apunte a Form

Form.prototype.addSubmitListener = function (callback) {
    this.container.addEventListener('submit', callback)
}
Form.prototype.clear = function () {
    this.container.reset()
}