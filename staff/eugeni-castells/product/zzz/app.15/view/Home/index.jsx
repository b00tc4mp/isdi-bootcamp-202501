import { useState } from "react";

import Posts from "./Posts.jsx";
import CreatePost from "./CreatePost.jsx";
import Header from "./Header.jsx";
import HamburgerMenu from "./HamburgerMenu.jsx";
import ChangeUserInfo from "./ChangeUserInfo.jsx";

function Home({ onLogoutSuccess }) {
  const [view, setView] = useState("posts");
  const [displayMenu, setDisplayMenu] = useState(false);

  const handleMenuNavigation = () => {
    setDisplayMenu(!displayMenu);
  };

  const handleCancelClick = () => {
    setView("posts");
  };
  const handlePostCreationSubmit = () => {
    setView("posts");
  };

  const handleChangeUserInfoNavigation = () => {
    setDisplayMenu(false);
    setView("change-user-info");
  };

  const handleLogoutSuccess = () => onLogoutSuccess();

  const handleHomeNavigation = () => {
    setView("posts");
  };
  return (
    <>
      <Header onMenuNavigation={handleMenuNavigation} />

      {displayMenu && (
        <HamburgerMenu
          onLogoutSuccess={handleLogoutSuccess}
          onChangeUserInfoNavigation={handleChangeUserInfoNavigation}
        />
      )}

      {view === "change-user-info" && (
        <ChangeUserInfo onHomeNavigation={handleHomeNavigation} />
      )}

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
      </footer>
    </>
  );
}

export default Home;
