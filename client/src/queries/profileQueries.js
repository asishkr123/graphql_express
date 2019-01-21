import { gql } from "apollo-boost";

export const getCurrentProfile = gql`
  query {
    currentProfile {
      handle
      skills
      status
      githubusername
      user{
        name
        _id
        posts{
          likes{
            user{
              name
            }
          }
          text
        }
      }
      followers{
        follower{
          name
          _id
          profile{
            handle
          }
        }
      }
      following {
        following {
          name
          _id
          profile{
            handle
          }
          posts {
            text
            posted
            _id
            comment{
               text
               user{
                 name
               }
            }
            likes{
              user{
                name
              }
            }
            user{
              _id
            }
          }
        }
      }
    }
  }
`;





export const likePosts = gql`
  mutation($id: ID!) {
    likePost(_id: $id)
  }
`;

export const deletePost = gql`
  mutation($id: ID!) {
    deletePost(_id: $id)
  }
`;

export const getProfileByHandle = gql`
  query($handle: String!) {
    getProfileByHandle(handle: $handle) {
      handle
      skills
      status
      company
      user {
        name
        _id
        posts {
          text
          comment {
            text
          }
          likes {
            user {
              name
            }
          }
          _id
        }
      }
    }
  }
`;

export const getAllProfiles = gql`
  query {
    getAllProfiles {
      handle
      skills
      status
      following {
        following {
          name
          _id
        }
        user {
          name
          _id
        }
      }
      followers {
        follower {
          name
          _id
        }
      }
      user {
        name
        _id
      }
    }
  }
`;

export const unlikePost = gql`
  mutation($id: ID!) {
    unLikePost(_id: $id)
  }
`;

export const profilePosts = gql`
  query {
    currentProfile {
      handle
      user {
        name
        _id
        posts {
          text
          likes {
            user {
              name
            }
          }
          _id
          comment {
            text
            user {
              name
            }
          }
        }
      }
    }
  }
`;

export const createProfile = gql`
  mutation(
    $handle: String!
    $skills: String!
    $status: String!
    $bio: String!
    $company: String!
    $githubusername: String
  ) {
    createProfile(
      handle: $handle
      skills: $skills
      status: $status
      bio: $bio
      company: $company
      githubusername: $githubusername
    ) {
      handle
      skills
      status
    }
  }
`;

export const createPost = gql`
  mutation($text: String!) {
    createPost(text: $text) {
      text
    }
  }
`;

export const followUser = gql`
  mutation($id: ID!) {
    followUser(_id: $id)
  }
`;

export const unFollowUser = gql`
  mutation($id: ID!) {
    unFollowUser(_id: $id)
  }
`;

export const profileVisited = gql`
  mutation($id: ID!) {
    profileVisited(_id: $id)
  }
`;

export const getNotifications = gql`
  query {
    getNotifications {
      text
      date
      user {
        name
      }
      commUser {
        name
      }
      type
    }
  }
`;



export const getAllFollowers = gql`
 query($id : ID!){
    getAllFollowers(_id : $id){
       follower{
         profile{
            handle
         }
         _id
         name
         
       }
    }
 }

`




export const getAllFollowing = gql`
 query($id : ID!){
    getAllFollowing(_id : $id){
       following{
         profile{
            handle
         }
         _id
         name
         
       }
    }
 }

`