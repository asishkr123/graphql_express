import {Schema,model}  from 'mongoose';




const commentSchema = new Schema({
    text : {
        type : String,
        required : true
    },
    user : {
        type : Schema.Types.ObjectId,
        ref : 'user'
    },
    post : {
        type : Schema.Types.ObjectId,
        ref : 'post'
    },
    likes : [{
        type : Schema.Types.ObjectId,
        ref : "user"
    }],
    posted : {
        type : Date,
        default : Date.now()
    }
})


const Comments = model('comment',commentSchema);

export default Comments