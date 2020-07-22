import { Todo } from "../model/types";
import { fakeUsers } from './user';

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function todoSetComplete (_id: number, _complete: boolean) {
  await wait(1000);
}

export async function addTodo (userId: number, content: string): Promise<Todo> {
  await wait(1000);
  return {
    id: Math.random(),
    content,
    user: fakeUsers[userId],
    complete: false
  };
}

export async function getTodos (): Promise<Todo[]> {
  await wait(1000);
  return [
    { id: 1, content: 'First Content', user: fakeUsers[1], complete: false },
    { id: 2, content: 'Second Content', user: fakeUsers[1], complete: true },
  ];
}