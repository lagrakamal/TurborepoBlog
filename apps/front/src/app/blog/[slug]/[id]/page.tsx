import Image from "next/image";
import Like from "@/features/like/components/like";
import { fetchPostById } from "@/features/post/api/postAction";
import { getSession } from "@/shared/lib/session";
import { getSanitizedHtml } from "@/shared/lib/sanitize";
import Comments from "@/features/comment/components/comments";

type ParamsType = { id: string };

const PostPage = async (props: { params: Promise<ParamsType> }) => {
  const { id } = await props.params;
  const post = await fetchPostById(+id);
  const session = await getSession();

  return (
    <main className="container mx-auto px-4 py-8 md:mt-15">
      <h1 className="text-4xl font-bold mb-4 text-slate-700">{post.title}</h1>
      <p className="text-slate-500 text-sm mb-4">
        By {post.author.name} | {new Date(post.createdAt).toLocaleDateString()}
      </p>
      <div className="relative w-80 h-60">
        <Image
          src={post.thumbnail || "/no-image.png"}
          alt={post.title}
          fill
          className="rounded-md object-cover shadow-xl"
        />
      </div>
      <div
        className="mt-5"
        dangerouslySetInnerHTML={{ __html: getSanitizedHtml(post.content) }}
      />
      {/* <SanitizedContent className="mt-5" content={post.content} /> */}
      {/* Todo: Put Post Comment Here*/}
      <Like postId={post.id} user={session?.user} />
      <Comments user={session?.user} postId={post.id} />
    </main>
  );
};

export default PostPage;
