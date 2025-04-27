const Landing = ({ onLevelClick }) => {
  return (
    <>
      <h1>Welcome to the Guessing Hell 🔥</h1>
      <h2>What level do you want to play?</h2>
      <div>
        <button
          type="button"
          onClick={() => {
            onLevelClick("1");
          }}
        >
          Easy
        </button>
        &nbsp;
        <button
          type="button"
          onClick={() => {
            onLevelClick("2");
          }}
        >
          Medium
        </button>
        &nbsp;
        <button
          type="button"
          onClick={() => {
            onLevelClick("3");
          }}
        >
          Difficult
        </button>
      </div>
    </>
  );
};
