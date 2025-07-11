"use server";
import { print } from "graphql";
import { SignUpFormSchema } from "@/features/auth/validation/signUpFormSchema";
import { fetchGraphQL } from "@/shared/lib/fetchGraphQL";

import { redirect } from "next/navigation";
import { LoginFormSchema } from "@/features/auth/validation/loginFormSchema";
import { createSession } from "@/shared/lib/session";
import { revalidatePath } from "next/cache";
import {
  SIGN_IN_MUTATION,
  CREATE_USER_MUTATION,
} from "@/features/auth/api/auth.gql";
import { SignUpFormState } from "../types/auth.types";

export async function signUp(
  _state: SignUpFormState | undefined,
  formData: FormData
): Promise<SignUpFormState | undefined> {
  const validatedFields = SignUpFormSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success)
    return {
      data: Object.fromEntries(formData.entries()),
      errors: validatedFields.error.flatten().fieldErrors,
    };

  const data = await fetchGraphQL(print(CREATE_USER_MUTATION), {
    input: {
      ...validatedFields.data,
    },
  });

  if (data.errors)
    return {
      data: Object.fromEntries(formData.entries()),
      message: "Something went wrong",
    };
  redirect("/auth/signin");
}

export async function signIn(
  _state: SignUpFormState | undefined,
  formData: FormData
): Promise<SignUpFormState | undefined> {
  const validatedFields = LoginFormSchema.safeParse(
    Object.fromEntries(formData.entries())
  );
  if (!validatedFields.success)
    return {
      data: Object.fromEntries(formData.entries()),
      errors: validatedFields.error.flatten().fieldErrors,
    };

  const data = await fetchGraphQL(print(SIGN_IN_MUTATION), {
    input: {
      ...validatedFields.data,
    },
  });

  if (data.errors) {
    return {
      data: Object.fromEntries(formData.entries()),
      message: "Invalid Credentials",
    };
  }

  // Todo: create a session

  await createSession({
    user: {
      id: data.signIn.id,
      name: data.signIn.name,
      avatar: data.signIn.avatar,
    },
    accessToken: data.signIn.accessToken,
  });

  revalidatePath("/");
  redirect("/");
}
