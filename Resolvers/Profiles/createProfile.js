import Profile from "../../models/Profile";
import validateProfileInput from "../../Validators/profileValidation";
import { authenticateUser } from "../../Validators/auth";

export const createProfile = async (parent, args, ctx) => {
  const user = authenticateUser(ctx.request);
  if (user instanceof Error || user === null) {
    return user;
  } else {
    const { errors, isValid } = validateProfileInput(args);
    if (!isValid) {
      return Error(JSON.stringify(errors));
    } else {
      const skills = args.skills.split(",");
      const profileData = {
        handle: args.handle,
        user: user.id,
        skills,
        status: args.status,
        company: args.company ? args.company : "",
        githubusername: args.githubusername ? args.githubusername : "",
        website: args.website ? args.website : "",
        from: args.from ? args.from : "",
        to: args.to ? args.to : ""
      };
      const profile = await Profile.findOne({ user: user.id });
      if (profile) {
        const newProfile = await Profile.findOneAndUpdate(
          { user: user.id },
          { $set: profileData },
          { new: true }
        );
        return { ...newProfile._doc, skills: newProfile.skills.join(",") };
      } else {
        const handle = await Profile.findOne({ handle: args.handle });
        if (handle) {
          return Error(
            JSON.stringify({ ...errors, handle: "handle already exists" })
          );
        }
        const newProfile = new Profile(profileData);
        const profile = await newProfile.save();
        return { ...profile._doc, skills: profile.skills.join(",") };
      }
    }
  }
};
