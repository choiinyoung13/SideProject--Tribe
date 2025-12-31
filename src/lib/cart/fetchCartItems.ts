import { supabase } from "@/supabase/supabaseClient";
import type { CartItemType } from "@/types/CartItemType";

interface CartData {
  items: CartItemType[];
}

export async function fetchCartItems(userId: string): Promise<CartData> {
  const { data, error } = await supabase
    .from("carts")
    .select("items")
    .eq("user_id", userId)
    .maybeSingle();

  // 카트가 없는 경우는 정상적인 상황이므로 에러로 처리하지 않음
  if (error && error.code !== 'PGRST116') {
    console.error("Error fetching cart items:", error);
    return { items: [] };
  }

  return data ? { items: data.items || [] } : { items: [] };
}


