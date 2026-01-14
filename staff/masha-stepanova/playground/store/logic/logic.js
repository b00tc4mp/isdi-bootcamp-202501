const logic = {
    constant: {
        EMPTY_OR_BLANK_REGEX: /^\s*$/,
        EMAIL_REGEX: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
        URL_REGEX: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
    },

    validate: {
        string(string, explain) {
            if (typeof string !== 'string') throw new TypeError(`invalid ${explain} type`)
        },
        text(text, explain) {
            if (logic.constant.EMPTY_OR_BLANK_REGEX.test(text)) throw new SyntaxError(`invalid ${explain} syntax`)
        },
        email(email, explain) {
            this.string(email, explain)
            if (!logic.constant.EMAIL_REGEX.test(email)) throw new SyntaxError(`invalid ${explain} syntax`)
        },
        maxLength(value, maxLength, explain) {
            if (value.length > maxLength) throw new RangeError(`invalid ${explain} maxLength`)
        },
        minLength(value, minLength, explain) {
            if (value.length < minLength) throw new RangeError(`invalid ${explain} minLength`)
        },
        username(username, explain) {
            this.text(username, explain)
            this.minLength(username, 3, explain)
            this.maxLength(username, 20, explain)
        },
        password(password, explain) {
            this.text(password, explain)
            this.minLength(password, 8, explain)
            this.maxLength(password, 20, explain)
        },
        url(url, explain) {
            this.string(url, explain)
            if (!logic.constant.URL_REGEX.test(url)) throw new SyntaxError(`invalid ${explain} syntax`)
        },
        id(id, explain) {
            this.text(id, explain)
            if (id.length < 10 || id.length > 11)
                throw new RangeError(`invalid ${explain} length`)
        }
    },

    helper: {

        getListToPrint: function (list) {
            return list
        },

    },

    prepareCartToPrint: function () {
        table = ''
        for (var i = 0; i < data.cart.length; i++) {
            product = data.cart[i]
            table += `${product.id}, ${product.name}, ${product.type}, ${product.price}, ${product.quantity}
            `
        }
    },

    prepareListToPrint: function () {
        table = ''
        for (var i = 0; i < data.cart.length; i++) {
            product = data.productsList[i]
            table += `${product.id}, ${product.name}, ${product.type}, ${product.price}, ${product.stock}
            `
        }
    },

    validateShoppingOption: function (productName) {
        var validOptions = '123456'

        for (var i = 0; i < validOptions.length; i++)
            if (productName === validOptions[i])
                return true

        return false
    },

    registerUser: function (name, surname, email, password) {
        this.validate.text(name, 'name')
        this.validate.minLength(name, 1, 'name')
        this.validate.maxLength(name, 20, 'name')
        this.validate.username(surname, 'surname')
        this.validate.email(email, 'email')
        this.validate.password(password, 'password')

        const found = data.storeUsers.findOne(user => user.email === email)

        if (found) throw new Error('user already exists')

        const user = {
            name: name,
            surname: surname,
            email: email,
            password: password,
            createdAt: new Date(),
            modifiedAt: null
        }

        data.storeUsers.insertOne(user)
    },

    loginUser(email, password) {
        this.validate.email(email, 'email')
        this.validate.password(password, 'password')

        const found = data.storeUsers.findOne(user => user.email === email)

        if (!found || found.password !== password) throw new Error('wrong credentials')

        data.userId = found.id
    },

    logoutUser() {
        data.userId = null
    },

    // TODO
    getProducts() {
        const posts = data.products.getAll()

        const { userId } = data

        const aggregatedPosts = []

        for (let i = 0; i < posts.length; i++) {
            const post = posts[i]

            let liked = false

            for (let i = 0; i < post.likes.length && !liked; i++) {
                const id = post.likes[i]

                if (id === userId)
                    liked = true
            }

            const user = data.users.getById(post.author)

            const aggregatedPost = {
                id: post.id,
                author: { id: post.author, username: user.username },
                image: post.image,
                text: post.text,
                createdAt: new Date(post.createdAt),
                modifiedAt: post.modifiedAt && new Date(post.modifiedAt),
                liked: liked,
                likesCount: post.likes.length,
                own: post.author === userId

            }

            aggregatedPosts.push(aggregatedPost)
        }

        return aggregatedPosts.reverse()
    },




    // chooseShoppingOption: function (productName) {

    //     switch (productName) {
    //         case '1':
    //             interface.showProductsList()
    //             break
    //         case '2':
    //             interface.filterProducts()
    //             break
    //         case '3':
    //             interface.askForProduct()
    //             break
    //         case '4':
    //             interface.showCart()
    //             break
    //         case '5':
    //             interface.placeOrder()
    //             break
    //         case '6':
    //             interface.showShoppingHistory()
    //             break

    //     }
    // },

    // getDataToPrint(data.productsList)

    // getDataToPrint(data.cart) 

    generatereceipt: function () {
        data.receipt = []
        var total = 0
        var tax = 0
        var basePrice = 0

        for (var i = 0; i < logic.helper.cart.length; i++) {
            logic.helper.receipt[logic.helper.receipt.length] = logic.helper.cart[i]
            total += logic.helper.cart[i]['price'] * logic.helper.cart[i]['quantity']
        }

        tax = total * 0.21
        basePrice = total * 0.79

        logic.helper.receipt[logic.helper.receipt.length] = `Base price: ${basePrice} €`
        logic.helper.receipt[logic.helper.receipt.length] = `Taxes: ${tax} €`
        logic.helper.receipt[logic.helper.receipt.length] = `Total: ${total} €`
        logic.helper.receipt[logic.helper.receipt.length] = Date()
        logic.helper.cart = []

        return logic.helper.receipt
    },

    generateHistory: function () {
        for (var i = logic.helper.receipt.length - 1; i >= 0; i--) {
            data.generatedHistory[data.generatedHistory.length] = logic.helper.receipt[i]
        }

        return data.generatedHistory
    },

    checkProductStock: function (id, quantity) {
        for (var i = 0; i < data.length; i++) {
            if (data.productsList[i]['id'] === id) {
                if (data.productsList[i]['stock'] >= quantity)
                    return data.productsList[i]
            }
        }

        throw new Error('Not enough stock')
    },

    addToCart: function (productId) {
        const products = data.products

        const found = false

        for (var i = 0; i < products.length && !false; i++) {
            const product = products[i]

            if (productId === product.id)
                data.cart.push(product)

            product.quantity--

            return data.cart
        }

        throw new Error('Couldn\'t add to cart')
    },

    checkProductExistance: function (productName) {
        for (var i = 0; i < data.productsList.length; i++)

            for (var prop in data.productsList[i])

                if (data.productsList[i][prop] === productName)
                    return data.productsList[i]

        throw new Error('This product does not exist')
    },

    addFoundProduct: function (productName) {
        var searchResult = []

        searchResult[searchResult.length] = (productName)

        return searchResult
    }

}
