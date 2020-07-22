export interface EntityRecord {
  todos?: Record<number, NormalizedTodo>;
  users?: Record<number, NormalizedUser>;
}

export interface User {
  id: number;
  name: string;
}

export interface NormalizedUser extends User {}

export interface Todo {
  id: number;
  content: string;
  user: User;
  complete: boolean;
}

export interface NormalizedTodo extends Omit<Todo, 'user'> {
  user: number;
}