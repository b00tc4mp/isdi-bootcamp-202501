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
      this.state.counter === 0
    ) {
      this.setState({ firstNumber: this.firstNumber + value });
    } else if (
      value === "+" ||
      value === "-" ||
      value === "*" ||
      (value === "/" && this.counter === 0)
    ) {
      this.setState({ counter: this.counter + 1 });
      this.setState({ operation: value });
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
                this.handleClick("1");
              }}
            >
              1
            </button>
            <button
              onClick={() => {
                this.handleClick("2");
              }}
            >
              2
            </button>
            <button
              onClick={() => {
                this.handleClick("3");
              }}
            >
              3
            </button>
          </div>
          <div>
            <button
              onClick={() => {
                this.handleClick("4");
              }}
            >
              4
            </button>
            <button
              onClick={() => {
                this.handleClick("5");
              }}
            >
              5
            </button>
            <button
              onClick={() => {
                this.handleClick("6");
              }}
            >
              6
            </button>
          </div>
          <div>
            <button
              onClick={() => {
                this.handleClick("7");
              }}
            >
              7
            </button>
            <button
              onClick={() => {
                this.handleClick("8");
              }}
            >
              8
            </button>
            <button
              onClick={() => {
                this.handleClick("9");
              }}
            >
              9
            </button>
          </div>
          <div>
            <button
              onClick={() => {
                this.handleClick("0");
              }}
            >
              0
            </button>
            <button
              onClick={() => {
                this.handleClick(".");
              }}
            >
              .
            </button>
            <button
              onClick={() => {
                this.handleResult();
              }}
            >
              =
            </button>
          </div>
          <div>
            <button
              onClick={() => {
                this.handleClick("+");
              }}
            >
              +
            </button>
            <button
              onClick={() => {
                this.handleClick("-");
              }}
            >
              -
            </button>
            <button
              onClick={() => {
                this.handleClick("*");
              }}
            >
              *
            </button>
            <button
              onClick={() => {
                this.handleClick("/");
              }}
            >
              /
            </button>
          </div>
          <button
            onClick={() => {
              this.reset();
              this.setDisplayResult(false);
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
