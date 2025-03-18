console.clear()
console.log('START', new Date)

console.log('A', 'start', new Date)
performance.mark('A-start')
setTimeout(() => {
    console.log('A', 'end', new Date)
    performance.mark('A-end')
}, 5000)

let before = Date.now()
while (Date.now() - before < 3000);

console.log('B', 'start', new Date)
performance.mark('B-start')
setTimeout(() => {
    console.log('B', 'end', new Date)
    performance.mark('B-end')
}, 2000)

console.log('C', new Date)

before = Date.now()
while (Date.now() - before < 4000);

console.log('D', 'start', new Date)
performance.mark('D-start')
setTimeout(() => {
    console.log('D', 'end', new Date)
    performance.mark('D-end')
}, 1000)

console.log('E', new Date)

setTimeout(() => {
    console.log('results')

    const measureA = performance.measure('A', 'A-start', 'A-end')
    const measureB = performance.measure('B', 'B-start', 'B-end')
    const measureD = performance.measure('D', 'D-start', 'D-end')

    console.log(measureA.name, measureA.duration)
    console.log(measureB.name, measureB.duration)
    console.log(measureD.name, measureD.duration)
}, 2000)
