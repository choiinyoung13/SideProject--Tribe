import { supabase } from "../../../supabase/supabaseClient";

export const updateCartItemReceivingDate = async ({
  cartId,
  itemId,
  newReceivingDate,
}: {
  cartId: string;
  itemId: number;
  newReceivingDate: number;
}) => {
  const { data: cart, error: fetchError } = await supabase
    .from("carts")
    .select("items")
    .eq("user_id", cartId)
    .single();

  if (fetchError) {
    console.error("Error fetching cart:", fetchError);
    return;
  }

  const items = cart.items;
  const updatedItems = items.map(
    (item: {
      itemId: number;
      option: string;
      checked: boolean;
      quantity: number;
      receivingDate: number;
    }) => {
      if (item.itemId === itemId) {
        return { ...item, receivingDate: newReceivingDate };
      }
      return item;
    }
  );

  const { data, error: updateError } = await supabase
    .from("carts")
    .update({ items: updatedItems })
    .eq("user_id", cartId);

  if (updateError) {
    console.error("Error updating item:", updateError);
  } else {
    console.log("Item updated:", data);
  }
};
