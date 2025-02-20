const rootElement = document.querySelector("div#root");
const root = ReactDOM.createRoot(rootElement);

const Component = React.Component;

class Calculator extends Component {
  constructor() {
    super();

    this.state = {
      counter: 0,

      firstNumber: "",

      operation: "",

      secondNumber: "",

      result: null,

      displayResult: false,
    };
  }

  handleClick = (value) => {
    if (
      value !== "+" &&
      value !== "-" &&
      value !== "*" &&
      value !== "/" &&
      this.counter === 0
    ) {
      this.setFirstNumber(this.firstNumber + value);
    } else if (
      value === "+" ||
      value === "-" ||
      value === "*" ||
      (value === "/" && this.counter === 0)
    ) {
      this.setCounter(this.counter + 1);
      this.setOperation(value);
    } else if (
      value !== "+" &&
      value !== "-" &&
      value !== "*" &&
      value !== "/"
    ) {
      this.setState({
        secondNumber: this.secondNumber + value,
        ...this.state,
      });
    }

    this.setState({
      displayResult: false,
      ...this.state,
    });
  };

  handleResult = () => {
    let number1 = Number(this.firstNumber);

    let number2 = Number(this.secondNumber);

    switch (this.operation) {
      case "+":
        this.setResult(number1 + number2);
        break;
      case "-":
        this.setResult(number1 - number2);
        break;
      case "*":
        this.setResult(number1 * number2);
        break;
      case "/":
        this.setResult(number1 / number2);
      default:
        break;
    }

    this.reset();

    this.setDisplayResult(true);
  };
  reset = () => {
    this.setFirstNumber("");
    this.setOperation("");
    this.setSecondNumber("");
    this.setCounter(0);
  };

  render() {
    return (
      <>
        <div>
          <h1>"Hello, Calculator! 🧮" </h1>
          <p style={{ minHeight: "50px" }}>
            {this.displayResult
              ? this.state.result
              : this.state.firstNumber +
                this.state.operation +
                this.state.secondNumber}
          </p>
          <div>
            <button
              onClick={() => {
                handleClick("1").bind(this);
              }}
            >
              1
            </button>
            <button
              onClick={() => {
                handleClick("2").bind(this);
              }}
            >
              2
            </button>
            <button
              onClick={() => {
                handleClick("3").bind(this);
              }}
            >
              3
            </button>
          </div>
          <div>
            <button
              onClick={() => {
                handleClick("4").bind(this);
              }}
            >
              4
            </button>
            <button
              onClick={() => {
                handleClick("5").bind(this);
              }}
            >
              5
            </button>
            <button
              onClick={() => {
                handleClick("6").bind(this);
              }}
            >
              6
            </button>
          </div>
          <div>
            <button
              onClick={() => {
                handleClick("7").bind(this);
              }}
            >
              7
            </button>
            <button
              onClick={() => {
                handleClick("8").bind(this);
              }}
            >
              8
            </button>
            <button
              onClick={() => {
                handleClick("9").bind(this);
              }}
            >
              9
            </button>
          </div>
          <div>
            <button
              onClick={() => {
                handleClick("0").bind(this);
              }}
            >
              0
            </button>
            <button
              onClick={() => {
                handleClick(".").bind(this);
              }}
            >
              .
            </button>
            <button
              onClick={() => {
                handleResult().bind(this);
              }}
            >
              =
            </button>
          </div>
          <div>
            <button
              onClick={() => {
                handleClick("+").bind(this);
              }}
            >
              +
            </button>
            <button
              onClick={() => {
                handleClick("-").bind(this);
              }}
            >
              -
            </button>
            <button
              onClick={() => {
                handleClick("*").bind(this);
              }}
            >
              *
            </button>
            <button
              onClick={() => {
                handleClick("/").bind(this);
              }}
            >
              /
            </button>
          </div>
          <button
            onClick={() => {
              reset().bind(this);
              setDisplayResult(false);
            }}
          >
            Cancel
          </button>
        </div>
      </>
    );
  }
}

root.render(<Calculator />);
