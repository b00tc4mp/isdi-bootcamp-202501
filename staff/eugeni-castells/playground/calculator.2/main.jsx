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

  handleNumberClick = (value) => {
    this.setState((prevState) => ({
      [prevState.counter === 0 ? "firstNumber" : "secondNumber"]:
        (prevState.counter === 0
          ? prevState.firstNumber
          : prevState.secondNumber) + value,
    }));
  };

  handleOperationClick = (value) => {
    this.setState({ operation: value, counter: this.state.counter + 1 });
  };

  handleResult = () => {
    let number1 = Number(this.state.firstNumber);

    let number2 = Number(this.state.secondNumber);

    switch (this.state.operation) {
      case "+":
        this.setState({ result: number1 + number2 });
        break;
      case "-":
        this.setState({ result: number1 - number2 });
        break;
      case "*":
        this.setState({ result: number1 * number2 });
        break;
      case "/":
        this.setState({ result: number1 / number2 });
      default:
        break;
    }

    this.setState({ displayResult: true });
  };

  reset = () => {
    this.setState({
      counter: 0,
      firstNumber: "",
      secondNumber: "",
      operation: "",
      result: null,
      displayResult: false,
    });
  };

  render() {
    return (
      <>
        <div>
          <h1>"Hello, Calculator! 🧮" </h1>
          <p style={{ minHeight: "50px" }}>
            {this.state.displayResult
              ? this.state.result
              : this.state.firstNumber +
                this.state.operation +
                this.state.secondNumber}
          </p>
          <div>
            <button
              onClick={() => {
                this.handleNumberClick("1");
              }}
            >
              1
            </button>
            <button
              onClick={() => {
                this.handleNumberClick("2");
              }}
            >
              2
            </button>
            <button
              onClick={() => {
                this.handleNumberClick("3");
              }}
            >
              3
            </button>
          </div>
          <div>
            <button
              onClick={() => {
                this.handleNumberClick("4");
              }}
            >
              4
            </button>
            <button
              onClick={() => {
                this.handleNumberClick("5");
              }}
            >
              5
            </button>
            <button
              onClick={() => {
                this.handleNumberClick("6");
              }}
            >
              6
            </button>
          </div>
          <div>
            <button
              onClick={() => {
                this.handleNumberClick("7");
              }}
            >
              7
            </button>
            <button
              onClick={() => {
                this.handleNumberClick("8");
              }}
            >
              8
            </button>
            <button
              onClick={() => {
                this.handleNumberClick("9");
              }}
            >
              9
            </button>
          </div>
          <div>
            <button
              onClick={() => {
                this.handleNumberClick("0");
              }}
            >
              0
            </button>
            <button
              onClick={() => {
                this.handleNumberClick(".");
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
                this.handleOperationClick("+");
              }}
            >
              +
            </button>
            <button
              onClick={() => {
                this.handleOperationClick("-");
              }}
            >
              -
            </button>
            <button
              onClick={() => {
                this.handleOperationClick("*");
              }}
            >
              *
            </button>
            <button
              onClick={() => {
                this.handleOperationClick("/");
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
