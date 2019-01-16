import {Schema , model} from 'mongoose'



const LikesSchema = new Schema({
     user : {
           type : Schema.Types.ObjectId,
           ref  : 'user'
     },
     post : {
         type : Schema.Types.ObjectId,
         ref : 'post'
     }
})
const Like  =  model('like', LikesSchema);

export default  Like