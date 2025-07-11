"use client";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { toast } from "sonner";
import { RichTextEditor } from "@/shared/components/editor/RichTextEditor";
import SubmitButton from "@/components/SubmitButton";
import { PostFormState } from "../types/post.types";

type Props = {
  state: PostFormState;
  formAction: (payload: FormData) => void;
};

const UpsertPostForm = ({ state, formAction }: Props) => {
  const [content, setContent] = useState(state.data?.content || "");

  const [imageUrl, setImageUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (state?.message) {
      if (state.ok) {
        toast("Success!", {
          description: state.message,
        });
      } else {
        toast("Oops!", {
          description: state.message,
        });
      }
    }
  }, [state]);
  return (
    <form
      action={(formData) => {
        if (file) {
          formData.set("thumbnail", file);
        } else {
          formData.delete("thumbnail");
        }
        formAction(formData);
      }}
      className="flex flex-col gap-5 [&>div>label]:text-slate-500 [&>div>label]:mb-2 [&>div>Input]:transition"
    >
      {typeof state.data?.postId !== "undefined" && (
        <input type="hidden" name="postId" value={state.data?.postId} />
      )}
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          name="title"
          placeholder="Enter the Title of Your Post"
          defaultValue={state.data?.title}
        />
      </div>
      {!!state.errors?.title && (
        <p className="text-red-500 animate-bounce">{state.errors.title}</p>
      )}
      <div>
        <Label htmlFor="content">Content</Label>
        <RichTextEditor
          value={content}
          onChange={setContent}
          placeholder="Write Your Post Content"
          minHeight="min-h-40"
        />
        <input type="hidden" name="content" value={content} />
      </div>
      {!!state.errors?.content && (
        <p className="text-red-500 animate-bounce">{state.errors.content}</p>
      )}
      <div>
        <Label htmlFor="thumbnail">Thumbnail</Label>
        <Input
          type="file"
          name="thumbnail"
          accept="image/*"
          ref={fileInputRef}
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              setFile(e.target.files[0]);
              setImageUrl(URL.createObjectURL(e.target.files[0]));
            } else {
              setFile(null);
              setImageUrl("");
            }
          }}
        />
        {(!!imageUrl || !!state.data?.previousThumbnailUrl) && (
          <Image
            src={imageUrl || state.data?.previousThumbnailUrl || ""}
            className="my-2 rounded-md shadow-md hover:scale-150 transition"
            alt="post thumbnail"
            width={200}
            height={150}
          />
        )}
      </div>
      {!!state.errors?.thumbnail && (
        <p className="text-red-500 animate-bounce">{state.errors.thumbnail}</p>
      )}
      <div>
        <Label htmlFor="tags">Tags (comma-separated)</Label>
        <Input
          name="tags"
          placeholder="Enter tags (comma-separated)"
          defaultValue={state.data?.tags}
        />
      </div>
      {!!state.errors?.tags && (
        <p className="text-red-500 animate-bounce">{state.errors.tags}</p>
      )}
      <div className="flex items-center gap-2">
        <Input
          className="w-3"
          type="checkbox"
          name="published"
          defaultChecked={!!state.data?.published}
        />
        <Label htmlFor="published">Published Now</Label>
      </div>
      {!!state.errors?.published && (
        <p className="text-red-500 animate-bounce">{state.errors.published}</p>
      )}
      <SubmitButton>save</SubmitButton>
    </form>
  );
};

export default UpsertPostForm;
