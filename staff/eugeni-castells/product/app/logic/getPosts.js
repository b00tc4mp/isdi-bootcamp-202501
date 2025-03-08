import data from "../data";

const getPosts = () => {
  const aggregatedPosts = [];

  const { userId } = data;

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
      author: { author: author, username: username },
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

export default getPosts;
