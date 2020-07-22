import { atom } from 'recoil';
import { EntityRecord } from '../../model/types';

export const userEntitysAtom = atom<NonNullable<EntityRecord['users']>>({
  key: 'userAtom',
  default: {}
});

export const todoEntitysAtom = atom<NonNullable<EntityRecord['todos']>>({
  key: 'todosAtom',
  default: {}
});