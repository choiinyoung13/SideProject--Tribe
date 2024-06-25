import { supabase } from "../../../supabase/supabaseClient";

export const fetchUserLikesInfo = async (userId: string) => {
  const { data, error } = await supabase
    .from("userinfo")
    .select("likes")
    .eq("id", userId)
    .single();

  if (error) {
    console.error("Error fetching cart items:", error);
    return;
  }

  return data;
};
