function Form() {
    Component.call(this, 'form')
    this.container.style.display = 'flex'
    this.container.style.flexDirection = 'column'
    this.container.style.gap = '10px'
}

Form.prototype = Object.create(Component.prototype)
Form.prototype.constructor = Form

Form.prototype.addSubmitListener = function (callback) {
    this.container.addEventListener('submit', callback)
}
