import Post from "../../models/Posts";
import { authenticateUser } from "../../Validators/auth";

export const likePost = async (parent, args, ctx, info) => {
  const user = authenticateUser(ctx.request);
  if (user instanceof Error) {
    return user;
  }

  const post = await Post.findById(args._id);
  if (post) {
    if (post.likes.filter(like => like === user.id).length > 0) {
      return Error("You already liked the Post");
    } else {
      post.likes.unshift(user.id);
      const newPost = await post.save();
      return { ...newPost._doc, _id: newPost.id };
    }
  } else {
    return null;
  }
};
