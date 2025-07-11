"use client";

import { UpdatePost } from "@/features/post/api/postAction";
import UpsertPostForm from "@/features/post/components/upsertPostForm";
import { Post } from "@/features/post/types/post.types";
import { useActionState } from "react";

type Props = {
  post: Post;
};

const UpdatePostContainer = ({ post }: Props) => {
  const [state, action] = useActionState(UpdatePost, {
    data: {
      postId: post.id,
      title: post.title,
      content: post.content,
      published: post.published ? "on" : undefined,
      tags: post.tags.map((tag) => tag.name).join(","),
      previousThumbnailUrl: post.thumbnail ?? undefined,
    },
    errors: {},
    message: "",
    ok: false,
  });
  return <UpsertPostForm state={state} formAction={action} />;
};

export default UpdatePostContainer;
