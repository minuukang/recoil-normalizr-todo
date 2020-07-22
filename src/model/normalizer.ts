import { normalize } from 'normalizr';
import { userEntityList, userEntity, todoEntity, todoEntityList } from './schema';
import { EntityRecord, User, NormalizedUser, Todo, NormalizedTodo } from './types';

export const userNormalizer = (user: User) =>
  normalize<NormalizedUser, EntityRecord, number>(user, userEntity);
export const userListNormalizer = (users: User[]) =>
  normalize<NormalizedUser, EntityRecord, number[]>(users, userEntityList);

export const todoNormalizer = (todo: Todo) =>
  normalize<NormalizedTodo, EntityRecord, number>(todo, todoEntity);
export const todoListNormalizer = (todos: Todo[]) =>
  normalize<NormalizedTodo, EntityRecord, number[]>(todos, todoEntityList);