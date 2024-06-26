import { fetchUserLikesInfo } from "../config/api/user/fetchUserInfo";
import { areAllValuesNull } from "./areAllValuesNull";
import { priceCalculation } from "./priceCalculation";

type badge = "hot" | "fast";

interface ItemType {
  badge: badge[];
  category: string;
  classification: string;
  color: string | null;
  deliveryperiod: number;
  discount: number;
  id: number;
  imgurl: string;
  origin: string;
  originalprice: number;
  size: string;
  title: string;
}

type Items = ItemType[];

export const sortLowestId = (items: Items): Items => {
  return items.sort((a, b) => {
    const idA = a.id;
    const idB = b.id;
    return idA - idB;
  });
};

export const sortLowestPrice = (items: Items): Items => {
  return items.sort((a, b) => {
    const priceA = priceCalculation(a.originalprice, a.discount);
    const priceB = priceCalculation(b.originalprice, b.discount);
    return priceA - priceB;
  });
};

export const sortHighestPrice = (items: Items): Items => {
  return items.sort((a, b) => {
    const priceA = priceCalculation(a.originalprice, a.discount);
    const priceB = priceCalculation(b.originalprice, b.discount);
    return priceB - priceA;
  });
};

export const sortHighestDiscountRate = (items: Items): Items => {
  return items.sort((a, b) => {
    const discountA = a.discount;
    const discountB = b.discount;
    return discountB - discountA;
  });
};

interface filterObjTyep {
  color: string | null;
  fast: string | null;
  hot: string | null;
  like: string | null;
  price: string | null;
  size: string | null;
}

export const sortItmeByFilterObj = async (
  items: ItemType[],
  filterObj: filterObjTyep
): Promise<ItemType[]> => {
  let filtered = items;

  if (filterObj.fast) {
    filtered = filtered.filter((item) => item.badge.includes("fast"));
  }

  if (filterObj.hot) {
    filtered = filtered.filter((item) => item.badge.includes("hot"));
  }

  if (filterObj.like) {
    const userId = localStorage.getItem("sb-dipwebufeocjtwzmmcjt-auth-token");
    if (userId) {
      const data = await fetchUserLikesInfo(JSON.parse(userId).user.id);
      filtered = filtered.filter((item) => data!.likes.includes(item.id));
    }
  }

  if (filterObj.size) {
    if (filterObj.size === "Small") {
      filtered = filtered.filter((item) => item.size === "Small");
    }
    if (filterObj.size === "Medium") {
      filtered = filtered.filter((item) => item.size === "Medium");
    }
    if (filterObj.size === "Large") {
      filtered = filtered.filter((item) => item.size === "Large");
    }
  }

  if (filterObj.price) {
    if (filterObj.price === "5만원 이하") {
      filtered = filtered.filter((item) => {
        return priceCalculation(item.originalprice, item.discount) <= 50000;
      });
    }
    if (filterObj.price === "5만원 ~ 10만원 사이") {
      filtered = filtered.filter((item) => {
        return (
          priceCalculation(item.originalprice, item.discount) > 50000 &&
          priceCalculation(item.originalprice, item.discount) <= 100000
        );
      });
    }
    if (filterObj.price === "10만원 이상") {
      filtered = filtered.filter((item) => {
        return priceCalculation(item.originalprice, item.discount) > 100000;
      });
    }
  }

  if (filterObj.color) {
    if (filterObj.color === "빨강 계열") {
      filtered = filtered.filter((item) => {
        return item.color === "red";
      });
    }

    if (filterObj.color === "보라 계열") {
      filtered = filtered.filter((item) => {
        return item.color === "puple";
      });
    }

    if (filterObj.color === "흰색 계열") {
      filtered = filtered.filter((item) => {
        return item.color === "white";
      });
    }

    if (filterObj.color === "노랑 계열") {
      filtered = filtered.filter((item) => {
        return item.color === "yellow";
      });
    }

    if (filterObj.color === "초록 계열") {
      filtered = filtered.filter((item) => {
        return item.color === "green";
      });
    }

    if (filterObj.color === "파랑 계열") {
      filtered = filtered.filter((item) => {
        return item.color === "blue";
      });
    }

    if (filterObj.color === "혼합 컬러") {
      filtered = filtered.filter((item) => {
        return item.color === "mix";
      });
    }
  }

  if (areAllValuesNull(filterObj)) {
    filtered = items;
  }

  return filtered;
};
