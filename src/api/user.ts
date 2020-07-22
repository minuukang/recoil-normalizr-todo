import { User } from "../model/types";

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const fakeUsers: Record<number, User> = {
  1: { id: 1, name: 'Minwoo Kang' },
  2: { id: 2, name: 'Another User' }
};

export async function addUser (name: string) {
  await wait(1000);
  const id = Math.random();
  fakeUsers[id] = { id, name };
  return { id, name };
}

export async function getUsers (): Promise<User[]> {
  await wait(1000);
  return Object.values(fakeUsers);
}

export async function getCurrentUser (): Promise<User> {
  await wait(1000);
  return fakeUsers[1];
}

export async function changeUserName (id: number, newName: string): Promise<User> {
  await wait(1000);
  fakeUsers[id] = {
    id,
    name: newName
  };
  return fakeUsers[id];
}