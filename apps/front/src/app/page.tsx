import { Hero } from "@/components/hero";
import Posts from "@/components/posts/Posts";
import { fetchPosts } from "@/features/post/api/postAction";
import { DEFAULT_PAGE_SIZE } from "@/shared/lib/constants";
import { getSession } from "@/shared/lib/session";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Home({ searchParams }: Props) {
  const { page } = await searchParams;
  const { totalPosts, posts } = await fetchPosts({
    page: page ? +page : undefined,
  });

  const session = await getSession();
  console.log({ session });

  return (
    <main>
      <Hero />
      <Posts
        posts={posts}
        currentPage={page ? +page : 1}
        totalPages={Math.ceil(totalPosts / DEFAULT_PAGE_SIZE)}
      />
    </main>
  );
}
