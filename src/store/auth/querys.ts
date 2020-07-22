import { atom, DefaultValue } from 'recoil';
import { selector } from 'recoil';
import { userSingleEntitySelector } from '../entitys/selectors';
import { User } from '../../model/types';

export const currentUserIdAtom = atom<number | null>({
  key: '$currentUserId',
  default: null
});

export const currentUserSelector = selector<User | null>({
  key: '$currentUserSelector',
  get ({ get }) {
    const id = get(currentUserIdAtom);
    return id ? get(userSingleEntitySelector(id)) : null;
  },
  set ({ set }, newValue) {
    if (!(newValue instanceof DefaultValue)) {
      set(currentUserIdAtom, newValue?.id || null);
    }
  }
});