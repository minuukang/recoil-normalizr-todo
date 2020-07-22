import { denormalize } from 'normalizr';
import { EntityRecord, User, Todo } from './types';
import { userEntity, userEntityList, todoEntityList, todoEntity } from './schema';

export const userDenormalizer = (data: number, entities: EntityRecord): User =>
  denormalize(data, userEntity, entities);
export const userListDenormalizer = (data: number[], entities: EntityRecord): User[] =>
  denormalize(data, userEntityList, entities);

export const todoDenormalizer = (data: number, entities: EntityRecord): Todo =>
  denormalize(data, todoEntity, entities);
export const todoListDenormalizer = (data: number[], entities: EntityRecord): Todo[] =>
  denormalize(data, todoEntityList, entities);
