import { supabase } from "../supabase/supabaseClient";

export const makeUserCart = async (userId: string) => {
  const { error } = await supabase
    .from("carts")
    .select("user_id")
    .eq("user_id", userId)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      // 해당 유저의 cart가 존재하지 않는 경우 새로 생성
      const { error: insertError } = await supabase
        .from("carts")
        .insert({ user_id: userId, items: [] });

      if (insertError) {
        console.error("Error creating user cart:", insertError);
      } else {
        console.log("User cart created successfully");
      }
    } else {
      console.error("Error checking user cart:", error);
    }
  }
};
