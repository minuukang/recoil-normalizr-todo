import { selector, DefaultValue, selectorFamily } from 'recoil';
import { userEntitysAtom, todoEntitysAtom } from './atoms';
import { merge } from 'lodash';
import { EntityRecord, User, Todo } from '../../model/types';
import { userDenormalizer, userListDenormalizer, todoDenormalizer, todoListDenormalizer } from '../../model/denormalizer';
import { todoNormalizer, todoListNormalizer, userNormalizer, userListNormalizer } from '../../model/normalizer';

const entityAtom = {
  users: userEntitysAtom,
  todos: todoEntitysAtom
};

export const entitySelector = selector<EntityRecord>({
  key: '$entitySelector',
  get ({ get }) {
    return Object.entries(entityAtom).reduce<EntityRecord>((result, [key, atom]) => {
      return {
        ...result,
        [key]: get(atom as any)
      };
    }, {})
  },
  set ({ set }, newValue) {
    if (!(newValue instanceof DefaultValue)) {
      for (const [key, value] of Object.entries(newValue)) {
        set(
          entityAtom[key as keyof EntityRecord] as any,
          prevValue => merge({}, prevValue, value)
        );
      }
    }
  }
});

export const userSingleEntitySelector = selectorFamily<User, number>({
  key: '$userSingleEntitySelector',
  get: id => ({ get }) => {
    return userDenormalizer(id, get(entitySelector));
  },
  set: () => ({ set }, newValue) => {
    if (!(newValue instanceof DefaultValue)) {
      const { entities } = userNormalizer(newValue);
      set(entitySelector, entities);
    }
  }
});

export const userListEntitySelector = selectorFamily<User[], number[]>({
  key: '$userListEntitySelector',
  get: ids => ({ get }) => {
    return userListDenormalizer(ids, get(entitySelector));
  },
  set: () => ({ set }, newValue) => {
    if (!(newValue instanceof DefaultValue)) {
      const { entities } = userListNormalizer(newValue);
      set(entitySelector, entities);
    }
  }
});

export const todoSingleEntitySelector = selectorFamily<Todo, number>({
  key: '$todoSingleEntitySelector',
  get: id => ({ get }) => {
    return todoDenormalizer(id, get(entitySelector));
  },
  set: () => ({ set }, newValue) => {
    if (!(newValue instanceof DefaultValue)) {
      const { entities } = todoNormalizer(newValue);
      set(entitySelector, entities);
    }
  }
});

export const todoListEntitySelector = selectorFamily<Todo[], number[]>({
  key: '$todoListEntitySelector',
  get: ids => ({ get }) => {
    return todoListDenormalizer(ids, get(entitySelector));
  },
  set: () => ({ set }, newValue) => {
    if (!(newValue instanceof DefaultValue)) {
      const { entities } = todoListNormalizer(newValue);
      set(entitySelector, entities);
    }
  }
});