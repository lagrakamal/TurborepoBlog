import SubmitButton from "@/components/SubmitButton";
import { deletePost, fetchPostById } from "@/features/post/api/postAction";
import { Button } from "@/shared/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";

import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { redirect } from "next/navigation";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

const DeletePostPage = async (props: Props) => {
  const params = await props.params;
  const post = await fetchPostById(+params.id);
  const formAction = async (formData: FormData) => {
    "use server";
    // Validate that we have the form data (even if we don't use it directly)
    if (!formData) {
      throw new Error("Form data is required");
    }
    await deletePost(+params.id);
    redirect("/user/posts");
  };
  return (
    <Card className="w-96 m-12 px-6 py-6">
      <CardHeader>
        <CardTitle className="flex justify-between items-center font-thinr">
          <p className="text-red-500">Delete This Post?</p>
          <ExclamationCircleIcon className="w-8 text-red-500" />
        </CardTitle>
      </CardHeader>
      <CardDescription>
        <p>
          This action cannot be undone. This will permanently delete your post
          and remove its data from our servers.
        </p>
        <hr className="m-3" />
        <p className="flexx justify-between items-center">Title of the Post:</p>
        <p>{post.title}</p>
      </CardDescription>
      <CardContent>
        <form action={formAction} className="flex justify-end gap-2">
          <Button variant={"secondary"} asChild>
            <Link href={"/user/posts"}>Cancel</Link>
          </Button>
          <SubmitButton variant={"destructive"}>Delete</SubmitButton>
        </form>
      </CardContent>
    </Card>
  );
};

export default DeletePostPage;
