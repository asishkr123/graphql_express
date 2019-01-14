import Profile from "../../models/Profile";


export const getAllProfiles = async (parent, args, ctx) => {
    const profiles = await Profile.find({});
    if (!profiles) {
      return null
    } else {
      return profiles.map(profile => {return {...profile._doc , _id : profile.id ,  skills: profile.skills.join(",")}})
    }
};
