import Profile from "../../models/Profile";
import { authenticateUser } from "../../Validators/auth";

export const deleteProfile = async (parent, args, ctx) => {
  const user = authenticateUser(ctx.request);
  if (user instanceof Error) {
    return user;
  }
  const profile = await Profile.findOneAndDelete({ user: user.id });
  if (profile) {
    return "Success";
  } else {
    return "Profile not deleted ....try again later";
  }
};
