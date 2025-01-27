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

var checkoutHistory = [
  {
    products: [],
    id: "",
    date: "",
    orderPrice: 0,
  },
];

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
      return matchedProduct;
    }
  }
}

function askSearchOption() {
  var searchedItemId = "";

  while (
    searchedItemId !== "pi" &&
    searchedItemId !== "or" &&
    searchedItemId !== "ap"
  ) {
    searchedItemId = prompt(
      "What's the id of the product you want to look for?\nYou can check it in the option 1"
    );
  }

  console.log(searchProduct(searchedItemId));
}

function addToCart() {
  var addedItemId = "";

  while (addedItemId !== "pi" && addedItemId !== "or" && addedItemId !== "ap") {
    addedItemId = prompt(
      "What's the id of the product you want to buy?\nYou can check it in the option 1"
    );
  }

  for (var i = 0; i < products.length; i++) {
    if (products[i].id === addedItemId) {
      if (products[i].stock > 0) cart[cart.length] = products[i];
      else {
        console.log("This product is not available at the moment!");
        addToCart();
        return;
      }
    }
  }

  console.log(`${cart[cart.length - 1].name} has been added to the cart!`);
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

while (displayMenu) {
  optionSelector(askOption());
  closeMenu();
}
