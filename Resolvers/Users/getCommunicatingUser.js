import User from "../../models/User";



export const getCommunicatingUsers =  async (parent,args,ctc,info) => {
    const user =   await User.findById(parent.commUser);
    if(!user){
        return null  
    }else {
    return {...user._doc , _id : user.id}

    }
}