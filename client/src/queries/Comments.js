import { gql } from "apollo-boost";

export const createComment = gql`
  mutation($text: String!, $id: ID!) {
    createComment(text: $text, _id: $id) {
      text
    }
  }
`;
