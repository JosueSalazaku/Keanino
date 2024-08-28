import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import createClient  from "util/supabase/supabaseClient";
import type { SupabaseClient } from '@supabase/supabase-js';
import type { AuthError } from '@supabase/supabase-js';

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
  const supabase: SupabaseClient =  createClient();

  const email = formData.get("email") as string | null;
  const password = formData.get("password") as string | null;

  if (!email || !password) {
    return { error: { message: 'Email and password are required' } };
  }

  const { error }: { error: AuthError | null } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { error: { message: error.message } };
  }

  revalidatePath("/");

  return {};  // Return an empty object to indicate success
}

export async function signupAction(data: { email: string; password: string }): Promise<AuthActionResult> {
  const supabase: SupabaseClient =  createClient();

  if (!data.email || !data.password) {
    return { error: { message: 'Email and password are required' } };
  }

  const { error }: { error: AuthError | null } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
  });

  if (error) {
    return { error: { message: error.message } };
  }

  revalidatePath("/People");

  return {};  // Return an empty object to indicate success
}

export  async function logoutAction() {
  const supabase: SupabaseClient =  createClient();
  const { error }: { error: AuthError | null } = await supabase.auth.signOut();
  
  if (error) {
    console.error("Error logging out:", error);
    redirect("/error");
    return;
  }
  
  redirect("/login");
}

export default async function signInWithGoogle() { 
  const supabase: SupabaseClient =  createClient();
  const { error }: { error: AuthError | null } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
    },
  });

  if (error) {
    console.error("Error signing in with Google:", error);
    redirect("/error");
    return;
  }

  redirect("/");
}
