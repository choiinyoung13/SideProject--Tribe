import { supabase } from "../../../supabase/supabaseClient";

export const checkAllCartItemReceivingDate = async ({
  cartId,
}: {
  cartId: string;
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
  const isNotAllSelected = items.some(
    (item: {
      itemId: number;
      option: string;
      checked: boolean;
      quantity: number;
      receivingDate: number;
    }) => item.receivingDate === 0
  );

  return isNotAllSelected;
};

export const checkCartItemReceivingDateById = async ({
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
  const item = items.filter(
    (item: {
      itemId: number;
      option: string;
      checked: boolean;
      quantity: number;
      receivingDate: number;
    }) => {
      return item.itemId === itemId;
    }
  );

  if (!item) return;

  return item[0].receivingDate === 0 ? false : true;
};
