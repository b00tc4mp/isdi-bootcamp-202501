//data
var data = {
  constants: {
    DEFAULT_QUANTITY: 1,
  },
  products: [
    {
      name: "apple",
      country: "Perú",
      price: 2,
      stock: 3,
    },
    {
      name: "orange",
      country: "France",
      price: 3,
      stock: 2,
    },
    {
      name: "pineapple",
      country: "Hawai",
      price: 5,
      stock: 1,
    },
  ],
  cart: [],
  orderHistory: [],
  productSelected: {},
  quantitySelected: 1,
};

//logic
var logic = {
  helper: {
    validateInputIsString: function (input) {
      if (typeof input === "string") return true;
      else throw new SyntaxError(`${input} is not a string`);
    },
    validateInputIsNumber: function (input) {
      if (typeof input === "number") return true;
      else throw new SyntaxError(`${input} is not a number`);
    },
    validateInputIsPositiveNumber: function (input) {
      if (input > 0) {
        return true;
      } else throw new RangeError(`${input} is equal or lower than 0`);
    },
  },
  generateRandomId: function () {
    var id;

    id = Math.floor(Math.random() * 15 ** 15);

    return id;
  },
  retrieveProducts: function () {
    var returnedProductsList = data.products;

    return returnedProductsList;
  },
  searchProductByName: function (name) {
    for (var i = 0; i < data.products.length; i++) {
      if (data.products[i].name === name) return data.products[i];
    }

    throw new Error("Product doesn't exist!");
  },
  updateProductToAdd: function (name) {
    data.productSelected = logic.searchProductByName(name);
  },
  addItemsToCart: function () {
    var { stock, ...itemToPrint } = data.productSelected;

    for (var i = 0; i < data.quantitySelected; i++) {
      var itemToAdd = {
        stock,
        ...data.productSelected,
      };
      logic.handleStock();
      data.cart[data.cart.length] = itemToAdd;
    }
    D;
    productSelected = [];
    quantitySelected = data.constants.DEFAULT_QUANTITY;

    return itemToPrint;
  },
  validateIfItemHasStock: function () {
    if (data.productSelected.stock === 0) {
      throw new RangeError(`product's stock === 0`);
    }
  },
  validateIfItemHasQuantity: function (quantity) {
    if (data.productSelected.stock < quantity) {
      throw new RangeError("The quantity requested exceeds the current stock!");
    } else data.quantitySelected = quantity;
  },
  handleStock: function () {
    data.productSelected.stock -= 1;
  },
  generateReceipt: function () {
    var receipt = {
      id: logic.generateRandomId(),
      products: data.cart,
      date: logic.getDate(),
      orderPrice: logic.calculateOrderPriceWithIva(),
    };
    return receipt;
  },
  calculateOrderPriceWithIva: function () {
    var totalOrderPrice = 0;
    for (var i = 0; i < data.cart.length; i++) {
      totalOrderPrice += data.cart[i].price;
    }

    return logic.roundNumberToTwoDecimals(totalOrderPrice * 1.21);
  },
  handleCheckout: function () {
    logic.validateIfCartHasItems();

    var receipt = logic.generateReceipt();

    data.cart = [];

    return receipt;
  },
  getDate: function () {
    const now = new Date();

    var year = now.getFullYear();

    var month = now.toLocaleString("default", {
      month: "long",
    });

    var hour = now.getHours().toString().padStart(2, "0");

    var minutes = now.getMinutes().toString().padStart(2, "0");

    var formattedDate = `${year}-${month}-${hour}:${minutes}`;

    return formattedDate;
  },
  roundNumberToTwoDecimals: function (number) {
    return Math.round(number * 100) / 100;
  },
  validateIfCartHasItems: function () {
    if (data.cart.length === 0) {
      throw new RangeError("cart.length === 0");
    }
  },
  getCart: function () {
    logic.validateIfCartHasItems();

    var returnedCart = data.cart;

    return returnedCart;
  },
};

//interface
var interface = {
  helper: {
    handleError: function (error) {
      console.error(error);

      alert(error.message);
    },
    promptHandler: function (message) {
      var promptInput = prompt(message);

      return promptInput;
    },
    printItem: function (item, single) {
      var itemTable = "";

      for (var property in item) {
        itemTable += `${property}: ${item[property]} ${
          single === true ? "\n" : "| "
        }`;
      }

      return itemTable;
    },
    printItemList: function (list) {
      var table = "";
      for (var i = 0; i < list.length; i++) {
        var product = list[i];
        table += interface.helper.printItem(product, false);
        table += "\n";
      }

      return table;
    },
  },
  showProductsList: function () {
    try {
      var products = logic.retrieveProducts();

      var table = interface.helper.printItemList(products);

      alert(table);
    } catch (error) {
      interface.helper.handlerError(error);
    }
  },
  showProduct: function () {
    var nameToSearch = prompt(
      "What's the name of the product you want to look for?"
    );

    try {
      var productToShow = logic.searchProductByName(nameToSearch);

      var table = interface.helper.printItem(productToShow, true);

      alert(table);
    } catch (error) {
      interface.helper.handleError(error);
    }
  },
  showAddToCart: function () {
    try {
      var itemNameToAdd = interface.helper.promptHandler(
        "What product do you want to add to the cart? Introduce the name"
      );
      var itemToAdd = logic.updateProductToAdd(itemNameToAdd);
      logic.validateIfItemHasStock();
      interface.askQuantity();
      logic.addItemsToCart();
      alert(`${itemNameToAdd} added to the cart!`);
    } catch (error) {
      interface.helper.handleError(error);
    }
  },
  askQuantity: function (item) {
    try {
      var quantity = interface.helper.promptHandler(
        "How many units do you want to add?"
      );
      logic.validateIfItemHasQuantity(quantity);
    } catch (error) {
      interface.helper.handleError(error);
    }
  },
  showCheckout: function () {
    var confirmCheckout = confirm("Want to proceed with the chekout?");
    try {
      if (confirmCheckout) {
        var receipt = logic.handleCheckout();

        alert(interface.helper.printItem(receipt));
      }
    } catch (error) {
      interface.helper.handleError(error);
    }
  },
  showCart: function () {
    var cart = logic.getCart();
    try {
      if (cart.length > 1) {
        alert(`Cart:\n ${interface.helper.printItemList(cart)}`);
      } else alert(`Cart:\n ${interface.helper.printItem(cart, true)}`);
    } catch (error) {
      interface.helper.handleError(error);
    }
  },
};
