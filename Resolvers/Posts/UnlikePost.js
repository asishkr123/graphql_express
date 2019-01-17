import Post from '../../models/Posts';
import { authenticateUser } from '../../Validators/auth';
import Like from '../../models/Likes';
import { notificationEvent } from '../../events';




export const unLikePost =  async (parent,args,ctx,info) => {
    const user = authenticateUser(ctx.request)
    if(user instanceof Error){
         return user;
    }
    const post   =  await Post.findById(args._id);
    if(post){
       const postLiked =  await Like.findOne({user : user.id}).where('post' , args._id);
       if(postLiked){
           await Like.findOneAndDelete({post : args._id}).where('user' , user.id)
           notificationEvent.emit('newEvent' , {user : user.id , commUser : post.user , type : "unLikePost"})
           return 'success'
       } 
       return Error(JSON.stringify({error : "YOU haven't yet liked the post"}))
     
    }
    return Error(JSON.stringify({error : "the post doesn't exist"}))
    
                                               
}