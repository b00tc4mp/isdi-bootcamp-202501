const { useEffect, useState } = React;
import logic from "../logic/logic.js";
import Posts from "./components/Posts.jsx";
import CreatePost from "./components/CreatePost.jsx";

function Home({ onLogoutClick }) {
  // Manejo mis estados
  const [view, setView] = useState("posts");
  const [user, setUser] = useState("");
  //const [posts, setPosts] = useState([]);

  //Creo mi side effect para traer los posts
  // Este hook lo utilizo para traer los posts y el nombre de usuario de la logica y actualizar el estado de los mismos
  useEffect(() => {
    console.debug("Home -> useEffect");
    try {
      //Extraigo nombre de usuario de la logica
      const user = logic.getUserName();

      // Actualizo el estado del usuario
      setUser(user);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }, []);

  //LOGOUT

  const handleLogoutClick = () => {
    try {
      //llamo a mi logica de logout
      logic.logoutUser();
      //llamo a mi funcion de logout
      onLogoutClick();
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  // Manejo de la vista de form de add post
  const handleAddPostClick = () => setView("create-post");
  // Manejo de la vista de posts
  const handleCreatePostSubmit = () => {
    setView("posts");
  };

  // Manejo de la vista de posts
  const handleCancelCreatePost = () => {
    setView("posts");
  };
  console.debug("Home -> render");

  return (
    <div>
      <header className="home-header">
        {/* TODO  perfiles de usuarios */}
      </header>
      <main className="home-main">
        <h2>Welcome {userName}</h2>

        {view === "posts" && <Posts />}

        {view === "create-post" && (
          <CreatePost
            onAddPost={handleCreatePostSubmit}
            onCancelClick={handleCancelCreatePost}
          />
        )}
      </main>

      <footer className="home-footer">
        <a onClick={handleLogoutClick} className="fa-solid fa-user-secret"></a>
        {view === "posts" && <a onClick={handleAddPostClick}>+</a>}
      </footer>
    </div>
  );
}

export default Home;
