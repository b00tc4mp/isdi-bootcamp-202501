/*
function setTimeoutPromised(millis) {
    return new Promise(function (resolve) {
        setTimeout(resolve, millis)
    })
}
*/

/*
const setTimeoutPromised = millis => {
    return new Promise(resolve => {
        setTimeout(resolve, millis)
    })
}
*/

const setTimeoutPromised = millis => new Promise(resolve => setTimeout(resolve, millis))


/*
setTimeoutPromised(2000)
    .then(() => console.log('hola promise'))
*/


const askCoffee = () => {
    console.log('ask coffee. machine starts preparing it')

    buyProductInAmazon()

    setTimeoutPromised(1000)
        .then(() => {
            console.log('coffee ready. smell it, drink it, enjoy it')

            walkTheDog()
        })
}

const buyProductInAmazon = () => {
    console.log('buy product in amazon')

    setTimeoutPromised(10000)
        .then(() => {
            console.log('product arrived. check it. enjoy it')
        })
}

const walkTheDog = () => {
    console.log('bring the dog outside to walk')

    setTimeoutPromised(6000)
        .then(() => {
            console.log('dog walked. clean feet. get dog inside home')

            takeAShower()
        })
}

const takeAShower = () => {
    console.log('get inside bath and start shower')

    setTimeoutPromised(3000)
        .then(() => {
            console.log('shower finished. dry and dress up')

            console.log('life goes on ...')
        })
}

askCoffee()