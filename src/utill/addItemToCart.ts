import { supabase } from "../supabase/supabaseClient";

interface CartItemType {
  itemId: number;
  quantity: number;
  receivingDate?: number;
  option?: string;
}

export const addItemToCart = async ({
  itemId,
  quantity,
  receivingDate,
  option,
}: CartItemType) => {
  const Logged = localStorage.getItem("sb-dipwebufeocjtwzmmcjt-auth-token");
  if (Logged === null) {
    console.error("User not logged in");
    return;
  }

  const { data: cartData, error: cartError } = await supabase
    .from("carts")
    .select("items")
    .eq("user_id", JSON.parse(Logged).user.id)
    .single();

  if (cartError) {
    console.error("Error fetching cart:", cartError);
    return;
  }

  const items = cartData.items || [];
  const itemIndex = items.findIndex(
    (item: CartItemType) => item.itemId === itemId
  );

  if (itemIndex !== -1) {
    items.splice(itemIndex, 1);
  } else {
    items.push({ itemId, quantity, receivingDate, option });
  }

  const { error: updateError } = await supabase
    .from("carts")
    .update({ items })
    .eq("user_id", JSON.parse(Logged).user.id);

  if (updateError) {
    console.error("Error updating cart:", updateError);
  }
};
