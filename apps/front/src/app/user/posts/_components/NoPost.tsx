import { Button } from "@/shared/ui/button";
import { PencilSquareIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

const NoPost = () => {
  return (
    <div className="mt-32 flex flex-col items-center gap-5">
      <p className="text-center p-4 text-5xl text-slate-400">No Post Yet!</p>
      <Button asChild>
        <Link
          className="flex items-center justify-center"
          href={"/user/create-post"}
        >
          <PencilSquareIcon className="w-4" />
          <span>Write Your First Post</span>
        </Link>
      </Button>
    </div>
  );
};

export default NoPost;
