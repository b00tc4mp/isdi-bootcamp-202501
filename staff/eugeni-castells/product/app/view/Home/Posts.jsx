import Post from "./Post";

import { useState, useEffect } from "react";

import { logic } from "../../logic";

const Posts = ({ targetUserId }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    console.debug("Posts => useEffect");

    loadPosts();
  }, [targetUserId]);

  const loadPosts = () => {
    try {
      (targetUserId ? logic.getUserPosts(targetUserId) : logic.getPosts())
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

  const handleLikeUpdate = function () {
    try {
      logic
        .getPosts()
        .then((posts) => setPosts(posts))
        .catch((error) => {
          console.error(error);

          alert(error.message);
        });
    } catch (error) {
      (error) => {
        console.error(error);

        alert(error.message);
      };
    }
  };

  const handleDeletedPostSuccess = () => {
    try {
      logic
        .getPosts()
        .then((posts) => setPosts(posts))
        .catch((error) => {
          console.error(error);

          alert(error.message);
        });
    } catch (error) {
      (error) => {
        console.error(error);

        alert(error.message);
      };
    }
  };

  const handleUpdateTextSuccess = () => {
    try {
      logic
        .getPosts()
        .then((posts) => setPosts(posts))
        .catch((error) => {
          console.error(error);

          alert(error.message);
        });
    } catch (error) {
      (error) => {
        console.error(error);

        alert(error.message);
      };
    }
  };

  return (
    <div className="posts-container">
      {posts.toReversed().map((post) => {
        return (
          <Post
            author={post.author}
            key={post.id}
            image={post.image}
            text={post.text}
            createdAt={post.createdAt}
            modifiedAt={post.modifiedAt}
            liked={post.liked}
            likesCount={post.likesCount}
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
