import { atom, selector } from "recoil";

export const userImageAtom = atom({
  key: "userImageAtom",
  default: "",
});
export const selectorImg = selector({
  key: "userImgAtom",
  get: ({ get }) => {
    const img = get(userImageAtom);
    if (img) {
      return img;
    }
    const imgInLocalStorage = localStorage.getItem("picture");
    return imgInLocalStorage || "./avatar.jpg";
  },
});
