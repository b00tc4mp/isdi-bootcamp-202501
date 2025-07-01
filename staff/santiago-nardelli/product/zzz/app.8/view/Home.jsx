import { useState, useEffect } from "react";
import logic from "../logic/logic.js";
import Posts from "./components/Posts.jsx";
import CreatePost from "./components/CreatePost.jsx";
import NavBar from "./components/NavBar.jsx";


function Home({ onLogoutClick }) {
  const [view, setView] = useState("posts");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    console.debug("Home -> useEffect");

    try {
      const name = logic.getUserName();

      setUserName(name);
    } catch (error) {
      console.error(error);

      alert(error.message);
    }
  }, []);

  const handleLogoutClick = () => {
    try {
      logic.logoutUser();

      onLogoutClick();
    } catch (error) {
      console.error(error);

      alert(error.message);
    }
  };
  const handleAddPostClick = () => setView("create-post");
  const handlePostCreateSubmit = () => setView("posts");
  const handleCancelClick = () => setView("posts");

  console.debug("Home -> render");

  return (
    <div>
      <header className="home-header">
        {/* TODO  perfiles de usuarios */}
      </header>
      <main className="home-main">
        <div className="home-user">

        <h2 >Welcome {userName}</h2>

        </div>
        {view === "posts" && <Posts />}

        {view === "create-post" && (
          <CreatePost
            onPostCreateSubmit={handlePostCreateSubmit}
            onCancelClick={handleCancelClick}
          />
        )}
      </main>
      {view === 'posts' && (<NavBar
        onLogoutClick={handleLogoutClick}
        onAddPostClick={handleAddPostClick}
      />)}
    </div>
  );
}

export default Home;
