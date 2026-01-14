const askCoffee = () => {
    console.log('ask coffee. machine starts preparing it')

    buyProductInAmazon()

    setTimeout(() => {
        console.log('coffee ready. smell it, drink it, enjoy it')

        walkTheDog()
    }, 1000)
}

const buyProductInAmazon = () => {
    console.log('buy product in amazon')

    setTimeout(() => {
        console.log('product arrived. check it. enjoy it')
    }, 10000)
}

const walkTheDog = () => {
    console.log('bring the dog outside to walk')

    setTimeout(() => {
        console.log('dog walked. clean feet. get dog inside home')

        takeAShower()
    }, 6000)
}

const takeAShower = () => {
    console.log('get inside bath and start shower')

    setTimeout(() => {
        console.log('shower finished. dry and dress up')

        console.log('life goes on ...')
    }, 3000)
}

askCoffee()


