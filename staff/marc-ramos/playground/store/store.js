/*
- create products (objects) w/: id, name, type, price, stock.
- array products
- cart
- product quantity
- product id
- continue shopping?
*/

var interface = {}
var logic = {}
var data = {}

//DATA

data.productList = []
data.cart = []
data.productId = []

//LOGIC

logic.chooseOption = function (action) {
    
}

logic.searchProducts = function (){

}

//INTERFACE

interface.optionToChoose = function() {
    var action = prompt (`What do you want to do?
        1. See all the products
        2. Search for products
        3. Add product to cart
        4. See total cart
        5. Cart checkout
        6. See shopping history`)
}