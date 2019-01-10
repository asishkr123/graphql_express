import Profile from "../../models/Profile";
import { authenticateUser } from "../../Validators/auth";

export const getProfile = async (parent, args, ctx) => {
  const user = authenticateUser(ctx.request);
  if (user instanceof Error) {
    return user
  } else {
    const profile = await Profile.findOne({ user: user.id });
    if (!profile) {
      return null
    } else {
      return {...profile._doc,_id : profile.id , skills: profile.skills.join(",")};
    }
  }
};
