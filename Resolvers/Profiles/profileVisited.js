import { notificationEvent } from "../../events";
import { authenticateUser } from "../../Validators/auth";

export const profileVisited = (parent, args, ctx, info) => {
  const user = authenticateUser(ctx.request);
  if (user instanceof Error) {
    return user;
  }
  if (user.id !== args._id) {
    console.log('running');
    notificationEvent.emit("newEvent", {
      user: args._id,
      commUser: user.id,
      name: user.user,
      type: "profileVisited"
    });
    return "Success";
  }
};
