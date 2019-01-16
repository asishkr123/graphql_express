import Profile from "../../models/Profile";
import { authenticateUser } from "../../Validators/auth";

export const getProfile = async (parent, args, ctx) => {
  const user = authenticateUser(ctx.request);
  if (user instanceof Error) {
    return user
  } else {
    const profile = await Profile.findOne({ user: user.id });
    console.log(user.id);
    console.log(profile);
    if (!profile) {
      return null
    } else {
      console.log("running")
      return {...profile._doc,_id : profile.id , skills: profile.skills.join(",")};
    }
  }
};
