"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "../../../../../util/supabase/supabaseServer";

type AuthActionResult = {
  error?: {
    message: string;
  };
  data?: FormData;
};

export async function loginAction(formData: FormData): Promise<AuthActionResult> {
  const supabase = createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  if (!data.email || !data.password) {
    return { error: { message: 'Email and password are required' } }
  }

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    return { error };
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signupAction(formData: FormData): Promise<AuthActionResult> {
  const supabase = createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  if (!data.email || !data.password) {
    return { error: { message: 'Email and password are required' } }
  }

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    return { error };
  }

  revalidatePath("/", "layout");
  redirect("/");
}
