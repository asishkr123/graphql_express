import {Schema,model} from 'mongoose';



const FollowSchema = new Schema({
      user : {
         type : Schema.Types.ObjectId,
         ref : 'user',
      },
      following : {
             type : Schema.Types.ObjectId,
             ref   : 'user'
      }
})



const Follow = model('follow', FollowSchema);


export default Follow