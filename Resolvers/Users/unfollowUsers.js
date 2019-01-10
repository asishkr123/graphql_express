import { authenticateUser } from "../../Validators/auth";
import Follow from "../../models/subscribers";

export const unfollowUser = async (parent, args, ctx, info) => {
  const user = authenticateUser(ctx.request);
  if (user instanceof Error) {
    return user;
  }
  const result = Follow.findOneAndDelete({ user: user.id }).where(
    "following",
    args._id
  );
  if (result) {
    return "Success";
  } else {
    return "not Done..try again later";
  }
};
