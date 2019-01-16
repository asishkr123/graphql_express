import Like from "../../models/Likes";



export const getLikes  = async (parent,args,ctx,info) => {
     const Likes   =  Like.find({post : parent._id});
      if(Likes){
           return Likes
      }else {
            return null
      }

}