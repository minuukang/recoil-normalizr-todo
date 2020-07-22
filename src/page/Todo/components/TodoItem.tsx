import React, { useCallback } from 'react';
import { Todo } from '../../../model/types';
import { useTodoCompleteQuery } from '../../../store/todos/hooks';

type Props = {
  todo: Todo;
};

const TodoItem: React.FC<Props> = ({ todo }) => {
  const { value, loading, handler } = useTodoCompleteQuery(todo.id);
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(e => {
    handler(e.target.checked);
  }, [handler]);
  return (
    <div key={todo.id}>
      <input type="checkbox" checked={value} onChange={handleChange} disabled={loading} />
      {todo.content} (From. <strong>{todo.user.name}</strong>)
    </div>
  );
};

export default TodoItem;