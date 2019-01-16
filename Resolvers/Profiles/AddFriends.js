import { authenticateUser } from "../../Validators/auth";
import Profile from "../../models/Profile";
import Follow from "../../models/subscribers";

export const addFriend = async (parent, args, ctx, info) => {
  const user = authenticateUser(ctx.request);
  if (user instanceof Error) {
    return user;
  }
  const profile = await Profile({ user: user.id });
  console.log(profile)
  console.log(user.id);
  if (profile) {
    if (args.request) {
      profile.friends.push(args._id);
    //   const following = await Follow.find({ user: user.id }).where(
    //     "following",
    //     args._id
    //   );
    //   if (!following) {

    
    //     const newFollowing = new Follow({
    //       user: user.id,
    //       following: args._id
    //     });
    //     const Followreturned = await newFollowing.save();
    //   }

      const newProfile = await profile.save();
      console.log(newProfile)
      return { ...newProfile._doc, _id: newProfile.id };
    }
  }
  else {
      return null;
  }
};
