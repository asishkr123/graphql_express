import {authenticateUser} from '../../Validators/auth'
import Notification from '../../models/Notification';




export const getNotifications=  async (parent,args,ctx,info) => {
    const user  =  authenticateUser(ctx.request);
     if(user instanceof Error){
          return user
    }
    const notifications  =  await Notification.find({user : user.id})
    return notifications.map(notification => {return {...notification._doc , _id : notification.doc}})    
}