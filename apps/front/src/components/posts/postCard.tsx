import { Post } from "@/features/post/types/post.types";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/shared/ui/button";
import { getSanitizedPlainText } from "@/shared/lib/sanitize";

type Props = Partial<Post>;
const PostCard = ({
  id,
  title,
  slug,
  thumbnail,
  content,
  createdAt,
}: Props) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col hover:scale-[102%] transition">
      <div className="relative h-60">
        <Image
          className="ful"
          src={thumbnail || "/no-image.png"}
          alt={title ?? ""}
          fill
        />
      </div>
      <div className="p-6 flex-grow bg-slate-100 flex flex-col">
        <h3 className="text-lg font-bold break-words text-center text-gray-600">
          {title}
        </h3>
        <p className="mt-2  text-gray-500 text-sm">
          {new Date(createdAt ?? "").toLocaleDateString()}
        </p>
        <p className="mt-4 break-words text-gray-700">
          {getSanitizedPlainText(content).slice(0, 100)}...
        </p>
        <Button
          className="bg-slate-200 text-slate-600 hover:bg-slate-300 hover:underline mt-auto text-right block"
          asChild
        >
          <Link href={`/blog/${slug}/${id}`}>Read more ...</Link>
        </Button>
      </div>
    </div>
  );
};

export default PostCard;
