"use server";
import { print } from "graphql";


import { authFetchGraphQL } from "@/shared/lib/fetchGraphQL";
import { LIKE_POST_MUTATION, POST_LIKES, UNLIKE_POST_MUTATION } from "@/features/like/api/like.gql";

export async function getPostLikeData(postId: number) {
  const data = await authFetchGraphQL(print(POST_LIKES), {
    postId,
  });
  return {
    likeCount: data.postLikesCount as number,
    userLikedPost: data.userLikedPost as boolean,
  };
}

export async function likePost(postId: number) {
  const _data = await authFetchGraphQL(print(LIKE_POST_MUTATION), {
    postId,
  });
  // Ensure the mutation was successful
  if (!_data) {
    throw new Error("Failed to like post");
  }
}

export async function unLikePost(postId: number) {
  const _data = await authFetchGraphQL(print(UNLIKE_POST_MUTATION), {
    postId,
  });
  // Ensure the mutation was successful
  if (!_data) {
    throw new Error("Failed to unlike post");
  }
}
