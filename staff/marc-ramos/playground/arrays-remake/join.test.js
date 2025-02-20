require('./join.js')

console.info('TEST join')

console.info('CASE join an array')

{
    const cars = ['porche', 'renault', 'ferrari','skoda']
    
    console.assert(cars.join() === 'porche,renault,ferrari,skoda', 'cars.join() is porche,renault,ferrari,skoda')
}

    console.info('CASE join an array with ("")')

{
    const cars = ['porche', 'renault', 'ferrari','skoda']

    console.assert(cars.join("") === 'porcherenaultferrariskoda', 'cars.join("") is porcherenaultferrariskoda')
}

    console.info('CASE join an array with a string ("hola")')

{
    const cars = ['porche', 'renault', 'ferrari','skoda']

    console.assert(cars.join("hola") === 'porcheholarenaultholaferrariholaskoda', 'cars.join("hola") is porcheholarenaultholaferrariholaskoda')
}