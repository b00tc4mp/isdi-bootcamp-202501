function Home() {
  const { useState, useEffect } = React;

  const [currentUserName, setCurrentUserName] = useState(null);

  useEffect(() => {
    let userName = logic.getOnlineUserName();

    setCurrentUserName(userName);
  }, []);

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Logo</h1>
      <button
        style={{
          backgroundColor: "red",
          borderRadius: "50%",
          width: "60px",
          height: "60px",
          padding: "5px",
        }}
      >
        Logout
      </button>
      <h2>Hello, {currentUserName}!</h2>
      {}
    </div>
  );
}
