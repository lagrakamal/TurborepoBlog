import Link from "next/link";
import SignUpForm from "./_components/signUpForm";
import { redirect } from "next/navigation";
import { getSession } from "@/shared/lib/session";

const SignUpPage = async () => {
  const session = await getSession();

  // Prüfe ob Benutzer angemeldet ist
  if (session?.user) {
    redirect("/");
  }
  return (
    <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md flex flex-col gap-6">
      <h2 className="text-2xl font-semibold text-center">Create an Account</h2>

      <SignUpForm />

      <div className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/auth/signin" className="underline hover:text-primary">
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default SignUpPage;
