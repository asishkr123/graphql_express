import { gql } from "apollo-boost";

export const getCurrentProfile = gql`
  query {
    currentProfile {
      handle
      skills
      status
      following {
        following {
          name
          posts {
            text
            posted
            _id
          }
        }
      }
    }
  }
`;

export const deletePost = gql`
  mutation($id: ID!) {
    deletePost(_id: $id) {
      text
    }
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
        posts {
          text
          likes
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
    }
  }
`;

export const profilePosts = gql`
  query {
    currentProfile {
      handle
      user {
        name
        posts {
          text
          likes
          _id
          comment{
            text
            user{
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
