function Component(tagName) {
    this.container = document.createElement(tagName)
}

Component.prototype.add = function (child) {
    this.container.appendChild(child.container)
}

function Form() {
    Component.call(this, 'form')
}

Form.prototype = Object.create(Component.prototype)
Form.prototype.constructor = Form

function Input() {
    Component.call(this, 'input')
}

Input.prototype = Object.create(Component.prototype)
Input.prototype.constructor = Input

Input.prototype.setType = function (type) {
    this.container.type = type
}

Input.prototype.setPlaceholder = function (placeholder) {
    this.container.placeholder = placeholder
}

function Button() {
    Component.call(this, 'button')
}

Button.prototype = Object.create(Component.prototype)
Button.prototype.constructor = Button

Button.prototype.setType = function (type) {
    this.container.type = type
}

Button.prototype.setText = function (text) {
    this.container.textContent = text
}

// demo

var form = new Form()

var input = new Input()
input.setType('text')
input.setPlaceholder('Your e-mail')
form.add(input)

var button = new Button()
button.setType('submit')
button.setText('Subscribe')
form.add(button)

document.body.appendChild(form.container)