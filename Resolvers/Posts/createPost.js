import Post from '../../models/Posts';
import Subscriber from '../../models/subscribers';
import { authenticateUser } from '../../Validators/auth';

export const createPost = async (parent,args,ctx,info) => {
     const user = authenticateUser(ctx.request);
     if(user instanceof Error){
           return user
     }

     const newPost = new Post({
         text :  args.text,
         user :  user.id,
     })
     const post =  await newPost.save();
     if(post){
        //  const subscribedPost = new Subscriber({
        //        post : post.id,
        //        user  : user.id
        //  })
        // const savedSubPost =  await subscribedPost.save()
         return {...post._doc,_id : post.id}
     } else {
         return null;
     }
}


