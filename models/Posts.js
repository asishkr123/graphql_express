import {Schema,model}  from 'mongoose';


const PostSchema = new Schema({
    user : {
        type : Schema.Types.ObjectId,
        ref : "user"
    },
    text : {
        type : String,
        required : true

    },
    name : {
         type : String
    },
    posted : {
        type : Date,
        default  : Date.now()
    },
})


const Post = model('post',PostSchema);
export default Post


