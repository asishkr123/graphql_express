import {Schema,model} from 'mongoose';




const NotificationSchema  = new Schema({
       user : {
            type : Schema.Types.ObjectId,
            ref : 'user'
       },
       commUser : {
            type : Schema.Types.ObjectId,
            ref : 'user'
       },
       type : {
            type : String
       },
       date : {
            type : Date
       },
       
})




const Notification = model('notification',NotificationSchema);


export default Notification