import logic from '../../logic/logic.js';
import Post from './Post.jsx'
const { useState, useEffect } = React;

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
      <Post key={post.id} post={post} handleToggleLikePosts={handleToggleLikePosts} />
      
    ))}
  </section>;
}

export default Posts;
