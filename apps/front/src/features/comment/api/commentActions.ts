"use server";
import DOMPurify from "isomorphic-dompurify";
import { print } from "graphql";
import { authFetchGraphQL, fetchGraphQL } from "@/shared/lib/fetchGraphQL";

import { CommentFormSchema } from "@/features/comment/validation/commentFormSchema";
import {
  CREATE_COMMENT_MUTATUION,
  GET_POST_COMMENTS,
} from "@/features/comment/api/comment.gql";
import { CommentEntity, CreateCommentFormState } from "../types/comment.types";

export async function getPostComments({
  postId,
  skip,
  take,
}: {
  postId: number;
  take: number;
  skip: number;
}) {
  const data = await fetchGraphQL(print(GET_POST_COMMENTS), {
    postId,
    take,
    skip,
  });

  return {
    comments: data.getPostComments as CommentEntity[],
    count: data.postCommentCount as number,
  };
}
export async function saveComment(
  state: CreateCommentFormState | undefined,
  formData: FormData
): Promise<CreateCommentFormState> {
  const validatedFields = CommentFormSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success)
    return {
      data: Object.fromEntries(formData.entries()),
      errors: validatedFields.error.flatten().fieldErrors,
    };
  const sanitizedContent = DOMPurify.sanitize(validatedFields.data.content, {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: [],
  });
  const data = await authFetchGraphQL(print(CREATE_COMMENT_MUTATUION), {
    input: {
      ...validatedFields.data,
      content: sanitizedContent,
    },
  });

  if (data)
    return {
      message: "Success! Your comment saved!",
      ok: true,
      open: false,
    };

  return {
    message: "Oops! Something went wrong!",
    ok: false,
    open: true,
    data: Object.fromEntries(formData.entries()),
  };
}
