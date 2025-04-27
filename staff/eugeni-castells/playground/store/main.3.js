//DATA
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

//LOGIC
function checkCloseMenuVariable(closeMenu) {
  if (closeMenu !== "yes" && closeMenu !== "no") {
    throw new Error("Please, introduce yes or no");
  } else {
    closeMenu === "yes" ? (displayMenu = true) : (displayMenu = false);
  }

  return displayMenu;
}

function checkAskOption(optionSelected) {
  if (
    optionSelected !== "1" &&
    optionSelected !== "2" &&
    optionSelected !== "3" &&
    optionSelected !== "4" &&
    optionSelected !== "5"
  ) {
    throw new Error("Please, select a number between 1-5");
  }
}

function retrieveProducts() {
  var productsSent = products;

  if (!productsSent) {
    throw new Error("Store is empty at the moment!");
  }
  return productsSent;
}

function searchProductById(id) {
  var matchedProduct = {};

  for (var i = 0; i < products.length; i++) {
    if (products[i].id === id) {
      return matchedProduct;
    }
  }
}

function searchProductByName(name) {
  var matchedProduct = {};

  for (var i = 0; i < products.length; i++) {
    if (products[i].name === name) {
      return matchedProduct;
    }
  }

  if (matchedProduct.id === undefined) {
    throw new Error("This product doesn't exist!");
  } else return matchedProduct;
}

function getIdByName(name) {
  var matchedId;
  for (var i = 0; i < products.length; i++) {
    if (products[i].name === name) {
      matchedId = products[i].id;
    }
  }
  return matchedId;
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

function checkAskSearchOption(searchOption) {
  if (searchOption !== "pi" && searchOption !== "or" && searchOption !== "ap") {
    throw new Error("No product matched! Make sure the name is correct");
  } else return searchOption;
}

function addItemToCart(item) {
  var itemCopy = { id: item.id, name: item.name, price: item.price };

  cart[cart.length] = itemCopy;
}

//PRESENTATION

function closeMenu() {
  try {
    var closeMenuPrompt = "";
    closeMenuPrompt = prompt("Do you want to continue?");
  } catch (error) {
    alert(error.message);
    closeMenu();
  }
  return closeMenuPrompt;
}

function askOption() {
  var optionSelected = "";
  optionSelected = prompt(
    "What do you want to do?\n1. Show products.\n2. Add product to cart\n3. Show products in cart\n4. Checkout\n5. Show order history"
  );
  try {
    checkAskOption(optionSelected);
  } catch (error) {
    alert(error.message);
    askOption();
  }
  return optionSelected;
}

function showProducts() {
  var retrievedProducts = retrieveProducts();
  try {
    console.table(retrievedProducts);
  } catch (error) {
    alert(error.message);
  }
}

function askSearchOption() {
  var searchedItemName = "";

  try {
    searchedItemName = prompt(
      "What's the name of the product you want to look for?\nYou can check it in the option 1"
    );
    checkAskSearchOption(searchedItemName);
  } catch (error) {
    alert(error.message);
    askSearchOption();
  }

  console.log(searchProductByName(searchedItemName));
}

function askQuantity(item) {
  var quantity = 0;

  quantity = prompt("How many units you want to add to the cart?");

  try {
    checkIfItemHasStock(item, quantity);
  } catch (error) {
    alert(error.message);
    askQuantity();
  }
}
function checkIfItemHasStock(evaluatedItem) {
  if (evaluatedItem.stock === 0) {
    throw new Error("The item is out of stock at the moment!");
  }
}

function checkIfItemHasQuantity(evaluatedItem, quantity) {
  if (evaluatedItem.stock < quantity) {
    throw new Error("The quantity introduced exceeds the current stock!");
  }
}

function askQuantity(item) {
  var quantity = "";

  quantity = prompt("How many units of the product you want to add?");

  try {
    checkIfItemHasQuantity(item, quantity);
  } catch (error) {
    alert(error.message);
    askQuantity();
  }
}

function addToCart() {
  var addedItemName = "";
  var matchedProductByName;
  addedItemName = prompt(
    "What's the name of the product you want to buy?\nYou can check it in the option 1"
  );
  try {
    matchedProductByName = searchProductByName(addedItemName);
    checkIfItemHasStock(matchedProductByName);
    askQuantity(matchedProductByName);
    addItemToCart(matchedProductByName);
  } catch (error) {
    alert(error.message);
    addToCart();
  }

  console.log(`${cart[cart.length].name} has been added to the cart!`);
}

function cartHasItems() {
  if (cart.length > 0) {
    return true;
  } else {
    throw new Error("The cart is empty!");
  }
}

function showCart() {
  try {
    cartHasItems();
  } catch (error) {
    alert(error.message);
  }
  console.table(cart);
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
  var totalPriceWithoutIva = 0;
  var totalPriceWithIva = 0;

  if (cart.length > 0) {
    for (var i = 0; i < cart.length; i++) {
      for (var j = 0; j < products.length; j++) {
        if (products[j].id === cart[i].id && products[j].stock > 0) {
          products[j].stock = products[j].stock - 1;
          totalPriceWithoutIva += cart[i].price;
          checkoutHistory[checkoutHistory.length - 1].products[i] = cart[i];
        }
      }
    }

    totalPriceWithIva = totalPriceWithoutIva * 1.21;

    checkoutHistory[checkoutHistory.length - 1].id = checkoutHistory.length;
    checkoutHistory[checkoutHistory.length - 1].date = getDate();
    checkoutHistory[checkoutHistory.length - 1].orderPrice = totalPriceWithIva;

    cart = [];

    console.log(
      `The price without taxes is: ${totalPriceWithoutIva}\nWith taxes: ${totalPriceWithIva}`
    );
  } else console.log("Cart is empty!");
}

function showOrderHistory() {
  if (checkoutHistory[0].id !== "") {
    console.table(checkoutHistory);
  } else console.log("You haven't bought anything yet!");
}

// while (displayMenu) {
//   optionSelector(askOption());
//   closeMenu();
// }
