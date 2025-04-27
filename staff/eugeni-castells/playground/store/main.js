var products = [
  {
    id: "ap",
    name: "apple",
    color: "green",
    price: 2,
  },
  {
    id: "or",
    name: "orange",
    color: "orange",
    price: 1,
  },
  {
    id: "ba",
    name: "banana",
    color: "yellow",
    price: 5,
  },
];

var cart = [];
var checkoutHistory = [];

function showProducts() {
  console.table(products);
}

function searchProduct(id) {
  for (var i = 0; i < products.length; i++) {
    if (products[i].id === id) {
      console.table(products[i]);
    }
  }
}

function addToCart(id) {
  for (var i = 0; i < products.length; i++) {
    if (products[i].id === id) {
      cart[cart.length] = products[i];
    }
  }
}

function showCart() {
  console.table(cart, "Total price: ");
}

function getDate() {
  var date = new Date();
  var year = date.getFullYear();
  var month = String(date.getMonth() + 1).padStart(2, "0");
  var day = String(date.getDate()).padStart(2, "0");
  var hour = String(date.getHours()).padStart(2, "0");
  var formattedDate = `${year} ${month} ${day} ${hour}`;

  return formattedDate;
}
function checkOut() {
  var totalPriceWithoutIva = 0;
  var totalPriceWithIva = 0;

  for (var i = 0; cart.length; i++) {
    //totalPriceWithIva+=cart[i][price];
    checkoutHistory[i] = cart[i];
  }

  totalPriceWithIva = totalPriceWithoutIva * 1.21;

  checkoutHistory[checkoutHistory.length].date = getDate();
  console.table(checkoutHistory);
}
addToCart("ba");
checkOut();
