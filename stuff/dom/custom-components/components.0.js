var form = document.createElement('form')

var input = document.createElement('input')
input.type = 'text'
input.placeholder = 'Your e-mail'
form.appendChild(input)

var button = document.createElement('button')
button.type = 'submit'
button.textContent = 'Subscribe'
form.appendChild(button)

document.body.appendChild(form)