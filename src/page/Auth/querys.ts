import { atom, selector } from "recoil";
import { userListEntitySelector } from "../../store/entitys/selectors";

export const userListAtom = atom<number[]>({
  key: '$userListAtom',
  default: []
});

export const userListSelector = selector({
  key: '$userListSelector',
  get ({ get }) {
    return get(userListEntitySelector(get(userListAtom)));
  }
});