import Comments from '../../models/Comments';
import { authenticateUser } from '../../Validators/auth';




export const deleteComment = async (parent,args,ctx,info) => {
      const user = authenticateUser(ctx.request);
      if(user instanceof Error){
           return user
      }
      const comment = await Comments.findByIdAndDelete(args._id);


      if(comment){
          return "Success"
      } else {
            return "not done. Try again later"
      }

}