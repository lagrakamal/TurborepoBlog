"use client";

import SubmitButton from "@/components/SubmitButton";
import { signUp } from "@/features/auth/api/auth";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { useActionState } from "react";

const SignUpForm = () => {
  const [state, action] = useActionState(signUp, undefined);

  return (
    <form action={action} className="flex flex-col gap-4 w-full">
      {state?.message && (
        <p className="text-red-500 text-sm">{state.message}</p>
      )}

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          placeholder="John Doe"
          defaultValue={state?.data?.name}
        />
        {state?.errors?.name && (
          <p className="text-red-500 text-sm">{state.errors.name}</p>
        )}
      </div>

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
          <div className="text-sm text-red-500 mt-1">
            <p>Password must:</p>
            <ul className="list-disc list-inside">
              {state.errors.password.map((err) => (
                <li key={err}>{err}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <SubmitButton>Sign Up</SubmitButton>
    </form>
  );
};

export default SignUpForm;
