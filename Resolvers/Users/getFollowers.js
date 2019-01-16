import Follower from "../../models/Followers";

export const getFollowers = async (parent, args, ctx, info) => {
  const followers = await Follower.find({ user: parent.user });
  if (!followers) {
    return null;
  }
  return followers.map(followers => {
    return { ...followers._doc, _id: followers.id };
  });
};