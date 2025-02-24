const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);

const useState = React.useState;

function Hangman() {
  const [view, setView] = useState("intro");
  const [status, setStatus] = useState("");
 

  const handleStartSubmit = (event) => {
    event.preventDefault();

    const form = event.target;
    const word = form.word.value.trim().toLowerCase();

    try {
    

      logic.introduceWord(word);
      setStatus(logic.getStatus());
      setView("game");
      


    } catch (error) {


      console.error(error);
      alert(error.message);
    }
  };

 

  return (
    <section>
      <h1>Hangman</h1>

      <div>
        <img
          src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExd2MxdjRqeDVxM25iam92ZDhoZnYycnZ4dW9xMXZtZWtvZ3k4ZXR4biZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ybQIv0CsYm1XY9A8Dm/giphy.gif"
          alt="hangman"
        />
      </div>

      {view === "intro" && (
        <form onSubmit={handleStartSubmit}>
          <label> Guess Word?</label>
          <input type="text" placeholder="Entry a word to guess" name="word" id="word" />
          <button type="submit">Start</button>
        </form>
      )}

      {view === "game" && (
        <form >
          <label>Word:</label>
          <p>{status}</p>
          <p>Lives: {data.maxAttempts}</p>
          <label htmlFor="charOrWord"> Char or Word?</label>
          <input type="text" placeholder="Entry a char or word" name="charOrWord" id="charOrWord" />
          <button type="submit">Try</button>
        </form>
      )}
    </section>
  );
}

root.render(<Hangman />);
