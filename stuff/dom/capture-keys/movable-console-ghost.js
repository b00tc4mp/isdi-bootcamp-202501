var x = 10
var y = 10

document.addEventListener('keydown', function (event) {
    console.clear()

    console.log(event.key)

    if (event.key === 'ArrowUp')
        y > 1 && y--
    else if (event.key === 'ArrowDown')
        y < 100 && y++
    else if (event.key === 'ArrowLeft')
        x > 1 && x--
    else if (event.key === 'ArrowRight')
        x < 100 && x++

    console.log(x, y)

    var canvas = ''

    for (var i = 0; i < y; i++)
        canvas += '\n'

    for (var i = 0; i < x; i++)
        canvas += ' '

    canvas += '👻'

    console.log(canvas)
})