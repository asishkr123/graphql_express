import Post from '../../models/Posts';
import { authenticateUser } from '../../Validators/auth';

export const deletePost = async (parent,args,ctx,info) => {
     const user = authenticateUser(ctx.request);
     if(user instanceof Error){
           return user
     }

     const post = await Post.findByIdAndRemove(args._id);
     if(post){
         return "Success"
     } else {
         return "Not done"
     }
}


