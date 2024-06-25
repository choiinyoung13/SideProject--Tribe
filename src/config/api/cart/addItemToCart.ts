import { supabase } from "../../../supabase/supabaseClient";

interface CartItemType {
  userId: string;
  itemId: number;
  quantity: number;
  receivingDate?: number;
  option?: string;
  checked?: boolean;
}

export const addItemToCart = async ({
  userId,
  itemId,
  quantity,
  receivingDate,
  option,
  checked,
}: CartItemType) => {
  const { data: cartData, error: cartError } = await supabase
    .from("carts")
    .select("items")
    .eq("user_id", userId)
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
    items.push({ itemId, quantity, receivingDate, option, checked });
  }

  const { error: updateError } = await supabase
    .from("carts")
    .update({ items })
    .eq("user_id", userId);

  if (updateError) {
    console.error("Error updating cart:", updateError);
  }
};
