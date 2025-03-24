function add(a, b) { return new Promise((resolve, reject) => resolve(a + b)) }
add(10, 20)
//Promise {<fulfilled>: 30}
add(10, 20).then(result => console.log(result))
//</fulfilled>VM1064:1 30

function add(a, b) { return Promise.resolve(a + b) }
add(10, 20)
//Promise {<fulfilled>: 30}
add(10, 20).then(result => console.log(result))
//</fulfilled>VM1064:1 30

async function add(a, b) { return a + b }
add(10, 20)
//Promise {<fulfilled>: 30}
add(10, 20).then(result => console.log(result))
//</fulfilled>VM1064:1 30