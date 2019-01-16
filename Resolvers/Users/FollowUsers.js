import { authenticateUser } from "../../Validators/auth";
import Following from "../../models/subscribers";
import Follower from "../../models/Followers";

export const followUser = async (parent, args, ctx, info) => {
  const user = authenticateUser(ctx.request);
  if (user instanceof Error) {
    return user;
  }
  const newFollowing = new Following({
         user : user.id,
         following : args._id
  })
  const newFollower = new Follower({
         user : args._id,
         follower : user.id
  })
  const followingReturned = await newFollowing.save();
  const followerReturned = await newFollower.save();
  return "Success"
};
