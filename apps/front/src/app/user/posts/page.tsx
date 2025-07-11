import { fetchUserPosts } from "@/features/post/api/postAction";
import NoPost from "./_components/NoPost";
import PostList from "./_components/PostList";
import { DEFAULT_PAGE_SIZE } from "@/shared/lib/constants";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const UserPostPage = async ({ searchParams }: Props) => {
  const { page } = await searchParams;
  const { totalPosts, posts } = await fetchUserPosts({
    page: page ? +page : 1,
    pageSize: DEFAULT_PAGE_SIZE,
  });
  return (
    <div>
      {!posts || !posts.length ? (
        <NoPost />
      ) : (
        <PostList
          posts={posts}
          currentPage={page ? +page : 1}
          totalPages={Math.ceil(totalPosts / DEFAULT_PAGE_SIZE)}
        />
      )}
    </div>
  );
};

export default UserPostPage;
