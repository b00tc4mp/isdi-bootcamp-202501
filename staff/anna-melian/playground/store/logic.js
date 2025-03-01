var logic = {
    helper: {

        invalidMenuOption: function (answer) {
            if (answer === '') {
                throw new Error('Number is need')
            }
            answerNumber = Number(answer)
            let valid
            if (answerNumber < 7 && answerNumber >= 0) {
                valid = true
            } else {
                valid = false
            }
            if (!valid) {
                throw new Error('Invalid option')
            }
        },

        invalidIdOption: function (id) {
            var validCharacters = 'abcdefghijklmnopqrstuvxyz-'
            var valid = false
            for (var i = 0; i < validCharacters.length; i++) {
                for (var j = 0; j < id.length; j++) {
                    if (id[j] === validCharacters[i]) {
                        valid = true
                    }
                }

            }
            if (!valid) {
                throw new Error('Invalid option')
            }
        },

        invalidText: function (answer) {
            if (!/^[a-zA-Z\s]*$/.test(answer)) {
                throw new TypeError('Invalid type answer')
            }
        },

        invalidNumber: function (number) {
            var isANumber = false
            if (typeof number === 'string') {
                if (Number(number) <= 100 && Number(number) > 0) {
                    isANumber = true
                }
            }
            if (!isANumber) {
                throw new Error('Invalid option')

            }
        },

        idExist: function (id) {
            var productExist = false
            for (var i = 0; i < data.products.length; i++) {
                if (id === data.products[i].id) {
                    productExist = true
                }
            }
            if (!productExist) {
                throw new Error("This product doesn't exist")
            }

        },

    },


    createNewObject: function (object, objectName, objectType, objectPrice) {
        var object = {
            id: object[0] + object[1] + object[2] + '-' + objectName[0] + objectName[1] + object[2],
            name: objectName,
            type: objectType,
            price: objectPrice,
        }
        data.products[data.products.length] = object

    },

    addProductToCart: function (product) {
        data.cart.push(product)


    },

    removeProductCart: function (product) {
        const productIndex = data.cart.indexOf(product)
        data.cart.splice(productIndex, 1)
    },

    cartStatus: function () {
        if (data.cart.length === 0) {
            throw new Error('The cart is empty')
        }
        return data.cart
    },
    WhatsUserElection: function () {
        const num = data.userOption
        if (num == 0) {
            return 0
        } else if (num == 1) {
            return 1
        } else if (num == 2) {
            return 2
        } else if (num == 3) {
            return 3
        } else if (num == 4) {
            return 4
        } else if (num == 5) {
            return 5
        }
        return false
    },

    addToReceipt: function (id) {
        for (var i = 0; i < data.products.length; i++) {
            if (id === data.products[i].id) {
                data.receipt[data.receipt.length] = data.products[i]
            }
        }
    },

    receiptStatus: function () {
        if (data.receipt.length === 0) {
            throw new Error("The cart is empty, you can't generate a receipt")
        }
        return data.receipt
    },

    resetCart: function () {
        data.cart = []
    },

    searchResults: function (search) {
        const results = data.products.filter(product =>
            product.name.toLowerCase().includes(search.toLowerCase()) ||
            product.type.toLowerCase().includes(search.toLowerCase())

        ) //return an array

        return results



    }
}