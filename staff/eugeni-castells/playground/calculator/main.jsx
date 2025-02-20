const rootElement = document.querySelector("div#root");
const root = ReactDOM.createRoot(rootElement);

const useState = React.useState;

function Calculator() {
  const [counter, setCounter] = useState(0);

  const [firstNumber, setFirstNumber] = useState("");

  const [operation, setOperation] = useState("");

  const [secondNumber, setSecondNumber] = useState("");

  const [result, setResult] = useState(0);

  const [displayResult, setDisplayResult] = useState(false);

  const handleClick = (value) => {
    if (
      value !== "+" &&
      value !== "-" &&
      value !== "*" &&
      value !== "/" &&
      counter === 0
    ) {
      setFirstNumber(firstNumber + value);
    } else if (
      value === "+" ||
      value === "-" ||
      value === "*" ||
      (value === "/" && counter === 0)
    ) {
      setCounter(counter + 1);
      setOperation(value);
    } else if (
      value !== "+" &&
      value !== "-" &&
      value !== "*" &&
      value !== "/"
    ) {
      setSecondNumber(secondNumber + value);
    }

    setDisplayResult(false);
  };

  const handleResult = () => {
    let number1 = Number(firstNumber);

    let number2 = Number(secondNumber);

    switch (operation) {
      case "+":
        setResult(number1 + number2);
        break;
      case "-":
        setResult(number1 - number2);
        break;
      case "*":
        setResult(number1 * number2);
        break;
      case "/":
        setResult(number1 / number2);
      default:
        break;
    }

    reset();

    setDisplayResult(true);
  };

  const reset = () => {
    setFirstNumber("");
    setOperation("");
    setSecondNumber("");
    setCounter(0);
  };

  return (
    <div>
      <h1>"Hello, Calculator! 🧮" </h1>
      <p style={{ minHeight: "50px" }}>
        {displayResult ? result : firstNumber + operation + secondNumber}
      </p>
      <div>
        <button
          onClick={() => {
            handleClick("1");
          }}
        >
          1
        </button>
        <button
          onClick={() => {
            handleClick("2");
          }}
        >
          2
        </button>
        <button
          onClick={() => {
            handleClick("3");
          }}
        >
          3
        </button>
      </div>
      <div>
        <button
          onClick={() => {
            handleClick("4");
          }}
        >
          4
        </button>
        <button
          onClick={() => {
            handleClick("5");
          }}
        >
          5
        </button>
        <button
          onClick={() => {
            handleClick("6");
          }}
        >
          6
        </button>
      </div>
      <div>
        <button
          onClick={() => {
            handleClick("7");
          }}
        >
          7
        </button>
        <button
          onClick={() => {
            handleClick("8");
          }}
        >
          8
        </button>
        <button
          onClick={() => {
            handleClick("9");
          }}
        >
          9
        </button>
      </div>
      <div>
        <button
          onClick={() => {
            handleClick("0");
          }}
        >
          0
        </button>
        <button
          onClick={() => {
            handleClick(".");
          }}
        >
          .
        </button>
        <button
          onClick={() => {
            handleResult();
          }}
        >
          =
        </button>
      </div>
      <div>
        <button
          onClick={() => {
            handleClick("+");
          }}
        >
          +
        </button>
        <button
          onClick={() => {
            handleClick("-");
          }}
        >
          -
        </button>
        <button
          onClick={() => {
            handleClick("*");
          }}
        >
          *
        </button>
        <button
          onClick={() => {
            handleClick("/");
          }}
        >
          /
        </button>
      </div>
      <button
        onClick={() => {
          reset();
          setDisplayResult(false);
        }}
      >
        Cancel
      </button>
    </div>
  );
}

root.render(<Calculator />);
