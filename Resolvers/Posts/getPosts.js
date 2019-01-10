import Post from '../../models/Posts';
import { authenticateUser } from '../../Validators/auth';



export const getPosts = async (parent,args,ctx,info) => {
    const user = authenticateUser(ctx.request);
    if(user instanceof Error){
        return user
    };
   const Posts = await Post.find({user : user.id});


   if(Posts){
       return Posts.map(post => {return {...post._doc,_id : post.id}})
   }
   else {
       return null;
   }

}