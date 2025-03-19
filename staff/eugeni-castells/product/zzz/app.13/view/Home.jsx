// import { useState, useEffect } from "react";
const { useState, useEffect } = React;

import logic from "../logic.js";
import Post from "./Post.jsx";
import CreatePost from "./CreatePost.jsx";

function Home({ onLogoutClick, onCancelClick }) {
  const [currentUserName, setCurrentUserName] = useState("");
  const [displayCreatePost, setDisplayCreatePost] = useState(false);
  const [posts, setPosts] = useState([]);

  const handleSetPosts = function (posts) {
    setPosts(posts);
  };

  const handlePostCreation = (post) => {
    try {
      logic.addPost(post);

      const posts = logic.getPosts();

      setPosts(posts);

      setDisplayCreatePost(false);
    } catch (error) {
      console.error(error);

      alert(error.message);
    }
  };
  useEffect(() => {
    let userName = logic.getOnlineUserName();

    setCurrentUserName(userName);

    let posts = logic.getPosts();

    setPosts(posts);
  }, []);

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Logo</h1>
      <button
        style={{
          backgroundColor: "red",
          borderRadius: "50%",
          width: "60px",
          height: "60px",
          padding: "5px",
        }}
        onClick={onLogoutClick}
      >
        Logout
      </button>
      <h2>Hello, {currentUserName}!</h2>
      {posts &&
        !displayCreatePost &&
        posts.map((item) => {
          return (
            <Post
              author={item.author}
              image={item.image}
              text={item.text}
              createdAt={item.createdAt}
              modifiedAt={item.modifiedAt}
              liked={item.liked}
              likes={item.likes}
              id={item.id}
              onSetPosts={handleSetPosts}
            />
          );
        })}
      {!displayCreatePost && (
        <div
          className="create-post-button"
          onClick={() => {
            setDisplayCreatePost(true);
          }}
        >
          +
        </div>
      )}
      {displayCreatePost && (
        <CreatePost
          onCancelClick={onCancelClick}
          onPostCreation={handlePostCreation}
        />
      )}
    </div>
  );
}

export default Home;
