import { useMutation, useQueryClient } from "react-query";
import {
  deleteAllCartItem,
  deleteCartItem,
} from "../utill/cart/deleteCartItem";
import {
  toggleAllCartItemStatus,
  toggleCartItemStatus,
} from "../utill/cart/toggleCartItemStatus";
import { handleItemQuantity } from "../utill/cart/handleItemQuantity";
import { QUERY_KEYS } from "../config/queryKeys";
import { hasCheckedItemsInCart } from "../utill/cart/hasCheckedItemsInCart ";
import { addItemToCart } from "../utill/cart/addItemToCart";

export function useCartMutations() {
  const queryClient = useQueryClient();

  /******* deleteCartItemMutation  ********/
  const deleteCartItemMutation = useMutation(
    (cartId: string) => deleteCartItem(cartId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QUERY_KEYS.CART_ITEMS);
      },
    }
  );

  /******* deleteAllCartItemMutation  ********/
  const deleteAllCartItemMutation = useMutation(
    (cartId: string) => deleteAllCartItem(cartId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QUERY_KEYS.CART_ITEMS);
      },
    }
  );

  /******* toggleAllCartItemStatusMutation  ********/
  const toggleAllCartItemStatusMutation = useMutation(
    ({ cartId, allItemChecked }: { cartId: string; allItemChecked: boolean }) =>
      toggleAllCartItemStatus({ cartId, allItemChecked }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QUERY_KEYS.CART_ITEMS).then(() => {});
      },
    }
  );

  /******* caartItemQuantityMutation  ********/
  const cartItemQuantityMutation = useMutation(
    ({
      cartId,
      itemId,
      direction,
    }: {
      cartId: string;
      itemId: number;
      direction: string;
    }) => handleItemQuantity({ cartId, itemId, direction }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QUERY_KEYS.CART_ITEMS);
      },
    }
  );

  /******* toggleCartItemStatusMutation  ********/
  const toggleCartItemStatusMutation = useMutation(
    ({ cartId, itemId }: { cartId: string; itemId: number }) =>
      toggleCartItemStatus({ cartId, itemId }),
    {
      onSuccess: async (data, variables) => {
        const { cartId } = variables;
        await queryClient.invalidateQueries(QUERY_KEYS.CART_ITEMS);

        const res = await hasCheckedItemsInCart(cartId);
        return res;
      },
    }
  );

  const addItemToCartMutation = useMutation(addItemToCart, {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEYS.CART_ITEMS);
    },
  });

  return {
    deleteCartItemMutation,
    deleteAllCartItemMutation,
    toggleAllCartItemStatusMutation,
    cartItemQuantityMutation,
    toggleCartItemStatusMutation,
    addItemToCartMutation,
  };
}
