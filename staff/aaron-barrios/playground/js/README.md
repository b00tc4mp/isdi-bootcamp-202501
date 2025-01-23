# JAVA SCRIPT CHEAT SHEET 
![markdown logo](https://logos-world.net/wp-content/uploads/2023/02/JavaScript-Symbol.png)

REACT NATIVE -> LLEVAR TU SERVICIO WEB AL MÓVIL
SOURCES -> SNIPPETS -> TRY FREE CODE IN WEB NAV 
console.dir(object name) -> método para ver mejor en consola web los objetos 

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

console.log('...')
```