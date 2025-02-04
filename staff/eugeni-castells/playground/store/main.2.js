var products = [
  {
    id: "ap",
    name: "apple",
    color: "green",
    price: 2,
    stock: 3,
  },
  {
    id: "or",
    name: "orange",
    color: "orange",
    price: 1,
    stock: 2,
  },
  {
    id: "pi",
    name: "pineapple",
    color: "yellow",
    price: 5,
    stock: 1,
  },
];

var displayMenu = true;

var cart = [];

var checkoutHistory = [];

function closeMenu() {
  var closeMenu = "";

  while (closeMenu !== "yes" && closeMenu !== "no") {
    closeMenu = prompt("Do you want to continue?");
  }

  closeMenu === "yes" ? (displayMenu = true) : (displayMenu = false);

  return displayMenu;
}

function askOption() {
  var optionSelected = "";
  while (
    optionSelected !== "1" &&
    optionSelected !== "2" &&
    optionSelected !== "3" &&
    optionSelected !== "4" &&
    optionSelected !== "5"
  ) {
    optionSelected = prompt(
      "What do you want to do?\n1. Show products.\n2. Add product to cart\n3. Show products in cart\n4. Checkout\n5. Show order history"
    );
  }
  return optionSelected;
}

function askQuantity() {
  var quantity;

  quantity = parseInt(prompt("How many?"));

  return quantity;
}

function optionSelector(option) {
  switch (option) {
    case "1":
      showProducts();
      break;
    case "2":
      addToCart();
      break;
    case "3":
      showCart();
      break;
    case "4":
      checkOut();
    case "5":
      showOrderHistory();
  }
}

function showProducts() {
  console.table(products);
}

function searchProduct(id) {
  var matchedProduct = {};

  for (var i = 0; i < products.length; i++) {
    if (products[i].id === id) {
      return (matchedProduct = products[i]);
    }
  }
  return matchedProduct;
}

function askSearchOption() {
  var searchedItemId = "";

  while (
    searchedItemId !== "ap" &&
    searchedItemId !== "or" &&
    searchedItemId !== "pi"
  ) {
    searchedItemId = prompt(
      "What product you want to look for?\nYou can search for name or id"
    );
  }

  return searchProduct(searchedItemId);
}

function checkIfStock(quantity, id) {
  evaluatedProduct = searchProduct(id);

  return quantity <= evaluatedProduct.stock;
}

function addToCart() {
  var addedItemId = "";

  var quantity = 0;

  while (addedItemId !== "pi" && addedItemId !== "or" && addedItemId !== "ap") {
    addedItemId = prompt(
      "What's the id of the product you want to buy?\nYou can check it in the option 1"
    );
  }

  if (searchProduct(addedItemId).stock === 0) {
    console.log("Product out of stock!");
    addToCart();
    return;
  }

  quantity = askQuantity();

  if (checkIfStock(quantity, addedItemId)) {
    for (var i = 0; i < quantity; i++) {
      cart[cart.length] = { ...searchProduct(addedItemId) };

      searchProduct(addedItemId).stock -= 1;

      console.log(`${cart[cart.length - 1].name} has been added to the cart!`);
    }
  } else {
    console.log("The request exceeds the current stock!");

    addToCart();

    return;
  }
}

function showCart() {
  if (cart.length > 0) {
    console.table(cart);
  } else console.log("There's nothing in the cart yet!");
}

function getDate() {
  const now = new Date();

  var year = now.getFullYear();

  var month = now.toLocaleString("default", { month: "long" });

  var hour = now.getHours().toString().padStart(2, "0");

  var minutes = now.getMinutes().toString().padStart(2, "0");

  var formattedDate = `${year}-${month}-${hour}:${minutes}`;

  return formattedDate;
}

function checkOut() {
  var receipt = [
    {
      id: "",
      date: "",
      prod: [],
      orderPrice: 0,
    },
  ];
  var totalPriceWithoutIva = 0;
  var totalPriceWithIva = 0;

  if (cart.length > 0) {
    for (var i = 0; i < cart.length; i++) {
      for (var j = 0; j < products.length; j++) {
        if (products[j].id === cart[i].id) {
          products[j].stock = products[j].stock - 1;

          totalPriceWithoutIva += cart[i].price;
        }
      }
    }

    totalPriceWithIva = totalPriceWithoutIva * 1.21;

    receipt.id = checkoutHistory.length + 1;
    receipt.date = getDate();
    receipt.orderPrice = totalPriceWithIva;
    receipt.prod = { ...cart };
    cart = [];
    checkoutHistory[checkoutHistory.length] = receipt;
    console.table(receipt, receipt.prod);
  } else console.log("Cart is empty!");
}

function showOrderHistory() {
  if (checkoutHistory.length > 0) {
    console.table(checkoutHistory);
  } else console.log("You haven't bought anything yet!");
}

/*while(displayMenu){
    optionSelector(askOption())
    closeMenu()
}
*/
