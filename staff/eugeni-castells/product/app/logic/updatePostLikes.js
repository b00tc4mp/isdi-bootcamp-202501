import data from "../data";

const updatePostLikes = (postId) => {
  const postFound = data.posts.getById(postId);

  if (!postFound) throw new Error("Post not found");

  let userIdFound;

  for (let i = 0; i < postFound.likes.length; i++) {
    if (data.userId === postFound.likes[i]) userIdFound = data.userId;
  }

  if (!userIdFound) {
    postFound.likes[postFound.likes.length] = data.userId;
  } else {
    let likes = [];

    for (let i = 0; i < postFound.likes.length; i++) {
      if (postFound.likes[i] !== data.userId)
        likes[likes.length] = postFound.likes[i];
    }
    postFound.likes = likes;
  }
  data.posts.updateOne(postFound);
};

export default updatePostLikes;
