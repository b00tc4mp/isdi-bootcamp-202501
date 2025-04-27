const title = React.createElement("h1", { children: "Hello, Calculator! 🧮" });

let counter = 0;

let firstNumber = "";

let operation = "";

let secondNumber = "";

const handleResult = () => {
  let number1 = Number(firstNumber);

  let number2 = Number(secondNumber);

  let result = 0;

  switch (operation) {
    case "+":
      result = number1 + number2;
      break;
    case "-":
      result = number1 - number2;
      break;
    case "*":
      result = number1 * number2;
      break;
    case "/":
      result = number1 / number2;
    default:
      break;
  }
  const resultBar = React.createElement("div", {
    children: result,
  });
  const container = React.createElement("div", {
    children: [
      resultBar,
      title,
      rowWrapper1,
      rowWrapper2,
      rowWrapper3,
      rowWrapper4,
      buttonWrapper,
    ],
  });
  root.render([container]);

  firstNumber = "";

  secondNumber = "";

  counter = 0;

  operation = "";
};

const resultBar = React.createElement("div", {
  children: firstNumber + operation + secondNumber,
});

const handleClick = (value) => {
  if (
    value !== "+" &&
    value !== "-" &&
    value !== "*" &&
    value !== "/" &&
    counter === 0
  ) {
    firstNumber += value;
    const resultBar = React.createElement("div", {
      children: firstNumber + operation + secondNumber,
    });
    const container = React.createElement("div", {
      children: [
        resultBar,
        title,
        rowWrapper1,
        rowWrapper2,
        rowWrapper3,
        rowWrapper4,
        buttonWrapper,
      ],
    });
    root.render([container]);
  } else if (
    value === "+" ||
    value === "-" ||
    value === "*" ||
    (value === "/" && counter === 0)
  ) {
    counter++;
    operation = value;
    const resultBar = React.createElement("div", {
      children: firstNumber + operation + secondNumber,
    });
    const container = React.createElement("div", {
      children: [
        resultBar,
        title,
        rowWrapper1,
        rowWrapper2,
        rowWrapper3,
        rowWrapper4,
        buttonWrapper,
      ],
    });
    root.render([container]);
  } else if (value !== "+" && value !== "-" && value !== "*" && value !== "/") {
    secondNumber += value;
    const resultBar = React.createElement("div", {
      children: firstNumber + operation + secondNumber,
    });
    const container = React.createElement("div", {
      children: [
        resultBar,
        title,
        rowWrapper1,
        rowWrapper2,
        rowWrapper3,
        rowWrapper4,
        buttonWrapper,
      ],
    });
    root.render([container]);
  }
};

const number1button = React.createElement("button", {
  type: "button",
  name: "number1",
  children: 1,
  onClick: function () {
    handleClick("1");
  },
});

const number2button = React.createElement("button", {
  type: "button",
  name: "number2",
  children: 2,
  onClick: function () {
    handleClick("2");
  },
});

const number3button = React.createElement("button", {
  type: "button",
  name: "number3",
  children: 3,
  onClick: function () {
    handleClick("3");
  },
});

const rowWrapper1 = React.createElement("div", {
  children: [number1button, number2button, number3button],
});

const number4button = React.createElement("button", {
  type: "button",
  name: "number4",
  children: 4,
  onClick: function () {
    handleClick("4");
  },
});

const number5button = React.createElement("button", {
  type: "button",
  name: "number5",
  children: 5,
  onClick: function () {
    handleClick("5");
  },
});

const number6button = React.createElement("button", {
  type: "button",
  name: "number6",
  children: 6,
  onClick: function () {
    handleClick("6");
  },
});

const rowWrapper2 = React.createElement("div", {
  children: [number4button, number5button, number6button],
});

const number7button = React.createElement("button", {
  type: "button",
  name: "number7",
  children: 7,
  onClick: function () {
    handleClick("7");
  },
});

const number8button = React.createElement("button", {
  type: "button",
  name: "number8",
  children: 8,
  onClick: function () {
    handleClick("8");
  },
});

const number9button = React.createElement("button", {
  type: "button",
  name: "number9",
  children: 9,
  onClick: function () {
    handleClick("9");
  },
});

const rowWrapper3 = React.createElement("div", {
  children: [number7button, number8button, number9button],
});

const number0button = React.createElement("button", {
  type: "button",
  name: "number7",
  children: 0,
  onClick: function () {
    handleClick("0");
  },
});

const decimalButton = React.createElement("button", {
  type: "button",
  name: "number8",
  children: ".",
  onClick: function () {
    handleClick(".");
  },
});

const resultButton = React.createElement("button", {
  type: "button",
  name: "resultButton",
  children: "=",
  onClick: function () {
    handleResult();
  },
});

const rowWrapper4 = React.createElement("div", {
  children: [number0button, decimalButton, resultButton],
});

const plusLabel = React.createElement("button", {
  children: "+",
  onClick: function () {
    handleClick("+");
  },
});

const minusLabel = React.createElement("button", {
  children: "-",
  onClick: function () {
    handleClick("-");
  },
});

const multiplyLabel = React.createElement("button", {
  children: "*",
  onClick: function () {
    handleClick("*");
  },
});

const divideLabel = React.createElement("button", {
  children: "/",
  onClick: function () {
    handleClick("/");
  },
});

const buttonWrapper = React.createElement("div", {
  children: [plusLabel, minusLabel, multiplyLabel, divideLabel],
});

const container = React.createElement("div", {
  children: [
    resultBar,
    title,
    rowWrapper1,
    rowWrapper2,
    rowWrapper3,
    rowWrapper4,
    buttonWrapper,
  ],
});

const rootElement = document.querySelector("div#root");
const root = ReactDOM.createRoot(rootElement);
root.render([container]);
