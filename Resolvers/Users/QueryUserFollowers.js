import User from '../../models/User';

export const QueryUserFollowers = async (parent,args,ctx,info) => {
    const user   =  await User.findById(parent.follower)
    if(!user){
        return null
    } else {
        return {...user._doc,_id : user.id}
    }  
} 