import data from "../data/index.js";
import { errors, validate } from "../../com/index.js";

const { NotFoundError } = errors;

export const getPosts = (userId) => {
  validate.id(userId, "user id");

  let user;

  user = data.users.getById(userId);

  if (!user) throw new NotFoundError("user not found");

  const aggregatedPosts = [];

  const posts = data.posts.getAll();

  for (let i = 0; i < posts.length; i++) {
    let post = posts[i];

    let liked = false;

    for (let i = 0; i < post.likes.length && !liked; i++) {
      if (post.likes[i] === userId) {
        liked = true;
      }
    }
    const { id, author, image, text, createdAt, modifiedAt, likes } = post;

    const user = data.users.getById(author);

    const username = user.username;

    let aggregatedPost = {
      id: id,
      author: { id: author, username: username },
      image: image,
      text: text,
      createdAt: createdAt && new Date(createdAt),
      modifiedAt: modifiedAt && new Date(modifiedAt),
      likes: likes,
      liked: liked,
      own: post.author === userId,
    };

    aggregatedPosts[aggregatedPosts.length] = aggregatedPost;
  }

  return aggregatedPosts;
};
