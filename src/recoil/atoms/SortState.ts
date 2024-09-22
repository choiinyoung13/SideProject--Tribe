import { atom } from "recoil";

// shop sort
export const shopSortState = atom({
  key: "shopSortState",
  default: "추천순",
});

// community sort
export const communitySortState = atom({
  key: "communitySortState",
  default: "최신순",
});
