import { deleteSession } from "@/shared/lib/session";
import { redirect } from "next/navigation";

export async function GET() {
  await deleteSession();
  redirect("/");
}
