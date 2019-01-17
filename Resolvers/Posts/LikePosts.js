import Post from "../../models/Posts";

import { authenticateUser } from "../../Validators/auth";
import Like from "../../models/Likes";
import { notificationEvent } from "../../events";


export const likePost = async (parent, args, ctx, info) => {
  const user = authenticateUser(ctx.request);
  if (user instanceof Error) {
    return user;
  }


  const post   =  await Post.findById(args._id);
  if(post){
     const postLiked =  await Like.findOne({user : user.id}).where('post' , args._id);
      if(!postLiked){
         const newLike =  new Like({
              user :  user.id,
              post  : args._id
         })
         const data = await newLike.save()
         notificationEvent.emit('newEvent' , {user : user.id , commUser : post.user , name : post.name,type : "LikePost"})
         return 'Success'
      }else {
          return Error(JSON.stringify({error : "YOU've already liked the post"}))
      }
   
  }
  return Error(JSON.stringify({error : "the post doesn't exist"}))
  
};
