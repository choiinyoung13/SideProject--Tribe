import { supabase } from "../../supabase/supabaseClient";

export const toggleCartItemStatus = async ({
  cartId,
  itemId,
}: {
  cartId: string;
  itemId: number;
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
    }) => (item.itemId === itemId ? { ...item, checked: !item.checked } : item)
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

export const toggleAllCartItemStatus = async ({
  cartId,
  allItemChecked,
}: {
  cartId: string;
  allItemChecked: boolean;
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
    }) => ({ ...item, checked: allItemChecked })
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
