import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const getItem = async (id) => {
  let { data, error } = await supabase
    .from("item")
    .select("*")
    .eq("user_id", id);

  console.log(data, "salim");
  if (error) {
    console.log(error.message);
    throw error;
  }

  return data || [];
};

export const logOut = async () => {
  let { error } = await supabase.auth.signOut();
};
