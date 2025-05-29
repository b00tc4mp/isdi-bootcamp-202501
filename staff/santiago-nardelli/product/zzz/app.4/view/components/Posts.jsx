import logic from '../../logic/logic.js';
const{ useState, useEffect } = React;

function Posts() {
  const [posts, setPosts] = useState([]);

  //Utilizo un side effect para traer los posts y que cada ves que renderize la home aparezcan es info que se carga varias veces, el refresh de likes y comentarios
  useEffect(() => {
    console.debug("Post -> useEffect");
    try {
      const post = logic.getPosts();

      setPosts(post);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }, []);

  const handleToggleLikePosts = (postId) => {
    try {
      logic.toggleLikePost(postId);

      const post = logic.getPosts();

      setPosts(post);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  console.debug("Post --> render");
  return <section>
    {posts.map((post) => (
      <article>
        <h3>{post.author.name}</h3>
        <img src={post.image} alt={post.title} />
        <p>{post.title}</p>
        <time>{post.createdAt.toISOString()}</time>
        <p>{post.likesCount}</p>
        <button onClick={() => handleToggleLikePosts(post.id)}>
          {`${post.liked ? "♥️" : "🤍"} (${post.likesCount})`}
        </button>
      </article>
    ))}
  </section>;
}

export default Posts;
