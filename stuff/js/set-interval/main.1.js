var intervalId = setInterval(function () {
    console.log('hola mundo')
}, 1000)


// undefined
// VM2250:2 hola mundo
// VM2250:2 hola mundo
// VM2250:2 hola mundo
// VM2250:2 hola mundo
// VM2250:2 hola mundo
// VM2250:2 hola mundo
// VM2250:2 hola mundo
// VM2250:2 hola mundo
// VM2250:2 hola mundo
clearInterval(intervalId)