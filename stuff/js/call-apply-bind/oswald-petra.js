var o = { name: 'Oswald' }
var p = { name: 'Petra' }
var m = { name: 'Max' }

function salute(salutation, to) { console.log(this.name + ': ' + salutation + ', ' + to.name + '!') }

salute('Hello', o) // NO ERROR, BUT ...
window.salute('Hello', o)

//o.salute(p) // ERROR
//o.salute = salute
o.salute = function (salutation, to) { console.log(this.name + ': ' + salutation + ', ' + to.name + '!') }
o.salute('Ciao', p)

// Function.prototype.call
salute.call(o, 'Hola', p)
salute.call(p, 'Pryvit', o)

// Function.prototype.apply
salute.apply(o, ['Hola', p])
salute.apply(p, ['Pryvit', o])

// Function.prototype.bind
var petraSalute = salute.bind(p)
petraSalute('Hallo', o) // salute.call(p, 'Hallo', o)
petraSalute('Hi', m) // salute.call(p, 'Hi', m)
var oswaldSalute = salute.bind(o)
oswaldSalute('Hallo', p) // salute.call(o, 'Hallo', p)
oswaldSalute('Hi', m) // salute.call(o, 'Hi', m)

/*
 : Hello, Oswald!
 : Hello, Oswald!
Oswald: Ciao, Petra!
Oswald: Hola, Petra!
Petra: Pryvit, Oswald!
Oswald: Hola, Petra!
Petra: Pryvit, Oswald!
Petra: Hallo, Oswald!
Petra: Hi, Max!
Oswald: Hallo, Petra!
Oswald: Hi, Max!
*/