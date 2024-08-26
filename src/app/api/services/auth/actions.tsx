"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "../../../../../util/supabase/supabaseServer";

type AuthActionResult = {
  error?: {
    message: string;
  };
  data?: {
    email: string;
    password: string;
  };
};

export async function loginAction(formData: FormData): Promise<AuthActionResult> {
  const supabase = createClient();

  const email = formData.get("email") as string | null;
  const password = formData.get("password") as string | null;

  if (!email || !password) {
    return { error: { message: 'Email and password are required' } };
  }

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { error };
  }

  revalidatePath("/", "layout");
  redirect("/");
  return {};  // Return an empty object to indicate success, although redirect will generally prevent further execution
}

export async function signupAction(data: { email: string; password: string }): Promise<AuthActionResult> {
  const supabase = createClient();

  if (!data.email || !data.password) {
    return { error: { message: 'Email and password are required' } };
  }

  const { error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
  });

  if (error) {
    return { error };
  }

  // Revalidate path and redirect
  revalidatePath("/", "layout");
  redirect("/");
  return {};  // Return an empty object to indicate success
}
