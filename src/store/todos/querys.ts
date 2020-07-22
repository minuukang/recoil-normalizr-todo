import { selectorFamily, DefaultValue } from 'recoil';
import { todoSingleEntitySelector } from '../entitys/selectors';

export const todoCompleteQuery = selectorFamily<boolean, number>({
  key: '$todoCompleteQuery',
  get: id => ({ get }) => {
    return !!get(todoSingleEntitySelector(id))?.complete;
  },
  set: id => ({ set }, newValue) => {
    if (!(newValue instanceof DefaultValue)) {
      set(todoSingleEntitySelector(id), prevValue => ({
        ...prevValue,
        complete: newValue
      }));
    }
  }
});