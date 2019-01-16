import { authenticateUser } from "../../Validators/auth";
import Profile from "../../models/Profile";



export const unFriend = async (parent,args,ctx,info) => {
      const user  =  authenticateUser(ctx.request);
      if(user instanceof Error){
           return user
      }
      const profile  =  await Profile.findOne({user : user.id});
      if(profile){
           const friends = [...profile.friends];
           const removeFriend = friends.filter(friend !== args._id);
           profile.friend = removeFriend;
           profileReturned = await profile.save();
           return {...profileReturned._doc , _id : profileReturned.id}
      }else {
           return Error(JSON.stringify({error : "Oops..something went wrong"}))
      }

}
 