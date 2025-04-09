import { useState, useEffect } from "react";
import { Route, Routes, useNavigate, useLocation } from "react-router";
import { Posts } from "./components/Posts.jsx";
import { CreatePost } from "./components/CreatePost.jsx";
import { Profile } from "./Profile.jsx";
import { Search } from "./components/Search.jsx";
import { logic } from "../logic/logic.js";

export function Home({ onLogoutClick }) {
  const [userName, setUserName] = useState("");

  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    console.debug("Home -> useEffect");

    try {
      logic
        .getUserUsername()
        .then((username) => {
          setUserName(username);
        })
        .catch((error) => {
          console.error(error);
          alert(error.message);
        });
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
  const handleHomeClick = () => {
    navigate("/");
  };
  const handleAddPostClick = () => {
    navigate("/create-post");
  };
  const handlePostCreateSubmit = () => {
    navigate("/");
  };
  const handleCancelCreatePost = () => {
    navigate("/");
  };

  const handleUserClick = () => {
    try {
      const userId = logic.getUserId();

      navigate(`/${userName}`, { state: { userId } });
    } catch (error) {
      console.error(error);

      alert(error.message);
    }
  };

  const handleSearchClick = (query) => {
    navigate(`/search` );
  };

  console.debug("Home -> render");

  return (
    <div>
      <header className="home-header">
        {/* TODO  perfiles de usuarios */}
      </header>
      <main className="home-main">
        <div className="home-user">
          <h2>Welcome {userName}</h2>
        </div>

        <Routes>
          <Route path="/" element={<Posts />} />
          <Route
            path="/create-post"
            element={
              <CreatePost
                onPostCreateSubmit={handlePostCreateSubmit}
                onCancelClick={handleCancelCreatePost}
              />
            }
          />
          <Route path="/search" element={<Search />} />
          <Route path="/:username" element={<Profile />}></Route>
        </Routes>
      </main>
      <footer className="home-footer">
        <section>
          <nav className="nav-bar">
            {/* ruta de logout */}
            <a
              onClick={handleLogoutClick}
              className="fa-solid fa-user-secret"
            ></a>
            {/* ruta de home */}
            <a onClick={handleHomeClick} className="fa-solid fa-house"></a>
            {/* ruta de perfil */}
            <a className="fa-solid fa-user" onClick={handleUserClick}></a>
            {/* ruta de crear post */}
            {pathname === "/" && (
              <a className="add-post" onClick={handleAddPostClick}>
                +
              </a>
            )}
            {/* ruta de busqueda de perfiles */}
            {pathname === "/" && (
              <a
                className="fa-solid fa-magnifying-glass"
                onClick={handleSearchClick}
              ></a>
            )}
          </nav>
        </section>
      </footer>
    </div>
  );
}
