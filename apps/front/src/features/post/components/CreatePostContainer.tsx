"use client";

import { saveNewPost } from "@/features/post/api/postAction";
import { useActionState } from "react";
import UpsertPostForm from "@/features/post/components/upsertPostForm";

const CreatePostContainer = () => {
  const [state, action] = useActionState(saveNewPost, {
    data: {},
    errors: {},
    message: "",
    ok: false,
  });
  return <UpsertPostForm state={state} formAction={action} />;
};

export default CreatePostContainer;
