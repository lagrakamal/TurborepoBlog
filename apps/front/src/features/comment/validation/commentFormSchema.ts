import z from "zod";

export const CommentFormSchema = z.object({
  content: z.string().min(5),
  postId: z.coerce.number(),
});
