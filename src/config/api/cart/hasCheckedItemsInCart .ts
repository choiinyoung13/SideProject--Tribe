import { supabase } from "../../../supabase/supabaseClient";

interface Item {
  id: number;
  checked: boolean;
}

// cart안에 아이템이 존재하는지 조회
export const hasCheckedItemsInCart = async (
  cartId: string
): Promise<boolean> => {
  const { data: cart, error: fetchError } = await supabase
    .from("carts")
    .select("items")
    .eq("user_id", cartId)
    .single();

  if (fetchError) {
    console.error("Error fetching cart:", fetchError);
    return false;
  }

  if (!cart || !cart.items) {
    console.error("Cart not found or items not found in cart");
    return false;
  }

  const items = cart.items as Item[];
  return items.some((item) => item.checked === false);
};

// 인자값으로 받은 id의 아이템이 카트안에 존재하는지 조회
export const hasCheckedItemInCartByID = async (
  userId: string,
  itemId: number
): Promise<boolean> => {
  const { data: cartData, error: cartError } = await supabase
    .from("carts")
    .select("items")
    .eq("user_id", userId)
    .single();

  if (cartError) {
    console.error("Error fetching cart:", cartError);
    return false;
  }

  if (cartData && cartData.items) {
    const itemExists = cartData.items.some(
      (item: { itemId: number }) => item.itemId === itemId
    );
    return itemExists;
  }

  return false;
};
