"use client";

import SubmitButton from "@/components/SubmitButton";
import { signIn } from "@/features/auth/api/auth";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { useActionState } from "react";

const SignInForm = () => {
  const [state, action] = useActionState(signIn, undefined);

  return (
    <form action={action} className="flex flex-col gap-4 w-full">
      {state?.message && (
        <p className="text-red-500 text-sm text-center">{state.message}</p>
      )}

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="john@example.com"
          defaultValue={state?.data?.email}
        />
        {state?.errors?.email && (
          <p className="text-red-500 text-sm">{state.errors.email}</p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          defaultValue={state?.data?.password}
        />
        {state?.errors?.password && (
          <p className="text-red-500 text-sm">{state.errors.password}</p>
        )}
      </div>

      <SubmitButton className="mt-2">Sign In</SubmitButton>
    </form>
  );
};

export default SignInForm;
