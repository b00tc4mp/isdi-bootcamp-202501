import Post from "./Post";
import logic from "../../logic";

import { useState, useEffect } from "react";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    let posts = logic.getPosts();

    setPosts(posts);
  }, []);

  const handleLikeUpdate = function () {
    try {
      const newPosts = logic.getPosts();

      setPosts(newPosts);
    } catch (error) {
      console.error(error);

      alert(error.message);
    }
  };

  const handleDeletedPostSuccess = () => {
    try {
      const newPosts = logic.getPosts();

      setPosts(newPosts);
    } catch (error) {
      console.error(error);

      alert(error.message);
    }
  };

  const handleUpdateTextSuccess = () => {
    try {
      const newPosts = logic.getPosts();

      setPosts(newPosts);
    } catch (error) {
      console.error(error);

      alert(error.message);
    }
  };
  return (
    <div className="posts-container">
      {posts.toReversed().map((post) => {
        return (
          <Post
            author={post.author.username}
            key={post.id}
            image={post.image}
            text={post.text}
            createdAt={post.createdAt}
            modifiedAt={post.modifiedAt}
            liked={post.liked}
            likes={post.likes}
            id={post.id}
            onPostLikeUpdate={handleLikeUpdate}
            onDeletedPostSuccess={handleDeletedPostSuccess}
            onUpdatedTextSuccess={handleUpdateTextSuccess}
            own={post.own}
          />
        );
      })}
    </div>
  );
};

export default Posts;
