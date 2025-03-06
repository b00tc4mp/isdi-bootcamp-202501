const { useState } = React;

import Posts from "./Posts.jsx";
import CreatePost from "./CreatePost.jsx";

import logic from "../logic.js";

function Home({ onLogoutClick }) {
  const [view, setView] = useState("posts");

  const handleCancelClick = () => {
    setView("posts");
  };
  const handlePostCreationSubmit = () => {
    setView("posts");
  };

  const handleLogoutButton = () => {
    try {
      logic.logoutUser();

      onLogoutClick();
    } catch (error) {
      console.error(error);

      alert(error.message);
    }
  };
  return (
    <div style={{ padding: "1rem" }}>
      {view === "posts" && <Posts />}

      {view === "create-post" && (
        <CreatePost
          onCancelClick={handleCancelClick}
          onPostCreationSubmit={handlePostCreationSubmit}
        />
      )}
      <footer className="home-footer">
        {view === "posts" && (
          <div
            className="create-post-button"
            onClick={() => {
              setView("create-post");
            }}
          >
            +
          </div>
        )}
        <button
          style={{
            backgroundColor: "red",
            borderRadius: "50%",
            width: "60px",
            height: "60px",
            padding: "5px",
          }}
          onClick={handleLogoutButton}
        >
          Logout
        </button>
      </footer>
    </div>
  );
}

export default Home;
