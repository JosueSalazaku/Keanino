import { supabaseClient } from "./supabaseClient";
import { User } from "../types";

export const supabaseRequests = async (supabaseToken: string) => {
  const supabase = await supabaseClient(supabaseToken);

  const getUsers = async (): Promise<User[]> => {
    const { data, error } = await supabase.from("users").select("*");
    if (error) throw error;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return (data ?? []) as User[];
  };

  return {
    getUsers,
  };
};
