var step = 0


var intervalId = setInterval(function () {
    console.clear()

    var position = ''

    for (var i = 0; i < step; i++)
        position += ' '

    console.log(position + '🚘')

    step++
}, 500)