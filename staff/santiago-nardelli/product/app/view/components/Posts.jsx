import { useState, useEffect } from "react";
import { Post } from "./Post.jsx";

import { logic } from "../../logic/logic.js";

export function Posts({userSearchId}) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    console.debug("Posts -> useEffect");

    try {
     ( userSearchId ? logic.getUserPosts(userSearchId) : logic.getPosts())
        .then((posts) => setPosts(posts))
        .catch((error) => {
          console.error(error);
          alert(error.message);
        });
    } catch (error) {
      console.error(error);

      alert(error.message);
    }
  }, []);

  const handleToggleLikeClick = () => {
    try {
      ( userSearchId ? logic.getUserPosts(userSearchId) : logic.getPosts())
        .then((posts) => setPosts(posts))
        .catch((error) => {
          console.error(error);
          alert(error.message);
        });
    } catch (error) {
      console.error(error);

      alert(error.message);
    }
  };

  const handleDeleteClick = () => {
    try {
      logic
        .getPosts()
        .then((posts) => setPosts(posts))
        .catch((error) => {
          console.error(error);
          alert(error.message);
        });
    } catch (error) {
      console.error(error);

      alert(error.message);
    }
  };

  const handleModifyClick = () => {
    try {
      logic
        .getPosts()
        .then((posts) => setPosts(posts))
        .catch((error) => {
          console.error(error);
          alert(error.message);
        });
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
          onModifyClick={handleModifyClick}
        />
      ))}
    </section>
  );
}
