import {Schema,model} from 'mongoose';




const friendSchema  = new Schema({
       user : {
            type : Schema.Types.ObjectId,
            ref : 'user'
       },
       friend : {
            type : Schema.Types.ObjectId,
            ref : 'user'
       }
})




const Friend = model('friend',friendSchema);


export default Friend


