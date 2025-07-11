import { getSanitizedPlainText } from "@/shared/lib/sanitize";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { UserIcon } from "@heroicons/react/20/solid";
import { CommentEntity } from "../types/comment.types";

type Props = {
  comment: CommentEntity;
};

const CommentCard = ({ comment }: Props) => {
  return (
    <div className="p-2 bg-slate-100 shadow rounded">
      <div className="flex gap-2 text-slate-500 items-center">
        <Avatar className="border-2">
          <AvatarImage src={comment.author.avatar} />
          <AvatarFallback>
            <UserIcon className="w-8" />
          </AvatarFallback>
        </Avatar>
        <p>{comment.author.name} | </p>
        <p>{new Date(comment.createdAt).toLocaleDateString()}</p>
      </div>
      <p className="mt-4">{getSanitizedPlainText(comment.content)}</p>
    </div>
  );
};

export default CommentCard;
