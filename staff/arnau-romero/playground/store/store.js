/*implement a store 
(with operations: 'list products', 'add product to cart', 'get cart total', 'checkout cart, 'search products', 'list orders')
1- List products: list of products that the store have to buy it. [m1]
2- Add a product to your cart. [u1]
3- Get the summary of your cart, the list final of the product that you selected. [m2]
4- The total sum of the products in your cart €€€. [m3]
5- A function to search a product in the list products of the store. [m4]
6- A history of the checkout orders that you have done. [m5]
*/
//DATA
var products = [
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

var cart = []

function listProducts(){ //[m1]
    console.dir(products)
}

function addProductToCart(){ //[u1]
    
}

function cartSummary(){ //[m2]
    
}

function sumCartProducts(){ //[m3]
    
}

function searchProducts(){ //[m4]
    var productToSearch = prompt('What product do you want to search? ')
   for(var i = 0 ; i < products.length ; ii){
       if(productToSearch == products[i]){
           console.table(products[i])
       }
   }
}