import Profile from "../../models/Profile";

export const getProfileByHandle = async (parent, args, ctx) => {
  const profile = await Profile.findOne({ handle : args.handle });
  if (profile) {
    return profile;
  } else {
    return null;
  }
};
