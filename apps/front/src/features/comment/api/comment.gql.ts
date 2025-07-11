import gql from "graphql-tag";

export const GET_POST_COMMENTS = gql`
  query getPostComments($postId: Int!, $take: Int, $skip: Int) {
    getPostComments(postId: $postId, take: $take, skip: $skip) {
      id
      content
      createdAt
      author {
        name
        avatar
      }
    }
    postCommentCount(postId: $postId)
  }
`;

export const CREATE_COMMENT_MUTATUION = gql`
  mutation createComment($input: CreateCommentInput!) {
    createComment(createCommentInput: $input) {
      id
    }
  }
`;
