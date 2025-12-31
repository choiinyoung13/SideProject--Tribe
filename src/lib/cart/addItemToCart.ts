import { supabase } from "@/supabase/supabaseClient";
import type { CartItemTypeWithUserId } from "@/types/CartItemType";

export async function addItemToCart({
  userId,
  title,
  imgUrl,
  originalPrice,
  discount,
  checked,
  receivingDate,
  itemId,
  quantity,
  deliveryPeriod,
}: CartItemTypeWithUserId) {
  const { data: cartData, error: cartError } = await supabase
    .from("carts")
    .select("items")
    .eq("user_id", userId)
    .maybeSingle();

  // 카트가 없는 경우 새로 생성
  if (cartError && cartError.code !== 'PGRST116') {
    console.error("장바구니 데이터를 가져오는중 에러가 발생했습니다:", cartError);
    return;
  }

  const items = cartData?.items || [];
  const itemIndex = items.findIndex(
    (item: CartItemTypeWithUserId) => item.itemId === itemId
  );

  if (itemIndex !== -1) {
    items.splice(itemIndex, 1);
  } else {
    items.push({
      title,
      imgUrl,
      originalPrice,
      discount,
      checked,
      receivingDate,
      itemId,
      quantity,
      deliveryPeriod,
    });
  }

  // 카트가 없으면 새로 생성, 있으면 업데이트
  if (!cartData) {
    const { error: createError } = await supabase
      .from("carts")
      .insert({ user_id: userId, items });

    if (createError) {
      console.error("장바구니 생성 중 에러가 발생했습니다:", createError);
      return;
    }
  } else {
    const { error: updateError } = await supabase
      .from("carts")
      .update({ items })
      .eq("user_id", userId);

    if (updateError) {
      console.error("장바구니 업데이트 중 에러가 발생했습니다:", updateError);
    }
  }
}


