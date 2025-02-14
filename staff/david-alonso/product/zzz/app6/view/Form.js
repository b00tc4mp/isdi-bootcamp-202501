// FORM
function Form() {
    Component.call(this, 'form')
}

Form.prototype = Object.create(Component.prototype)
Form.prototype.constructor = Form

Form.prototype.addSubmitListener = function (callback) {
    this.container.addEventListener('submit', callback)
}