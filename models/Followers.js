import { Schema,model } from "mongoose";




const FollowerSchema  = new Schema({
     user : {
          type : Schema.Types.ObjectId,
          ref  : 'user'
     },
     follower : {
         type : Schema.Types.ObjectId,
         ref : 'user'
     }
}) 



const Follower  = model('follower' , FollowerSchema);



export default Follower