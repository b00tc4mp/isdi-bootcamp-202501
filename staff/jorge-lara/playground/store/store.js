//Data
let data = {
    products: [
        {
            id: 'tr-fe',
            developer: 'monolith',
            name: 'fear',
            description: 'Experience the original F.E.A.R. along with F.E.A.R.',
            genre: 'terror',
            price: 40
        },
        {
            id: 'so-hl2',
            developer: 'valve',
            name: 'half-life 2',
            description: 'Reawakened from stasis in the occupied metropolis of City 17, Gordon Freeman is joined by Alyx Vance as he leads a desperate human resistance',
            genre: 'shooter',
            price: 25
        },
        {
            id: 'so-hl',
            developer: 'valve',
            name: 'half-life',
            description: 'Half-Life is a singleplayer and multiplayer FPS game in the Half-Life series developed by Valve and published by Sierra On-Line.',
            genre: 'shooter',
            price: 10
        },
        {
            id: 'pz-po',
            developer: 'valve',
            name: 'portal',
            description: 'Portal is a new single player game from Valve. Set in the mysterious Aperture Science Laboratories',
            genre: 'puzzle',
            price: 25
        },
        {
            id: 'av-go',
            developer: 'santaMonica',
            name: 'god of war',
            description: 'God of War is a 2005 action-adventure game developed by Santa Monica Studio and published by Sony Computer Entertainment',
            genre: 'action',
            price: 30
        }
    ],
    //Variable for the cart
    cart: [],
    //Variable that acummulates the prices of the products
    total: 0,
    //Variable that saves all the old purchases
    orderhistory: [],

    searchBycategory: function (query, category) {
        let arr = [];
        for (let i = 0; i < this.products.length; i++) {
            if (this.products[i][category].toLowerCase().includes(query)) {
                arr.push(this.products[i]);
            }
        }

        return arr;
    }
}

//LOGIC
let logic = {
    constants: {
        TAX: 1.21
    },

    helper: {
        checkIfActionCancelled: function (checkinput) {
            if (checkinput === null || checkinput === '') {
                throw new Error('Action cancelled')
            }
        },
        isCartEmpty: function () {
            if (data.cart.length === 0) {
                throw new Error('Cart is empty');
            }
        },
        isOrderHistoryEmpty: function () {
            if (data.orderhistory.length === 0) {
                throw new Error('No order history available');
            }
        },
        validateCategory: function (category) {
            if (category != 'name' && category != 'developer' && category != 'genre') {
                throw new TypeError('Invalid category. Please use name, developer, or genre to filter')
            }
        }
    },

    searchProducts: function (idproduct) {
        logic.helper.checkIfActionCancelled(idproduct);

        let productfound = '';
        let found = false;

        for (let i = 0; i < data.products.length && !found; i++) {
            if (data.products[i].id == idproduct) {
                found = true;
                productfound = data.products[i];
            }
        }

        return productfound;
    },

    getProductFiltered: function (query, category) {
        let queryresult = data.searchBycategory(query, category)

        if (queryresult.length === 0) {
            throw new Error('No products found for your filter')
        }
        return queryresult;
    },

    addToCart: function (idproduct) {
        logic.helper.checkIfActionCancelled(idproduct);

        let searchresults = logic.searchProducts(idproduct);

        if (searchresults === '') {
            throw new Error('Product not found');
        } else {
            searchresults.removed = false;
            data.cart.push(searchresults);
        }
    },

    removeProductCart: function (idproduct) {
        logic.helper.checkIfActionCancelled(idproduct);
        logic.helper.isCartEmpty();

        let cart = data.cart;
        let successfullyremoved = false;

        for (let i = 0; i < cart.length && !successfullyremoved; i++) {
            if (cart[i].id === idproduct) {
                cart[i].removed = true;
                successfullyremoved = true;
            }

        }

        if (!successfullyremoved) {
            throw new Error('Id product not founded');
        }
    },

    calculateCartTotal: function (cart) {
        logic.helper.isCartEmpty()

        data.total = 0;
        for (let items of cart) {
            data.total += items.price
        }

        return data.total;
    },

    checkoutCart: function (cart) {
        logic.helper.isCartEmpty();
        logic.addToOrderHistory(cart);
        data.cart = [];
        data.total = 0;
    },

    addToOrderHistory: function (cart) {
        logic.helper.isCartEmpty();

        let purchasetime = {
            fecha: new Date(),
            checkout: data.total
        }

        cart.push(purchasetime);

        for (let i = 0; i < cart.length; i++) {
            data.orderhistory.push(cart[i])
        }
    },

    calculateTax: function (cart) {
        logic.helper.isCartEmpty();

        data.total = 0;

        for (let items of cart) {
            data.total += items.price * this.constants.TAX;
        }

        return data.total;
    },

    getCart: function () {
        logic.helper.isCartEmpty();
        let cartupdated = []
        for (let item of data.cart) {
            if (!item.removed) {
                cartupdated.push(item);
            }
        }
        return cartupdated;
    },

    getProducts: function () {
        return data.products;
    },

    getOrderHistory: function () {
        logic.helper.isOrderHistoryEmpty();
        return data.orderhistory;
    }

}

// INTERFACE

let interface = {
    constants: {
        TABLE_HEADERS: 'Products | Developer | name | price\n',
        LIST_PRODUCTS: 1,
        SHOW_PRODUCT: 2,
        FILTER_PRODUCTS: 3,
        ADD_PRODUCT_TO_CART: 4,
        REMOVE_PRODUCT_FROM_CART: 5,
        SHOW_CART: 6,
        CHECKOUT_CART: 7,
        VIEW_ORDERS_HISTORY: 8,
        EXIT: 9
    },
    //Lists all available products
    listproducts: function () {
        let products = logic.getProducts();

        let table = this.constants.TABLE_HEADERS;

        for (let i = 0; i < products.length; i++) {
            let product = products[i]

            table += product.id + '     ' + product.developer + '     ' + product.name + '     ' + product.price + '\n'
        }
        alert(table);
    },

    showProduct: function () {
        let productsearched = prompt('Enter product id');

        let productidfound = logic.searchProducts(productsearched);

        alert('Product found\n Id: ' + productidfound.id + '\n Developer: ' + productidfound.developer + '\n Name: ' + productidfound.name + '\n Description: ' + productidfound.description + '\n Genre: ' + productidfound.genre + '\n Price: ' + productidfound.price);
    },

    filterProducts: function () {

        try {
            let searchcategory = prompt('What filter you want? Name,Developer or genre').toLowerCase();
            logic.helper.checkIfActionCancelled(searchcategory);
            logic.helper.validateCategory(searchcategory);

            let query = prompt('Type the ' + searchcategory + 'you want to filter').toLowerCase();
            logic.helper.checkIfActionCancelled(query);

            let filterresult = logic.getProductFiltered(query, searchcategory);

            let list = this.constants.TABLE_HEADERS;

            for (let i = 0; i < filterresult.length; i++) {
                let product = filterresult[i]

                list += product.id + '     ' + product.developer + '     ' + product.name + '     ' + product.price + '\n'
            }
            alert(list);

        } catch (error) {
            alert(error.message);
        }
    },

    addProductToCart: function () {
        let idproduct = prompt('Enter the product ID')
        try {
            logic.addToCart(idproduct);

            alert('Product added to cart');

        } catch (error) {
            alert(error.message);
        }
    },

    removeProductFromCart: function () {
        let idproduct = prompt('Enter the product ID you want to remove')
        try {
            logic.removeProductCart(idproduct);

            alert('Product has been removed from the cart');
        } catch (error) {
            alert(error.message);
        }


    },
    showCart: function () {
        try {
            let cart = logic.getCart();
            let total = logic.calculateCartTotal(cart);

            let table = interface.constants.TABLE_HEADERS;

            for (let i = 0; i < cart.length; i++) {
                table += cart[i].id + '     ' + cart[i].developer + '     ' + cart[i].name + '     ' + cart[i].price + '\n'
            }

            alert(table + '\n Total: ' + total + '€');
        } catch (error) {
            alert(error.message);
        }

    },

    placeOrder: function () {
        try {
            let cart = logic.getCart();
            let totaltaxed = logic.calculateTax(cart);
            let table = interface.constants.TABLE_HEADERS;

            for (let i = 0; i < cart.length; i++) {
                table += cart[i].id + '     ' + cart[i].developer + '     ' + cart[i].name + '     ' + cart[i].price + '\n';
            }

            alert(table + '\n Total: ' + totaltaxed + '€');

            if (window.confirm('Confirm purchase?')) {
                logic.checkoutCart(cart);
                alert('Checkout completed');
            }

        } catch (error) {
            alert(error.message);
        }

    },
    //Displays the history
    viewOrdersHistory: function () {
        try {
            let history = logic.getOrderHistory();

            let table = this.constants.TABLE_HEADERS;

            for (let i = 0; i < history.length; i++) {
                if (history[i].id && history[i].developer && history[i].name && history[i].price) {
                    table += history[i].id + '     ' + history[i].developer + '     ' + history[i].name + '     ' + history[i].price + '€\n'
                } else {
                    table += 'Checkout total: ' + history[i].checkout + '€ on ' + history[i].fecha + '\n';
                }
            }
            alert(table)
        } catch (error) {
            alert(error.message);
        }

    },


    storeMenu: function () {
        let option = 0;
        do {
            option = parseInt(prompt('Choose an option by typing the number\n 1.List of products\n 2.Show Product\n 3.Filter products\n 4.Add to cart\n 5.Remove product from cart \n 6.Show Cart\n 7.Checkout\n 8.View old orders\n 9.Exit shop'));
            switch (option) {
                case this.constants.LIST_PRODUCTS:
                    interface.listproducts();
                    break;
                case this.constants.SHOW_PRODUCT:
                    interface.showProduct();
                    break;
                case this.constants.FILTER_PRODUCTS:
                    interface.filterProducts();
                    break;
                case this.constants.ADD_PRODUCT_TO_CART:
                    interface.addProductToCart();
                    break;
                case this.constants.REMOVE_PRODUCT_FROM_CART:
                    interface.removeProductFromCart();
                    break;
                case this.constants.SHOW_CART:
                    interface.showCart();
                    break;
                case this.constants.CHECKOUT_CART:
                    interface.placeOrder();
                    break;
                case this.constants.VIEW_ORDERS_HISTORY:
                    interface.viewOrdersHistory();
                    break;
                default:
                    if (option == this.constants.EXIT) {
                        console.log("Program ended")
                    } else {
                        alert('Option not found, type the correct menu numbers')
                    }
                    break;
            }
        } while (option != this.constants.EXIT)
    }

}

interface.storeMenu();
