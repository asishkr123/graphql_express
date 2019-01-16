import { Schema as _Schema, model } from "mongoose";
const Schema = _Schema;

const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user"
  },
  handle: {
    type: String,
    required: true
  },
  website: {
    type: String
  },
  company: {
    type: String
  },
  from: {
    type: Date
  },
  to: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    required: true
  },
  skills: {
    type: [String],
    required: true
  },
  bio: {
    type: String
  },
  githubUsername: {
    type: String
  },
  friends  : [
     {
       type : Schema.Types.ObjectId,
       ref  : 'user'
     }
  ]
});

const Profile = model("profile", ProfileSchema);

export default Profile;
