import { data } from "../data/index.js";
import { errors, validate } from "com";

const { ObjectId } = data;

const { NotFoundError, SystemError } = errors;

export const getPosts = (userId) => {
  validate.id(userId, "user id");

  const userObjectId = new ObjectId(userId);

  return data.users
    .findOne({ _id: userObjectId })
    .catch((error) => {
      {
        throw new System(error.message);
      }
    })
    .then((user) => {
      if (!user) throw new NotFoundError("user not found");

      return data.posts
        .find()
        .toArray()
        .catch((error) => {
          throw new SystemError(error.message);
        })
        .then((posts) => {
          const authors = posts.map(({ author }) => author);

          return data.users
            .find({ _id: { $in: authors } })
            .toArray()
            .catch((error) => {
              throw new SystemError(error.message);
            })
            .then((users) => {
              const aggregatedPosts = [];

              for (let i = 0; i < posts.length; i++) {
                let post = posts[i];

                let liked = false;

                for (let i = 0; i < post.likes.length && !liked; i++) {
                  if (post.likes[i].toString() === userId) {
                    liked = true;
                  }
                }

                const authorId = post.author.toString();

                const user = users.find(
                  (user) => user._id.toString() === authorId
                );

                const aggregatedPost = {
                  id: post._id.toString(),
                  author: { id: authorId, username: user.username },
                  image: post.image,
                  text: post.text,
                  createdAt: new Date(post.createdAt),
                  modifiedAt: post.modifiedAt && new Date(post.modifiedAt),
                  likes: post.likes,
                  liked: liked,
                  own: authorId === userId,
                  likesCount: post.likes.length,
                };

                aggregatedPosts[aggregatedPosts.length] = aggregatedPost;
              }
              return aggregatedPosts;
            });
        });
    });
};
