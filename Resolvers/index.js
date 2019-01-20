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
import { followUser } from "./Users/FollowUsers";
import { QueryUserFollowing } from "./Users/getFollowingUserdata";
import { getAllProfiles } from "./Profiles/getAllProfiles";
import { getLikes } from "./Posts/getLikes";
import {profileVisited} from './Profiles/profileVisited';
import { unFollowUser } from "./Users/unfollowUsers";
import {getFollowers}  from './Users/getFollowers';
import {QueryUserFollowers} from './Users/QueryUserFollowers';
import {getCommunicatingUsers}  from './Users/getCommunicatingUser'
import  { getNotifications} from './Profiles/getNotifications';
import  {getProfileOfUser}  from './Users/getProfileOfUser';
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
    followUser,
    unFollowUser,
    profileVisited
  },
  Query: {
    User: user,
    currentUser: currentUser,
    currentProfile: getProfile,
    getProfileByHandle,
    getPosts,
    getAllProfiles,
    getNotifications,
  },
  Post: {
    user: QueryUser,
    comment: PostComments,
    likes: getLikes
  },
  Notification : {
    user : QueryUser,
    commUser  :  getCommunicatingUsers
  },
  Comment: {
    user: QueryUser
  },
  User: {
    posts: getPostsByUser,
    profile : getProfileOfUser
  },
  Following: {
    user: QueryUser,
    following: QueryUserFollowing
  },
  Follower : {
    user : QueryUser,
    follower : QueryUserFollowers
  },
  Profile: {
    following: getFollowing,
    followers : getFollowers,
    user: QueryUser
  },
  Likes: {
    user: QueryUser
  }
};
