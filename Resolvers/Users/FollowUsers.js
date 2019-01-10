import { authenticateUser } from "../../Validators/auth";
import Follow from "../../models/subscribers";

export const followUser = async (parent, args, ctx, info) => {
  const user = authenticateUser(ctx.request);
  if (user instanceof Error) {
    return user;
  }
  const newFollower = new Follow({
         user : user.id,
         following : args._id
  })
  const followerReturned = await newFollower.save();
  return {...followerReturned._doc, _id : newFollower.id};
};
