
import Following from "../../models/subscribers";

export const getAllFollowing = async (parent, args, ctx, info) => {
  const following = await Following.find({ user: args._id });
  if (!following) {
    return null;
  }
  return following.map(following => {
    return { ...following._doc, _id: following.id };
  });
};