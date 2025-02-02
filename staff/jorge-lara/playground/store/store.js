//Data
let data = {
    products: [
        {
            id: 'tr-fe',
            developer: 'Monolith',
            name: 'fear',
            price: 40
        },
        {
            id: 'so-hl',
            developer: 'Valve',
            name: 'halflife',
            price: 25
        },
        {
            id: 'pz-po',
            developer: 'Valve',
            name: 'portal',
            price: 25
        }
    ],
    //Variable for the cart
    cart: [],
    //Variable that acummulates the prices of the products
    total: 0,
    //Variable that saves all the old purchases
    orderhistory: []
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
                throw new Error('History is empty');
            }
        }
    },

    addToCart: function (idproduct) {
        logic.helper.checkIfActionCancelled(idproduct);

        let searchresults = logic.searchProducts(idproduct);

        if (searchresults.found) {
            data.cart.push(searchresults.productFound);
        }

        return searchresults.found;
    },

    searchProducts: function (idproduct) {
        logic.helper.checkIfActionCancelled(idproduct);

        let productFound = '';
        let found = false;

        for (let i = 0; i < data.products.length && !found; i++) {
            if (data.products[i].id == idproduct) {
                found = true;
                productFound = data.products[i];
            }
        }

        return {
            productFound: productFound,
            found: found
        }
    },

    calculateCartTotal: function () {
        logic.helper.isCartEmpty()

        data.total = 0;
        for (let items of data.cart) {
            data.total += items.price
        }

        return data.total;
    },

    checkoutCart: function () {
        logic.helper.isCartEmpty();
        logic.addToOrderHistory();
        data.cart = [];
        data.total = 0;
    },

    addToOrderHistory: function () {
        logic.helper.isCartEmpty();

        let purchasetime = {
            fecha: new Date(),
            checkout: data.total
        }

        data.cart.push(purchasetime);
        for (let i = 0; i < data.cart.length; i++) {
            data.orderhistory.push(data.cart[i])
        }
    },

    calculateTax: function () {
        logic.helper.isCartEmpty();

        data.total = 0;

        for (let items of data.cart) {
            data.total += items.price * this.constants.TAX;
        }

        return data.total;
    },

    getCart: function () {
        return data.cart;
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
        LIST_PRODUCTS : 1,
        ADD_PRODUCT_TO_CART : 2,
        GET_CART_TOTAL : 3,
        CHECKOUT_CART : 4,
        VIEW_ORDERS_HISTORY : 5,
        EXIT : 6
    },
    //Lists all available products
    listproducts: function () {
        let products = logic.getProducts();

        let table = this.constants.TABLE_HEADERS;

        for (var i = 0; i < products.length; i++) {
            var product = products[i]

            table += product.id + '     ' + product.developer + '     ' + product.name + '     ' + product.price + '\n'
        }
        alert(table);
    },

    addProductToCart: function () {
        let idproduct = prompt('Introduce id of the product')
        try {
            if (logic.addToCart(idproduct)) {
                alert('Added to cart');
            } else {
                alert('Product not found');
            }
        } catch (error) {
            alert(error.message)
        }
    },

    showCart: function () {
        try {
            let total = logic.calculateCartTotal();
            let cart = logic.getCart();
            let table = interface.constants.TABLE_HEADERS;

            for (var i = 0; i < cart.length; i++) {
                table += cart[i].id + cart[i].developer + cart[i].name + cart[i].price + '\n'
            }

            alert(table + '\n Total: ' + total + '€');
        } catch (error) {
            alert(error.message);
        }

    },

    placeOrder: function () {
        try {
            let totaltaxed = logic.calculateTax();
            let cart = logic.getCart();
            let table = interface.constants.TABLE_HEADERS;

            for (var i = 0; i < cart.length; i++) {
                table += cart[i].id + cart[i].developer + cart[i].name + cart[i].price + '\n'
            }

            alert(table + '\n Total: ' + totaltaxed + '€');

            if (window.confirm('Confirm purchase?')) {
                logic.checkoutCart();
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
            option = parseInt(prompt('Choose an option by typing the number\n 1.List of products\n 2.Add to cart\n 3.Get cart total\n 4.Checkout\n 5.View old orders\n 6.Exit shop'));
            switch (option) {
                case this.constants.LIST_PRODUCTS:
                    interface.listproducts();
                    break;
                case this.constants.ADD_PRODUCT_TO_CART:
                    interface.addProductToCart();
                    break;
                case this.constants.GET_CART_TOTAL:
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
