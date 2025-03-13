import { data } from "../data/index.js";
import { validate } from "./validate.js";

// de donde traigo el userId?
export const getPosts = (userId) => {
  //TODO: implementar validate de id

  validate.id(userId, "userId");

  const posts = data.posts.getAll();

  const aggregatedPosts = [];

  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];

    let liked = false;

    for (let i = 0; i < post.likes.length && !liked; i++) {
      const id = post.likes[i];

      if (id === userId) liked = true;
    }

    const user = data.users.getById(post.author);

    const aggregatedPost = {
      id: post.id,
      author: { id: post.author, name: user.name },
      image: post.image,
      title: post.title,
      createdAt: new Date(post.createdAt),
      modifiedAt: post.modifiedAt && new Date(post.modifiedAt),
      liked: liked,
      likesCount: post.likes.length,
      own: post.author === userId,
    };

    aggregatedPosts[aggregatedPosts.length] = aggregatedPost;
  }

  return aggregatedPosts.reverse();
};
