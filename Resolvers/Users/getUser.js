import User from "../../models/User";
import { authenticateUser } from "../../Validators/auth";
export function user(parent, args, ctx) {
  const user = authenticateUser(ctx.request);
  if(user instanceof Error || user === null){
      return new Error(JSON.stringify('Not authorized'))
  } else {
    console.log(user);
        return User.findById(args._id).then(user => {
          return { ...user._doc, _id: user.id };
        });
  }
}
