# JS

![logo JS](https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/JavaScript-logo.png/640px-JavaScript-logo.png)

## stack & heap

[table](https://docs.google.com/spreadsheets/d/17ivkLSqso35BuSrytACbttb7P13YWH1ElKoJ_xr_PJs/edit?usp=sharing)

```js
console.clear()
console.log('heap & stack')

var a = 1
var b = 2
var c = a + b

var s = 'hola'
s = s + ' mundo'

var p = true
c = c + p
c += false

var o = {}
//o.name = 'Oswald'
o['name'] = 'Oswald'

var q = o

var d = c
c = c + 1

q['name'] = 'Quentin'

var r = q
r.surname = 'Tarantino'

o['0'] = 100
//o[0] = 100
//o.0 = 100
o[1] = 200
r['2'] = 300
q[3] = 400
o['length'] = 4

//console.log(q)
q = {}
//console.log(q)

q['surname'] = null
q['name'] = 'Eugeni'

o.broda = q
o.memyselfandi = r

//o.broda.age = 32
o['broda']['age'] = 23

var colors = ['blue']
colors['1'] = 'red'
colors['name'] = 'colorines'
colors[2] = 'yellow'
colors['10'] = 'black'

var i = 5
//for (i = 0; i < colors.length; i = i + 1)
  //  console.log(i, colors[i] + ' color')

q.favColors = colors

//console.log(o.broda.favColors[2])
console.log(o['broda']['favColors']['2'])

function greet() { return 'hello!' }
//console.log(greet())

q['salute'] = greet

console.log(r.broda.salute())

var add = function(a, b) {
  return a + b
}

var sumar = add

var result = add(123, 456)

//console.log(result)

var printName = function(obj) {
  console.log(obj['name'])
}

printName(q)
printName(o)

var createObjectWithName = function(name) {
  return { name: name }
}

var pepe = createObjectWithName('Pepe')
console.dir(pepe)

//createObjectWithName('Pepa')

var assignDateToObject = function(whatever) {
  whatever.date = new Date()
}

assignDateToObject(o)

console.dir(r)

for (var k = 0; k < r.length; k++)
  console.log(r[k])

console.log('...')
```