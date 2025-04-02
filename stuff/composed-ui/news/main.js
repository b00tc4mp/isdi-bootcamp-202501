const h2 = document.querySelector('h2')

h2.addEventListener('click', function () {
    window.top.postMessage('hello', '*')
})