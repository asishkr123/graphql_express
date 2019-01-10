import User from '../../models/User';




export const QueryUserFollowing = async (parent,args,ctx,info) => {
    const user   =  await User.findById(parent.following)
    if(!user){
        return null
    } else {
        return {...user._doc,_id : user.id}
    }  
 
 }