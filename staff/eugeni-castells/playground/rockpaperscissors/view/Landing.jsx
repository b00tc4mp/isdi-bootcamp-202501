function Landing({ onPlayerClick }) {
  return (
    <>
      <h3>What mode do you want to play?</h3>;
      <div
        style={{
          width: "150px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <button style={{ fontSize: "30px" }}>🤖</button>
        <button style={{ fontSize: "30px" }} onClick={onPlayerClick}>
          🧍
        </button>
      </div>
    </>
  );
}
