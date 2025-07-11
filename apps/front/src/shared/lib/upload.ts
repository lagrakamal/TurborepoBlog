import { createClient } from "@supabase/supabase-js";

export async function uploadThumbnail(image: File) {
  const supabaseUrl = process.env.SUPABASE_URL!;
  const supabaseKey = process.env.SUPABASE_API_KEY!;

  const supabase = createClient(supabaseUrl, supabaseKey);
  const data = await supabase.storage
    .from("thumbnails")
    .upload(`${image.name}_${Date.now()}`, image);

  console.log({ data });
  if (!data.data?.path) throw new Error("failed to upload the file!");
  const urlData = await supabase.storage
    .from("thumbnails")
    .getPublicUrl(data.data?.path);

  return urlData.data.publicUrl;
}
