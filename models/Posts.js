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
    posted : {
        type : Date,
        default  : Date.now()
    },
    likes : [{
        type : Schema.Types.ObjectId,
        ref : 'user'
    }],
})


const Post = model('post',PostSchema);
export default Post


