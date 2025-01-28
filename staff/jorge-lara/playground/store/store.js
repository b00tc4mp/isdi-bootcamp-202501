let fear = {
    id: 'tr-fe',
    developer: 'Monolith',
    name: 'fear',
    price: 40
}

let halflife = {
    id: 'so-hl',
    developer: 'smart',
    name: 'halflife',
    price: 25
}

let portal = {
    id: 'pz-po',
    developer: 'opel',
    name: 'portal',
    price: 25
}
let products = [fear, halflife, portal]
let lista = '';
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
//This to variables are for the function searchProducts. One save the product found and the other tells if its found the product or not
let productFound = '';
let found = false;

//Lists all available products
function listproducts() {
    console.table(products);
}

//Function that adds an item into the cart. This function asks the user what product he/she wants and searches for it by calling the function searchProducts()
function addToCart() {
    let backtomenu = '';
    do {
        let product = searchProducts();
        if (product == PRODUCT_NOT_FOUND) {
            backtomenu = prompt("Type product id again or press cancel")
        } else {
            //cart[cart.length] = product;
            cart.push(product);
            backtomenu = null;
        }
    } while (backtomenu != null);


}

//Displays the total price excluding tax and the current products in the cart
function getCartTotal() {
    for (let i = 0; i < cart.length; i++) {
        total += cart[i].price;
    }
    console.table(cart);
    console.log('Total (without iva): ' + total + '€');
    total = 0;
}

//This function calculates the total VAT and asks the user if he/she wants to finalize the purchase. Once the purchase is finished, it is saved in the history by calling the addToOrderHistory().
function checkoutCart() {
    if (cart.length != 0) {
        console.log("Cart");
        console.table(cart);
        for (let i = 0; i < cart.length; i++) {
            total += cart[i].price * IVA;
        }
        console.log('Total: ' + total + '€')
        if (window.confirm('Confirm purchase?')) {
            console.log("Order Processed");
            addToOrderHistory();
            cart = [];
        } else {
            total = 0;
        }
    } else {
        console.log("Cart is empty!")
    }


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

//Displays the history
function viewOrdersHistory() {
    console.table(orderhistory);
}

//Search the products by id
function searchProducts() {

    let id = prompt("introduce id of the product");
    for (let i = 0; i < products.length && !found; i++) {
        if (products[i].id == id) {
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
                addToCart();
                break;
            case GET_CART_TOTAL:
                getCartTotal();
                break;
            case CHECKOUT_CART:
                checkoutCart();
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
