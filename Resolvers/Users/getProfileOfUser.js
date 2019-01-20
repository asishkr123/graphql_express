import Profile from '../../models/Profile';




export const getProfileOfUser = async(parent,args,ctx,info) => {
     const profile =  await Profile.findOne({user : parent._id})
     if(!profile){
         return null
     }
     return {...profile._doc , _id : profile.id }
}