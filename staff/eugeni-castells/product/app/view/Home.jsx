function Home({ onLogoutClick }) {
  const { useState, useEffect } = React;

  const [currentUserName, setCurrentUserName] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    let userName = logic.getOnlineUserName();

    setCurrentUserName(userName);

    let posts = logic.getPosts();

    setPosts(posts);
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
        onClick={onLogoutClick}
      >
        Logout
      </button>
      <h2>Hello, {currentUserName}!</h2>
      {posts &&
        posts.length > 0 &&
        posts.map((item) => {
          return (
            <Post
              author={item.author}
              image={item.image}
              text={item.text}
              createdAt={item.createdAt}
              modifiedAt={item.modifiedAt}
              liked={item.liked}
              likes={item.likes}
              id={item.id}
              setPosts={setPosts}
            />
          );
        })}
    </div>
  );
}
