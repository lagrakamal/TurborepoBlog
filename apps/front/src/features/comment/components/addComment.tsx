import { SessionUser } from "@/shared/lib/session";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { useActionState, useEffect, useState, useCallback } from "react";
import { toast } from "sonner";
import { saveComment } from "@/features/comment/api/commentActions";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog";
import { Button } from "@/shared/ui/button";
import { cn } from "@/shared/lib/utils";
import { Label } from "@/shared/ui/label";
import { Textarea } from "@/shared/ui/textarea";
import SubmitButton from "@/components/SubmitButton";
import { CommentEntity } from "../types/comment.types";

type Props = {
  postId: number;
  user: SessionUser;
  className?: string;
  refetch: (options?: RefetchOptions | undefined) => Promise<
    QueryObserverResult<
      {
        comments: CommentEntity[];
        count: number;
      },
      Error
    >
  >;
};

const AddComment = (props: Props) => {
  const [state, action] = useActionState(saveComment, undefined);
  const [open, setOpen] = useState(false);

  // Destructure props to avoid dependency issues
  const { refetch } = props;

  // Memoize the refetch function to avoid dependency issues
  const handleRefetch = useCallback(() => {
    refetch();
  }, [refetch]);

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
    if (state?.ok) {
      setOpen(false);
      handleRefetch();
    }
  }, [state, handleRefetch]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Leave Your Comment</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Write Your Comment</DialogTitle>
        <form action={action} className={cn(props.className)}>
          <input hidden name="postId" defaultValue={props.postId} />
          <Label htmlFor="comment">Your Comment</Label>
          <div className="border-t border-x rounded-t-md mt-3">
            <Textarea
              className="border-none active:outline-none focus-visible:ring-0 shadow-none"
              name="content"
            />
            {!!state?.errors?.content && (
              <p className="text-red-500 animate-bounce">
                {state.errors.content}
              </p>
            )}
          </div>
          <p className="border rounded-b-md p-2">
            <span className="text-slate-400">Write as </span>
            <span className="text-slate-700">{props.user.name}</span>
          </p>
          <SubmitButton className="mt-2">Submit</SubmitButton>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddComment;
