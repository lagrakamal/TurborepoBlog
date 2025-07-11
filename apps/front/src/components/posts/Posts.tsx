import { Post } from "@/features/post/types/post.types";
import PostCard from "@/components/posts/postCard";
import Pagination from "@/components/posts/pagination";

type Props = {
  posts: Post[];
  currentPage: number;
  totalPages: number;
};
const Posts = (props: Props) => {
  return (
    <section className="container m-8 max-w-7xl mx-auto">
      <h2 className="text-5xl font-bold text-center text-gray-600 leading-tight">
        Latest Posts
      </h2>
      <div className="h-1 mx-auto bg-gradient-to-r from-sky-500 to-indigo-500 w-96 mb-9 rounded-t-md mt-5" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {props.posts.map((post) => (
          <PostCard key={post.id} {...post} />
        ))}
      </div>
      <Pagination
        className="mt-4"
        currentPage={props.currentPage}
        totalPages={props.totalPages}
      />
    </section>
  );
};

export default Posts;
