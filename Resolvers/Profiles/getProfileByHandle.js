import Profile from "../../models/Profile";

export const getProfileByHandle = async (parent, args, ctx) => {
  const profile = await Profile.findOne({ handle : args.handle });
  if (profile) {
    return {...profile._doc,_id : profile.id , skills: profile.skills.join(",")};
  } else {
    return null;
  }
};
