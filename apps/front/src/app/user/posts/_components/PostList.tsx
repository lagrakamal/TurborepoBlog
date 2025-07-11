import { Post } from "@/features/post/types/post.types";
import PostListItem from "./PostListItem";
import Pagination from "@/components/posts/pagination";

type Props = {
  posts: Post[];
  currentPage: number;
  totalPages: number;
};

const PostList = ({ posts, currentPage, totalPages }: Props) => {
  return (
    <>
      <div className="hidden md:grid grid-cols-8 rounded-md shadow-md m-3 p-3 text-center">
        <div className="col-span-3"></div>
        <div>Date</div>
        <div>Published</div>
        <div>Likes</div>
        <div>Comments</div>
      </div>
      {posts.map((post) => (
        <PostListItem post={post} key={post.id} />
      ))}
      <Pagination className="my-3" {...{ currentPage, totalPages }} />
    </>
  );
};

export default PostList;
