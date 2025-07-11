import { fetchPostById } from "@/features/post/api/postAction";
import UpdatePostContainer from "./_components/UpdatePostContainer";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

const UpdatePostPage = async (props: Props) => {
  const params = await props.params;
  const post = await fetchPostById(parseInt(params.id));
  return (
    <div className="bg-white shadow-md rounded-md p-6 max-w-2xl w-full mx-auto">
      <h2 className="text-lg text-center font-bold text-slate-700">
        Update Your Post
      </h2>
      <UpdatePostContainer post={post} />
    </div>
  );
};

export default UpdatePostPage;
