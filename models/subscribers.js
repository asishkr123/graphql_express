import {Schema,model} from 'mongoose';



const FollowingSchema = new Schema({
      user : {
         type : Schema.Types.ObjectId,
         ref : 'user',
      },
      following : {
             type : Schema.Types.ObjectId,
             ref   : 'user'
      }
})



const Following = model('follow', FollowingSchema);


export default Following