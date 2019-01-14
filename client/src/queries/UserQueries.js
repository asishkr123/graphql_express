import { gql } from "apollo-boost";

export const createUser = gql`
  mutation(
    $name: String!
    $email: String!
    $password: String!
    $password2: String!
  ) {
    createUser(
      name: $name
      email: $email
      password: $password
      password2: $password2
    ) {
      name
      email
    }
  }
`;

export const loginUser = gql`
  mutation($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
    }
  }
`;

export const getCurrentUser = gql`
  query {
    currentUser {
      name
      email
      _id
    }
  }
`;
