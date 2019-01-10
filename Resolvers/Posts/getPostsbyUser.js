import Post from '../../models/Posts';




export const getPostsByUser = async (parent,args,ctx,info) => {
   const Posts = await Post.find({user : parent._id});
   if(Posts){
        return Posts.map(post => {
             return {...post._doc, _id : post.id}
        })
   }
}