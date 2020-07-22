import { atom, selector } from 'recoil';
import { todoListEntitySelector } from '../../store/entitys/selectors';

export const todoPageData = atom<number[]>({
  key: '$todoPageData',
  default: []
});

export const todoPageDataSelector = selector({
  key: '$todoPageDataSelector',
  get ({ get }) {
    return get(todoListEntitySelector(get(todoPageData)));
  }
});