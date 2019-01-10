import User from '../../models/User';



export const QueryUser = async (parent,args,ctx,info) => {
   const user   =  await User.findById(parent.user)
   if(!user){
       return null
   } else {
       return {...user._doc,_id : user.id}
   }  

}