import { createUser } from "./Users/createUser";
import { user } from "./Users/getUser";
import { loginUser } from "./Users/LoginUser";
import { currentUser } from "./Users/currentUser";
import { createProfile } from "./Profiles/createProfile";
import { getProfile } from "./Profiles/getProfile";
import { getProfileByHandle } from "./Profiles/getProfileByHandle";
import { deleteProfile } from "./Profiles/deleteProfile";
import { QueryUser } from "./Users/User";
import { createPost } from "./Posts/createPost";
import { deletePost } from "./Posts/deletePost";
import { getPosts } from "./Posts/getPosts";
import { PostComments } from "./Posts/Comments";
import { createComment } from "./Posts/CreateComment";
import { deleteComment } from "./Posts/deleteComment";
import { getPostsByUser } from "./Posts/getPostsbyUser";
import { likePost } from "./Posts/LikePosts";
import { unLikePost } from "./Posts/UnlikePost";
import { getFollowing } from "./Users/getfollowing";
import  {followUser}    from './Users/FollowUsers';
import { QueryUserFollowing } from "./Users/getFollowingUserdata";
import  {getAllProfiles}   from  './Profiles/getAllProfiles';

export const resolvers = {
  Mutation: {
    createUser: createUser,
    loginUser: loginUser,
    createProfile: createProfile,
    deleteProfile,
    createPost,
    deletePost,
    likePost,
    unLikePost,
    createComment,
    deleteComment,
    followUser
  },
  Query: {
    User: user,
    currentUser: currentUser,
    currentProfile: getProfile,
    getProfileByHandle,
    getPosts,
    getAllProfiles
  },
  Post: {
    user: QueryUser,
    comment: PostComments
  },
  Comment: {
    user: QueryUser
  },
  User: {
    posts: getPostsByUser
  },
  Follower: {
    user: QueryUser,
    following : QueryUserFollowing,
  },
  Profile: {
    following: getFollowing,
    user     : QueryUser
  }
};
