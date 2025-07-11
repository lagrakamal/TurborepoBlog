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

export const CREATE_USER_MUTATION = gql`
  mutation createUser($input: CreateUserInput!) {
    createUser(createUserInput: $input) {
      id
    }
  }
`;

export const SIGN_IN_MUTATION = gql`
  mutation signIn($input: SignInInput!) {
    signIn(signInInput: $input) {
      id
      name
      avatar
      accessToken
    }
  }
`;

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

export const POST_LIKES = gql`
  query PostLikeData($postId: Int!) {
    postLikesCount(postId: $postId)
    userLikedPost(postId: $postId)
  }
`;

export const LIKE_POST_MUTATION = gql`
  mutation LikePost($postId: Int!) {
    likePost(postId: $postId)
  }
`;

export const UNLIKE_POST_MUTATION = gql`
  mutation UnLikePost($postId: Int!) {
    unlikePost(postId: $postId)
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
