import Post from '../../models/Posts';
import { authenticateUser } from '../../Validators/auth';
import { notificationEvent } from '../../events';

export const createPost = async (parent,args,ctx,info) => {
     const user = authenticateUser(ctx.request);
     if(user instanceof Error){
           return user
     }

     const newPost = new Post({
         text :  args.text,
         user :  user.id,
         name :  user.user
     })
     const post =  await newPost.save();
     notificationEvent.emit('newEvent' , {user : user.id , commUser : user.id,type : 'createPost'});
     if(post){
         return {...post._doc,_id : post.id}
     } else {
         return null;
     }
}


