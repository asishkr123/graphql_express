import Comments from "../../models/Comments";
import { authenticateUser } from "../../Validators/auth";
import { notificationEvent } from "../../events";

export const createComment = async (parent, args, ctx, info) => {
  const user = authenticateUser(ctx.request);
  if (user instanceof Error) {
    return user;
  }
  const newComment = new Comments({
    text: args.text,
    post: args._id,
    user: user.id
  });
  const comment = await newComment.save();
  if (comment) {
    notificationEvent.emit('newEvent' , {user : user.id , type : "CommentCreated"});
    return { ...comment._doc, _id: comment.id };
  } else {
    return null;
  }
};
