import { useState, useEffect } from "react";

import Posts from "./Posts.jsx";
import CreatePost from "./CreatePost.jsx";
import Header from "./Header.jsx";
import HamburgerMenu from "./HamburgerMenu.jsx";
import ChangeUserInfo from "./ChangeUserInfo.jsx";
import { Profile } from "./Profile.jsx";
import { logic } from "../../logic/index.js";
import { Route, Routes, useNavigate, useLocation } from "react-router";
import { Search } from "./Search.jsx";

function Home({ onLogoutSuccess }) {
  const [displayMenu, setDisplayMenu] = useState(false);
  const [loggedInUserName, setLoggedInUserName] = useState("");
  const [loggedInUsernameChanged, setLoggedInUsernameChanged] = useState(false);

  useEffect(() => {
    try {
      logic
        .getUserInfo()
        .catch((error) => {
          console.error;
          alert(error.message);
        })
        .then((user) => setLoggedInUserName(user.username));
    } catch (error) {
      console.log(error);

      alert(error.message);
    }
  }, [loggedInUsernameChanged]);

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleMenuNavigation = () => {
    setDisplayMenu(!displayMenu);
  };

  const handleCancelClick = () => {
    navigate("/");
  };
  const handlePostCreationSubmit = () => {
    navigate("/");
  };

  const handleUserClick = () => {
    try {
      const userId = logic.getUserId();

      navigate(`/${loggedInUserName}`, { state: { userId } });
    } catch (error) {
      console.error(error);

      alert(error.message);
    }
  };

  const handleChangeUserInfoNavigation = () => {
    setDisplayMenu(false);
    navigate("/change-user-info");
  };

  const handleLogoutSuccess = () => onLogoutSuccess();

  const handleHomeNavigation = () => {
    navigate("/");
  };

  const handleLoggedInUsernameChange = () => {
    setLoggedInUsernameChanged(!loggedInUsernameChanged);
  };

  const handleSearchNavigation = () => {
    navigate("/search");
  };
  return (
    <>
      <Header
        onMenuNavigation={handleMenuNavigation}
        onUserClick={handleUserClick}
        loggedInUserName={loggedInUserName}
        onHomeNavigation={handleHomeNavigation}
        onSearchNavigation={handleSearchNavigation}
      />

      <main>
        {displayMenu && (
          <HamburgerMenu
            onLogoutSuccess={handleLogoutSuccess}
            onChangeUserInfoNavigation={handleChangeUserInfoNavigation}
          />
        )}
        <Routes>
          <Route
            path="/change-user-info"
            element={
              <ChangeUserInfo
                onHomeNavigation={handleHomeNavigation}
                onAccepted={handleLoggedInUsernameChange}
              />
            }
          />
          <Route path="/" element={<Posts />} />
          <Route path="/:username" element={<Profile />} />
          <Route path="/search" element={<Search />} />
          <Route
            path="/create-post"
            element={
              <CreatePost
                onCancelClick={handleCancelClick}
                onPostCreationSubmit={handlePostCreationSubmit}
              />
            }
          />
        </Routes>
      </main>

      <footer className="home-footer">
        {pathname === "/" && (
          <div
            className="create-post-button"
            onClick={() => {
              navigate("/create-post");
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
