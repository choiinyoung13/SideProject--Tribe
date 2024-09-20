import { atom } from "recoil";
import { PostType } from "../../types/PostType";

export const PostState = atom<PostType[]>({
  key: "PostState",
  default: [],
});
