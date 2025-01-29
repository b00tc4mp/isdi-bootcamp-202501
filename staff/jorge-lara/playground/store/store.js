//Data
let fear = {
    id: 'tr-fe',
    developer: 'Monolith',
    name: 'fear',
    price: 40
}

let halflife = {
    id: 'so-hl',
    developer: 'Valve',
    name: 'halflife',
    price: 25
}

let portal = {
    id: 'pz-po',
    developer: 'Valve',
    name: 'portal',
    price: 25
}
let products = [fear, halflife, portal]
//Constants
const LIST_PRODUCTS = 1;
const ADD_PRODUCT_TO_CART = 2;
const GET_CART_TOTAL = 3;
const CHECKOUT_CART = 4;
const VIEW_ORDERS_HISTORY = 5;
const EXIT = 6;
const PRODUCT_NOT_FOUND = 'product not found';
const IVA = 1.21;

//Variable for the cart
let cart = [];
//Variable that acummulates the prices of the products
let total = 0;
//Variable that saves all the old purchases
let orderhistory = [];

//LOGIC

//Function that adds an item into the cart.
function addToCart(idproduct) {
    let addedsucesfully = true;
    if (idproduct === null) {
        throw new Error('Action cancelled');
    } else {
        let product = searchProducts(idproduct);

        if (product == PRODUCT_NOT_FOUND) {
            addedsucesfully = false;
        } else {
            cart.push(product);
        }
    }

    return addedsucesfully;
}

//Gets the total price excluding tax and the current products in the cart
function getCartTotal(option) {
    total = 0;
    if (option === GET_CART_TOTAL) {
        for (let i = 0; i < cart.length; i++) {
            total += cart[i].price;
        }
    } else if (option === CHECKOUT_CART) {
        for (let i = 0; i < cart.length; i++) {
            total += cart[i].price * IVA;
        }
    }
    return {
        cart: cart,
        total: total
    }
}

//This function save the checkout
function checkoutCart() {
    addToOrderHistory();
    cart = [];
    total = 0;
}

//Adds the processed order to the orderhistory array and also adds the time and the total amount of the purchased item
function addToOrderHistory() {
    let purchasetime = {
        fecha: new Date(),
        checkout: total
    }
    cart.push(purchasetime);
    for (let i = 0; i < cart.length; i++) {
        orderhistory.push(cart[i])
    }
}

//Search the products by id
function searchProducts(productid) {
    let productFound = '';
    let found = false;

    for (let i = 0; i < products.length && !found; i++) {
        if (products[i].id == productid) {
            found = true;
            productFound = products[i];
        }
    }
    if (found) {
        found = false;
        return productFound;
    } else {
        return PRODUCT_NOT_FOUND;
    }

}

//Checks if the cart is empty
function isCartEmpty(cart) {
    return cart.length === 0;
}

// VIEW

//Displays the history
function viewOrdersHistory() {
    console.table(orderhistory);
}


//Lists all available products
function listproducts() {
    console.table(products);
}

//Main menu of the store
function storeMenu() {
    let option = 0;
    do {
        option = parseInt(prompt('Choose an option by typing the number\n 1.List of products\n 2.Add to cart\n 3.Get cart total\n 4.Checkout\n 5.View old orders\n 6.Exit shop'));
        switch (option) {
            case LIST_PRODUCTS:
                listproducts();
                break;
            case ADD_PRODUCT_TO_CART:
                let idproduct = prompt('Introduce id of the product')
                try {
                    if (addToCart(idproduct)) {
                        alert('Added to cart');
                    } else {
                        alert(PRODUCT_NOT_FOUND);
                    }
                } catch (error) {
                    alert(error.message)
                }
                break;
            case GET_CART_TOTAL:
                let carttotal = getCartTotal(option);
                if (isCartEmpty(carttotal.cart)) {
                    console.log('Cart is empty');
                } else {
                    console.table(carttotal.cart);
                    console.log(carttotal.total + '€');
                }
                break;
            case CHECKOUT_CART:
                let checkouttotal = getCartTotal(option);
                if (isCartEmpty(checkouttotal.cart)) {
                    console.log('Cart is empty');
                } else {
                    
                    console.table(checkouttotal.cart);
                    console.log(checkouttotal.total + '€');
                    if (window.confirm('Confirm purchase?')) {
                        checkoutCart();
                        console.log('Checkout completed');
                    }
                }
                break;
            case VIEW_ORDERS_HISTORY:
                viewOrdersHistory();
                break;
            default:
                if (option == EXIT) {
                    console.log("Program ended")
                } else {
                    alert('Option not found, type the correct menu numbers')
                }
                break;
        }
    } while (option != 6)


}

storeMenu();
