import { supabase } from "@/supabase/supabaseClient";

export async function updateCartItemQuantity({
  cartId,
  itemId,
  direction,
}: {
  cartId: string;
  itemId: number;
  direction: string;
}) {
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
      if (item.itemId !== itemId) return item;

      if (direction === "plus") {
        return { ...item, quantity: item.quantity + 1 };
      }
      if (direction === "minus") {
        // 최소 1개 유지 (undefined가 들어가 DB를 오염시키는 것을 방지)
        if (item.quantity === 1) return item;
        return { ...item, quantity: item.quantity - 1 };
      }

      return item;
    }
  );

  const { error: updateError } = await supabase
    .from("carts")
    .update({ items: updatedItems })
    .eq("user_id", cartId);

  if (updateError) {
    console.error("Error updating item:", updateError);
  }
}


