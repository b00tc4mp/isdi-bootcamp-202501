function Component(tagName) {
    this.container = document.createElement(tagName)
}

// demo

var form = new Component('form')

var input = new Component('input')
input.container.placeholder = 'Your e-mail'
form.container.appendChild(input.container)

var button = new Component('button')
button.container.type = 'submit'
button.container.textContent = 'Subscribe'
form.container.appendChild(button.container)

document.body.appendChild(form.container)