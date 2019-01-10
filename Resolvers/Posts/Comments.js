import Comments from '../../models/Comments';



export const PostComments = async (parent,args,ctx,info) => {
     
const comments   =  await Comments.find({post : parent._id})
      if(comments){
          return comments.map(comment => {return {...comment._doc,_id : comment.id}})
      } else {
          return  null
      }
}