import { authenticateUser } from "../../Validators/auth";
import Following from "../../models/subscribers";
import Follower from '../../models/Followers';

export const unFollowUser = async (parent, args, ctx, info) => {
  const user = authenticateUser(ctx.request);
  if (user instanceof Error) {
    return user;
  }
  const result =  await Following.findOneAndDelete({ user: user.id }).where(
    "following",
    args._id
  );
  const followerResult = await Follower.findOneAndDelete({ user: args._id }).where(
    "follower",
    user.id
  );
  if (result && followerResult) {
    return "Success";
  } else {
    return "not Done..try again later";
  }
};
