import gql from "graphql-tag";

export const GET_POSTS = gql`
  query posts($skip: Int, $take: Int) {
    posts(skip: $skip, take: $take) {
      id
      title
      thumbnail
      content
      createdAt
      slug
    }
    postCount
  }
`;

export const GET_POSTS_BY_ID = gql`
  query getPostById($id: Int!) {
    getPostById(id: $id) {
      id
      title
      thumbnail
      content
      createdAt
      slug
      published
      author {
        name
      }
      tags {
        id
        name
      }
    }
  }
`;

export const GET_USER_POSTS = gql`
  query GetUserPosts($take: Int, $skip: Int) {
    getUserPosts(take: $take, skip: $skip) {
      id
      title
      slug
      thumbnail
      published
      createdAt
      content
      _count {
        likes
        comments
      }
    }
    userPostCount
  }
`;

export const CREATE_POST_MUTATION = gql`
  mutation CreatePostMutation($input: CreatePostInput!) {
    createPost(createPostInput: $input) {
      id
    }
  }
`;

export const UPDATE_POST_MUTATION = gql`
  mutation UpdatePost($input: UpdatePostInput!) {
    updatePost(updatePostInput: $input) {
      id
    }
  }
`;

export const DELETE_POST_MUTATION = gql`
  mutation DeletePost($postId: Int!) {
    deletePost(postId: $postId)
  }
`;
