var data = {}
var logic = {}
var interface = {}

data.products = [
    {
      id: "",
      name: "",
      color:"",
      
    },
    {
      id: "",
      name: "",
      color:"",
    },
    {
      id: "",
      name: "",
      color:"",
    },
];

interface.listProducts = function(){
    console.dir(products)
}
logic.selectOption(64)
logic.selectOption = function(action) {
   
    switch(action) {
        case '1':
            showList()
            break
        case '2':
            filterProducts()
            break
        case '3':
            addToCart()
            break
        case '4':
            showCart()
            break
        case '5':
            generateReciept()
            break
        case '6':
            shoppingHistory()
            break
            
    }
}

interface.selectOption = function(){
    var selectionUsuari = prompt(`Please, choose what you would like to do:
        1 - See the list products
        2 - Search one product
        3 - Add product to the cart
        4 - Summary of your cart
        5 - Cart checkout
        6 - See shopping history`)  
    
    logic.selectOption(selectionUsuari)
}