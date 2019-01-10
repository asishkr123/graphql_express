import Follow from "../../models/subscribers";

export const getFollowing = async (parent, args, ctx, info) => {
  const following = await Follow.find({ user: parent.user });
  if (!following) {
    return null;
  }
  return following.map(following => {
    return { ...following._doc, _id: following.id };
  });
};
