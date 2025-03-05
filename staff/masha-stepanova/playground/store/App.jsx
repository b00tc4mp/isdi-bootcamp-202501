const { useState, useEffect } = React

function App() {
    const [view, setView] = useState('landing')

    function chooseShoppingOption() {
        var action = prompt(`Please, choose what you would like to do:
            1 - see all products
            2 - search for products
            3 - add product to the cart
            4 - see total of the cart
            5 - cart placeOrder
            6 - see shopping history`)

        try {
            logic.validateShoppingOption(action)
            logic.chooseShoppingOption(action)
        } catch (error) {
            alert(error.message)
            console.log(error)
            interface.chooseShoppingOption()
        }
    }

    // showProductsList() {
    //     try {
    //         alert(logic.getProductsList())
    //     } catch (error) {
    //         alert(error.message)
    //         console.log(error)
    //     }
    // },

    // showCart: function () {
    //     try {
    //         alert(logic.getCart())
    //     } catch (error) {
    //         alert(error.message)
    //         console.log(error)
    //     }
    // },

    // placeOrder: function () {
    //     try {
    //         alert(logic.generatereceipt())
    //     } catch (error) {
    //         alert(error.message)
    //         console.log(error)
    //     }
    // },

    // showShoppingHistory: function () {
    //     try {
    //         alert(logic.generateHistory())
    //     } catch (error) {
    //         alert(error.message)
    //         console.log(error)
    //     }
    // },

    // askForProduct: function () {
    //     data.helper.productId = prompt('Please, introduce the item ID')
    //     data.helper.productQuantity = prompt('Please, introduce desired quantity')
    //     var product = logic.checkProductStock(data.helper.productId, data.helper.productQuantity)

    //     try {
    //         logic.checkProductStock(data.helper.productId, data.helper.productQuantity)
    //         logic.addToCart(product, data.helper.productQuantity)
    //         alert(`The item '${logic.helper.cart[logic.helper.cart.length - 1]['name']}' is added to cart!`)

    //     } catch (error) {
    //         alert(error.message)
    //         console.log(error)
    //         interface.askForProduct()
    //     }
    // },

    // filterProducts: function () {
    //     var filter = prompt('What would you like to search now?')

    //     try {
    //         var foundProduct = logic.checkProductExistance(filter)
    //         alert(logic.addFoundProduct(foundProduct))
    //     } catch (error) {
    //         alert(error.message)
    //         console.log(error)
    //     }
    // },

    // automate: function () {
    //     try {
    //         var continueShopping = true
    //         while (continueShopping) {
    //             interface.chooseShoppingOption()
    //             var askToContinue = prompt('Do you want to continue shopping?')
    //             if (askToContinue === 'n' || askToContinue === 'no' || askToContinue === null) {
    //                 continueShopping = false
    //             }
    //         }
    //     } catch (error) {
    //         alert(error.message)
    //         console.log(error)
    //     }

    // }

    return <div>
        {view === 'landing' && <section>
            <p>Hello Store</p>
        </section>}
    </div>
}
