import styled from "styled-components";
import ItemCard from "./ItemCard";
import { fetchItemsPerPage } from "../../config/api/items/fetchItems";
import { useQuery } from "react-query";
import { useAuth } from "../../hooks/useAuth";
import { fetchCartItems } from "../../config/api/cart/fetchCartItems";
import { QUERY_KEYS } from "../../config/constants/queryKeys";
import loadingIcon from "../../assets/images/logo/ball-triangle.svg";
import { useCallback, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { fetchUserLikesInfo } from "../../config/api/user/fetchUserInfo";

interface CartItemType {
  itemId: number;
  quantity: number;
}

type BadgeType = "hot" | "fast";

interface ItemType {
  id: number;
  title: string;
  imgurl: string;
  originalprice: number;
  badge: BadgeType[];
  discount: number;
}

export default function ItemListCon() {
  const { session } = useAuth();
  const [itemData, setItemData] = useState<ItemType[]>([]);
  const [pageParam, setPageParam] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  const { data: userLikeData } = useQuery(
    QUERY_KEYS.USERS,
    () => {
      if (session) return fetchUserLikesInfo(session?.user.id);
    },
    {
      enabled: !!session,
      staleTime: Infinity,
      cacheTime: 30 * 60 * 1000,
    }
  );

  const { data: cartData, isLoading: cartLoading } = useQuery(
    QUERY_KEYS.CART_ITEMS,
    () => fetchCartItems(session!.user.id),
    {
      enabled: !!session,
      staleTime: Infinity,
      cacheTime: 30 * 60 * 1000,
    }
  );

  const fetchItems = useCallback(async () => {
    setLoading(true);
    const response = await fetchItemsPerPage(pageParam);
    setItemData((prev) => [...prev, ...response.items]);
    setPageParam(
      response.nextCursor !== null ? response.nextCursor : pageParam
    );
    setHasMore(response.nextCursor !== null);
    setLoading(false);
  }, [pageParam]);

  useEffect(() => {
    if (inView && hasMore && !loading) {
      fetchItems();
    }
  }, [inView, fetchItems, hasMore, loading]);

  const cartItems: CartItemType[] = cartData ? cartData.items : [];

  return (
    <>
      {cartLoading || (itemData.length === 0 && loading) ? (
        <ListCon>
          <ListWrapper>
            <LoadingScreen>
              <img src={loadingIcon} alt="loading" />
            </LoadingScreen>
          </ListWrapper>
        </ListCon>
      ) : (
        <ListCon>
          <ListWrapper>
            {itemData.map(
              ({ id, title, imgurl, originalprice, badge, discount }) => {
                const isInCart = cartItems.some((item) => item.itemId === id);
                return (
                  <ItemCard
                    key={id}
                    id={id}
                    title={title}
                    imgurl={imgurl}
                    originalprice={originalprice}
                    badge={badge}
                    discount={discount}
                    isInCart={isInCart}
                    userLikeData={userLikeData?.likes}
                  />
                );
              }
            )}
          </ListWrapper>
          <LoadingObserver ref={ref}>
            {loading && <img src={loadingIcon} alt="loading" />}
            {!hasMore && <div>No more flowers</div>}
          </LoadingObserver>
        </ListCon>
      )}
    </>
  );
}

const LoadingScreen = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  tranform: translateX(-50%);
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 100px;
  }

  @media (max-width: 1024px) {
    top: 45%;
    left: 70%;

    img {
      width: 80px;
    }
  }

  @media (max-width: 768px) {
    top: 300px;
    left: 50%;
    tranform: translateX(0%);

    img {
      width: 90px;
    }
  }

  @media (max-width: 600px) {
    top: 300px;
    left: 40%;
    tranform: translateX(0%);

    img {
      width: 80px;
    }
  }
`;

const ListCon = styled.div`
  width: 100%;
  padding-left: 55px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 768px) {
    padding-left: 0px;
  }
`;

const ListWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: flex-start;
`;

const LoadingObserver = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
`;
