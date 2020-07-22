import React from 'react';
import { useTodoPageData } from './hooks';
import TodoItem from './components/TodoItem';
import TodoForm from './components/TodoForm';

const Todo: React.FC = () => {
  const { todoData, loading } = useTodoPageData();
  return (
    <>
      {loading ? 'Loading...' : (
        <div>
          {todoData.map(todo => (
            <TodoItem todo={todo} key={todo.id} />
          ))}
        </div>
      )}
      <TodoForm />
    </>
  );
};

export default Todo;