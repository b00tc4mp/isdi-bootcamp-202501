function Home({ onLogoutClick }) {
  // Importo React , useState, useEffect

  const useState = React.useState;
  const useEffect = React.useEffect;

  // Manejo mis estados
  const [view, setView] = useState("posts");
  const [user, setUser] = useState("");
  const [posts, setPosts] = useState([]);

  //Creo mi side effect para traer los posts
  // Este hook lo utilizo para traer los posts y el nombre de usuario de la logica y actualizar el estado de los mismos
  useEffect(() => {
    console.debug("Home -> useEffect");
    try {
      //Extraigo nombre de usuario de la logica
      const user = logic.getUserName();
      // Extraigo los posts de la logica
      const posts = logic.getPosts();

      // Actualizo el estado del usuario
      setUser(user);
      // Actualizo el estado de los posts
      setPosts(posts);
    } catch (error) {
      console.error(error);
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

  const handleCreatePostSubmit = (event) => {
    event.preventDefault();

    try {
      //destructuring del formulario
      const { target: form } = event;

      const {
        image: { value: image },
        title: { value: title },
      } = form;
      //llamo a mi logica de creacion de posts
      logic.createPost(image, title);
      //limpio el formulario
      form.reset();
      //cargo mi array de posts deveulta llamando a la logica de getPosts
      setPosts(logic.getPosts());
      //cambio la vista a posts
      setView("posts");
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const handleToggleLikePosts = (postId) => {
    try {
      //llamo a mi logica de likes
      logic.toggleLikePost(postId);
      //cargo mis posts deveuelta llamando a la logica de getPosts 
      setPosts(logic.getPosts());
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  console.debug("Home -> render");

  return (
    <div>
      <a onClick={handleLogoutClick}>Logo</a>
      {view === "posts" && <a onClick={handleAddPostClick}>Add Post</a>}

      <h2>Welcome {user}</h2>

      {view === "posts" && (
        <section>
          {posts.map((post) => (
            <article  key={post.id}>
              <h3>{post.author}</h3>
              <img src={post.image} alt={post.title} />
              <p>{post.title}</p>
              <time>{post.createdAt.toISOString()}</time>
              <p>{post.likesCount}</p>
              <button onClick={() => handleToggleLikePosts(post.id)}>
                {post.liked ? "Unlike" : "Like"}
              </button>
            </article>
          ))}
        </section>
      )}

      {view === "create-post" && (
        <section>
          <form onSubmit={handleCreatePostSubmit}>
            <input type="text" name="image" placeholder="Image" />
            <input type="text" name="title" placeholder="Title" />
            <button type="submit">Create Post</button>
          </form>

          <a onClick={() => setView("posts")}>Cancel</a>
        </section>
      )}
    </div>
  );
}
