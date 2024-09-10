// /* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable @typescript-eslint/no-unsafe-assignment */
// import { revalidatePath } from "next/cache";
// import { redirect } from "next/navigation";
// import createClient from "util/supabase/supabaseClient";
// import type { SupabaseClient, AuthError, AuthSession, User } from '@supabase/supabase-js';

// interface UserMetadata {
//   full_name?: string;
//   avatar_url?: string;
// }

// type AuthActionResult = {
//   error?: {
//     message: string;
//   };
//   data?: {
//     email: string;
//     password?: string;
//   };
// };

// export async function loginAction(formData: FormData): Promise<AuthActionResult> {
//   const supabase: SupabaseClient = createClient();

//   const email = formData.get("email") as string | null;
//   const password = formData.get("password") as string | null;

//   if (!email || !password) {
//     return { error: { message: 'Email and password are required' } };
//   }

//   const { error }: { error: AuthError | null } = await supabase.auth.signInWithPassword({ email, password });

//   if (error) {
//     return { error: { message: error.message } };
//   }

//   revalidatePath("/");

//   return {};  // Return an empty object to indicate success
// }

// export async function signupAction(data: { email: string; password: string }): Promise<AuthActionResult> {
//   const supabase: SupabaseClient = createClient();

//   if (!data.email || !data.password) {
//     return { error: { message: 'Email and password are required' } };
//   }

//   const { error }: { error: AuthError | null } = await supabase.auth.signUp({
//     email: data.email,
//     password: data.password,
//   });

//   if (error) {
//     return { error: { message: error.message } };
//   }

//   revalidatePath("/People");

//   return {};  // Return an empty object to indicate success
// }

// export async function logoutAction() {
//   const supabase: SupabaseClient = createClient();
//   const { error }: { error: AuthError | null } = await supabase.auth.signOut();

//   if (error) {
//     console.error("Error logging out:", error.message);
//     redirect("/error");
//     return;
//   }

//   redirect("/login");
// }

// export default async function signInWithGoogle() {
//   const supabase: SupabaseClient = createClient();

//   const { data, error } = await supabase.auth.signInWithOAuth({
//     provider: 'google',
//     options: {
//       queryParams: {
//         access_type: 'offline',
//         prompt: 'consent',
//       },
//     },
//   });

//   if (error) {
//     console.error("Error signing in with Google:", error.message);
//     redirect("/error");
//     return;
//   }

//   supabase.auth.onAuthStateChange(async (event, session: AuthSession | null) => {
//     if (event === 'SIGNED_IN' && session) {
//       const user: User | null = session.user;

//       if (!user) {
//         console.error("No user information found in session.");
//         return;
//       }

//       const userMetadata = user.user_metadata as UserMetadata;

//       // Extract the first and last names from the full name
//       const fullName = userMetadata.full_name ?? "";
//       const [name = "", surname = ""] = fullName.split(" ", 2);  // Destructuring with a default value
      
//       // Generate a username based on the email or name
//       const username = user.email?.split('@')[0] ?? name.toLowerCase();

//       try {
//         const { data: existingUser, error: fetchError } = await supabase
//           .from('users')
//           .select('*')
//           .eq('email', user.email)
//           .single();

//         if (fetchError && fetchError.code !== 'PGRST116') { // PGRST116 indicates no rows found
//           console.error("Error checking user in database:", fetchError.message);
//           return;
//         }

//         if (!existingUser) {
//           const { error: insertError } = await supabase.from('users').insert({
//             id: user.id,
//             email: user.email,
//             name,
//             surname,
//             username,
//             age: 0,  // Default age
//             password: null,  // Google users don't have a password in your DB
//             role: 'user',
//             created_at: new Date().toISOString(),
//           });

//           if (insertError) {
//             console.error("Error inserting user into database:", insertError.message);
//           }
//         }
//       } catch (err) {
//         console.error("Unexpected error during user check/insert:", (err as Error).message);
//       }
//     }
//   });

//   redirect("/");
// }

import {db} from "../server/db/index"