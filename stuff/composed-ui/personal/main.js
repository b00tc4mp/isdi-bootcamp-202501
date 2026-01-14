window.addEventListener('message', function (event) {
    if (event.data == 'hello') {
        alert('It works! (from Personal Frame)')
    }
})