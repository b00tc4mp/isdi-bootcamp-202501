document.body.innerHTML = ''

var form = document.createElement('form') // new HTMLFormElement
form.addEventListener('submit', function (event) {
    event.preventDefault()

    console.log('form submit')
})

var input = document.createElement('input')
input.placeholder = 'Your e-mail'
form.appendChild(input)

var button = document.createElement('button')
button.textContent = 'Subscribe'
form.appendChild(button)

document.body.appendChild(form)

// VM686: 7 form submit
// VM686: 7 form submit
// VM686: 7 form submit
// VM686: 7 form submit
// VM686: 7 form submit