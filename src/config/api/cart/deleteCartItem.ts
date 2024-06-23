import { supabase } from "../../../supabase/supabaseClient";

export const deleteCartItem = async (cartId: string) => {
  const { data: cart, error: fetchError } = await supabase
    .from("carts")
    .select("items")
    .eq("user_id", cartId)
    .single();

  if (fetchError) {
    console.error("Error fetching cart:", fetchError);
    return;
  }

  const item = cart.items;
  const filteredItem = item.filter((item: { checked: boolean }) => {
    return item.checked === false;
  });

  const { data, error: deleteError } = await supabase
    .from("carts")
    .update({ items: filteredItem })
    .eq("user_id", cartId);

  if (deleteError) {
    console.error("Error deleting item:", deleteError);
  } else {
    console.log("Item updated:", data);
  }
};

export const deleteAllCartItem = async (cartId: string) => {
  const { data, error } = await supabase
    .from("carts")
    .update({ items: [] })
    .eq("user_id", cartId);

  if (error) {
    console.error("Error deleting items:", error);
  } else {
    console.log("Items deleted:", data);
  }
};
