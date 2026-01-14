window.addEventListener('message', function (event) {
    if (event.data == 'hello') {
        alert('It works! (from Composed UI)')
    }
})

const h1 = document.querySelector('h1')

h1.addEventListener('click', function () {
    const personalFrame = document.getElementById('personal-frame')

    personalFrame.contentWindow.postMessage('hello', '*')
})