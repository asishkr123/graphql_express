import Follower from "../../models/Followers";

export const getAllFollowers = async (parent, args, ctx, info) => {
  const followers = await Follower.find({ user: args._id });
  if (!followers) {
    return null;
  }
  return followers.map(followers => {
    return { ...followers._doc, _id: followers.id };
  });
};