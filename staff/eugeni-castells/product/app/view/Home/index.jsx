import { useState } from "react";

import Posts from "./Posts.jsx";
import CreatePost from "./CreatePost.jsx";
import { logoutUser } from "../../logic/logoutUser.js";

function Home({ onLogoutSuccess }) {
  const [view, setView] = useState("posts");

  const handleCancelClick = () => {
    setView("posts");
  };
  const handlePostCreationSubmit = () => {
    setView("posts");
  };

  const handleLogoutSuccess = () => onLogoutSuccess();

  const handleLogoutButtonClick = () => {
    try {
      logoutUser();

      handleLogoutSuccess();
    } catch (error) {
      console.error(error);

      alert(error.message);
    }
  };
  return (
    <div>
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
          onClick={handleLogoutButtonClick}
        >
          Logout
        </button>
      </footer>
    </div>
  );
}

export default Home;
