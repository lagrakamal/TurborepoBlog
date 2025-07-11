import { Post } from "@/features/post/types/post.types";
import { CheckIcon } from "lucide-react";
import Image from "next/image";
import PostActions from "./postActions";
import { getSanitizedPlainText } from "@/shared/lib/sanitize";

type Props = {
  post: Post;
};

const PostListItem = ({ post }: Props) => {
  return (
    <>
      {/* Mobile Card Layout */}
      <div className="block md:hidden m-2 rounded-md overflow-hidden border shadow-md bg-slate-100 p-3">
        <div className="relative w-full h-40 mb-2">
          <Image src={post.thumbnail || "/no-image.png"} alt={post.title} fill className="object-cover rounded-md" />
        </div>
        <div className="mb-2">
          <p className="text-lg font-semibold line-clamp-1 text-slate-700">{post.title}</p>
          <p className="text-sm line-clamp-3 text-slate-500">{getSanitizedPlainText(post.content)}</p>
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-600 mb-1">
          <span><span className="font-medium">Date:</span> {new Date(post.createdAt).toLocaleDateString()}</span>
          <span><span className="font-medium">Published:</span> {post.published ? <CheckIcon className="inline w-4" /> : "No"}</span>
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-600 mb-2">
          <span><span className="font-medium">Likes:</span> {post._count.likes}</span>
          <span><span className="font-medium">Comments:</span> {post._count.comments}</span>
        </div>
        <div className="flex gap-2">
          <PostActions postId={post.id} />
        </div>
      </div>
      {/* Desktop Grid Layout */}
      <div
        className="hidden md:grid grid-cols-8 m-2 rounded-md overflow-hidden border 
      shadow-md hover:scale-[101%] transition text-center bg-slate-100"
      >
        <div className="relative w-full h-40 md:w-48 md:h-32">
          <Image src={post.thumbnail || "/no-image.png"} alt={post.title} fill />
        </div>
        <div className="flex flex-col gap-2 col-span-2">
          <p className="text-lg line-clamp-1 px-2 text-slate-700">{post.title}</p>
          <p className="text-sm line-clamp-3 px-1 text-slate-500">
            {getSanitizedPlainText(post.content)}
          </p>
        </div>
        <p className="flex justify-center items-center">
          {new Date(post.createdAt).toLocaleDateString()}
        </p>
        <div className="flex justify-center items-center">
          {post.published && <CheckIcon className="w-5" />}
        </div>
        <div className="flex justify-center items-center">
          {post._count.likes}
        </div>
        <div className="flex justify-center items-center">
          {post._count.comments}
        </div>
        <PostActions postId={post.id} />
      </div>
    </>
  );
};

export default PostListItem;
