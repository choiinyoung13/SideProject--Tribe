import { supabase } from "../supabase/supabaseClient";

export const getCartItems = async () => {
  const Logged = localStorage.getItem("sb-dipwebufeocjtwzmmcjt-auth-token");
  if (Logged === null) {
    console.error("User not logged in");
    return;
  }

  if (Logged) {
    const { data, error } = await supabase
      .from("carts")
      .select("items")
      .eq("user_id", JSON.parse(Logged).user.id)
      .single();

    if (error) {
      console.error("Error fetching cart items:", error);
      return;
    }

    return data;
  }
};
