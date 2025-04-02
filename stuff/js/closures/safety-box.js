const safetyBox = (secret, password) => {
    return attemptedPassword => {
        if (attemptedPassword === password)
            return secret

        throw new Error('wrong password')
    }
}

const box1 = safetyBox('a eugeni le gusta el numero 17', '456456456')
const box2 = safetyBox('a masha le gusta, pero no le gusta, ...', '678678678')

console.log(box1 === box2)
// false

box1('456456456')
//'a eugeni le gusta el numero 17'
box1('456456456_')
//VM241 closure:6 Uncaught Error: wrong password
//  at VM241 closure:6:15
//  at <anonymous>:1:1

box2('678678678')
//'a masha le gusta, pero no le gusta, ...'
box2('678678678_')
//closure:6 Uncaught Error: wrong password
//  at closure:6:15
//  at <anonymous>:1:1