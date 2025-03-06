import Post from "./Post";
import logic from "../logic";

const { useState, useEffect } = React;

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

  return posts.toReversed().map((item) => {
    return (
      <Post
        author={item.author.username}
        key={item.id}
        image={item.image}
        text={item.text}
        createdAt={item.createdAt}
        modifiedAt={item.modifiedAt}
        liked={item.liked}
        likes={item.likes}
        id={item.id}
        onPostLikeUpdate={handleLikeUpdate}
      />
    );
  });
};

export default Posts;
