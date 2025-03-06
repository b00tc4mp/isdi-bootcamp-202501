const { useState, useEffect } = React;

import Post from "./Post.jsx";

import logic from "../../logic/logic.js";

function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    console.debug("Posts -> useEffect");

    try {
      const posts = logic.getPosts();

      setPosts(posts);
    } catch (error) {
      console.error(error);

      alert(error.message);
    }
  }, []);

  const handleToggleLikeClick = () => {
    try {
      const posts = logic.getPosts();

      setPosts(posts);
    } catch (error) {
      console.error(error);

      alert(error.message);
    }
  };

  const handleDeleteClick = () => {
    try {
      const posts = logic.getPosts();

      setPosts(posts);
    } catch (error) {
      console.error(error);

      alert(error.message);
    }
  };

  console.debug("Posts -> render");

  return (
    <section className="posts-container">
      {posts.map((post) => (
        <Post
          key={post.id}
          post={post}
          onToggleLikeClick={handleToggleLikeClick}
          onDeleteClick={handleDeleteClick}
        />
      ))}
    </section>
  );
}

export default Posts;
