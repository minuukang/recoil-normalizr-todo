import { schema } from 'normalizr';

export const userEntity = new schema.Entity('users');

export const userEntityList = new schema.Array(userEntity);

export const todoEntity = new schema.Entity('todos', {
  user: userEntity
});

export const todoEntityList = new schema.Array(todoEntity);