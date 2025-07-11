"use server";

import { print } from "graphql";
import { authFetchGraphQL, fetchGraphQL } from "@/shared/lib/fetchGraphQL";
import {
  CREATE_POST_MUTATION,
  DELETE_POST_MUTATION,
  GET_POSTS,
  GET_POSTS_BY_ID,
  GET_USER_POSTS,
  UPDATE_POST_MUTATION,
} from "@/features/post/api/post.gql";
import { transformTakeSkip } from "@/shared/lib/helpers";
import { PostFormSchema } from "@/features/post/validation/postFormSchema";
import { uploadThumbnail } from "@/shared/lib/upload";
import { Post, PostFormState } from "../types/post.types";

export const fetchPosts = async ({
  page,
  pageSize,
}: {
  page?: number;
  pageSize?: number;
}) => {
  const { skip, take } = transformTakeSkip({ page, pageSize });
  const data = await fetchGraphQL(print(GET_POSTS), { skip, take });

  return { posts: data.posts as Post[], totalPosts: data.postCount };
};

export const fetchPostById = async (id: number) => {
  const data = await authFetchGraphQL(print(GET_POSTS_BY_ID), { id });

  return data.getPostById as Post;
};

export const fetchUserPosts = async ({
  page,
  pageSize,
}: {
  page: number;
  pageSize: number;
}) => {
  const { take, skip } = transformTakeSkip({ page, pageSize });
  const data = await authFetchGraphQL(print(GET_USER_POSTS), {
    take,
    skip,
  });

  return {
    posts: data.getUserPosts as Post[],
    totalPosts: data.userPostCount as number,
  };
};

export async function saveNewPost(
  state: PostFormState,
  formData: FormData
): Promise<PostFormState> {
  const validatedFields = PostFormSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success)
    return {
      data: Object.fromEntries(formData.entries()),
      errors: validatedFields.error.flatten().fieldErrors,
    };
  let thumbnailUrl = "";
  // Todo:Upload Thumbnail to supabase
  if (validatedFields.data.thumbnail)
    thumbnailUrl = await uploadThumbnail(validatedFields.data.thumbnail);
  // Todo:Upload Thumbnail to supabase

  // Todo: call garphql api
  const data = await authFetchGraphQL(print(CREATE_POST_MUTATION), {
    input: {
      ...validatedFields.data,
      thumbnail: thumbnailUrl,
    },
  });

  if (data) return { message: "Success! New Post Saved", ok: true };
  return {
    message: "Oops, Something Went Wrong",
    data: Object.fromEntries(formData.entries()),
  };
}

export async function UpdatePost(
  state: PostFormState,
  formData: FormData
): Promise<PostFormState> {
  const validatedFields = PostFormSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success)
    return {
      data: Object.fromEntries(formData.entries()),
      errors: validatedFields.error.flatten().fieldErrors,
    };

  let thumbnailUrl = "";
  // Nur wenn ein File im FormData ist, uploaden:
  const file = formData.get("thumbnail");
  if (file && typeof file !== "string") {
    thumbnailUrl = await uploadThumbnail(file as File);
  }

  const data = await authFetchGraphQL(print(UPDATE_POST_MUTATION), {
    input: {
      ...validatedFields.data,
      ...(thumbnailUrl && { thumbnail: thumbnailUrl }),
    },
  });

  if (data) return { message: "Success! Post Updated", ok: true };
  return {
    message: "Oops, Something Went Wrong",
    data: Object.fromEntries(formData.entries()),
  };
}

export async function deletePost(postId: number) {
  const data = await authFetchGraphQL(print(DELETE_POST_MUTATION), {
    postId,
  });
  return data.deletePost;
}
