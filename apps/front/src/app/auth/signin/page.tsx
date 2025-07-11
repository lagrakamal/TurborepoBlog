import Link from "next/link";
import SignInForm from "./_components/signInForm";
import { Button } from "@/shared/ui/button";
import { BACKEND_URL } from "@/shared/lib/constants";
import { FcGoogle } from "react-icons/fc";

const SignInPage = () => {
  return (
    <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md flex flex-col gap-6">
      <h1 className="text-2xl font-semibold text-center">Welcome Back</h1>

      <SignInForm />

      <div className="text-center text-sm text-muted-foreground">
        <Link href="/auth/forgot" className="underline hover:text-primary">
          Forgot your password?
        </Link>
      </div>

      <Button asChild variant="outline" className="gap-2">
        <a href={`${BACKEND_URL}/auth/google/login`}>
          <FcGoogle className="w-5 h-5" />
          Sign in with Google
        </a>
      </Button>
    </div>
  );
};

export default SignInPage;
