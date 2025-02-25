
function GuessNumber() {
  const [userEntry, setUserEntry] = React.useState("");

  const handleChange = (event) => {
    setUserEntry(event.target.value);
  };

  const handleSubmitNumber = (event) => {
    event.preventDefault();
    try {
      logic.askUser(userEntry);
      setUserEntry(""); // Reset the input field
    } catch (error) {
      console.error(error.message);
      alert("Error: " + error.message);
    }
  };

  return (
    <div>
      <h1>Try a Number</h1>
      <form onSubmit={handleSubmitNumber}>
        <input
          type="text"
          placeholder="Enter a NUMBER"
          value={userEntry}
          onChange={handleChange}
        />
        <button type="submit">Try your luck</button>
      </form>
    </div>
  );
}


