import { createClient } from '@supabase/supabase-js';

// const supabaseUrl = process.env.SUPABASE_URL!;
// const supabaseAnonKey = process.env.SUPABASE_KEY!;

// export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const supabaseClient = async (supabaseToken: string) => {
    const supabase = createClient(
        process.env.SUPABASE_URL!,
        process.env.SUPABASE_ANON_KEY!,
        {
            global: { headers: { Authorization: `Bearer ${supabaseToken}` } }
        }
    );
    return supabase;
};