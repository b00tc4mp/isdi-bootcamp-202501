const a = 1
const b = 2

let result: number

result = a + b
console.log(result)

type Person = {
    name: string
    email: string
    dateOfBirth: Date
}

const peter: Person = {
    name: 'Peter Pan',
    email: 'peter@pan.com',
    dateOfBirth: new Date
}