import { EventEmitter } from "events";
import Notification from "./models/Notification";

export const notificationEvent = new EventEmitter();

notificationEvent.on("newEvent", async ({ user, commUser, name, type }) => {
  switch (type) {
    case "LikePost":
      const notification = new Notification({
        user,
        commUser,
        type: `you liked a post by ${name}`,
        date: Date.now()
      });
      await notification.save();
      break;
    case "unlikePost":
      const postunliked = new Notification({
        user,
        commUser,
        type: `you unliked a post by ${name}`,
        date: Date.now()
      });
      await postunliked.save();
      break;
    case "createPost":
      const postCreated = new Notification({
        user,
        commUser,
        type: `You created a post`,
        date : Date.now()
      });
      await postCreated.save();
      break;
    case "profileVisited":
      const profileVisited = new Notification({
        user,
        commUser,
        type: `${name} visited your profile`,
        date: Date.now()
      });
      await profileVisited.save();
      break;
    default:
      break;
  }
});
