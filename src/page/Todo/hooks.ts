import { useRecoilValue, useSetRecoilState } from 'recoil';
import { todoPageDataSelector, todoPageData } from './querys';
import { useEffect, useCallback } from 'react';
import { getTodos, addTodo } from '../../api/todo';
import { todoListNormalizer, todoNormalizer } from '../../model/normalizer';
import { currentUserSelector } from '../../store/auth/querys';
import { useNormalizeEntity } from '../../store/entitys/hooks';
import { useAsyncLoading } from '../../helpers/useLoading';

export function useAddTodo () {
  const [loading, handleLoading] = useAsyncLoading();
  const currentUser = useRecoilValue(currentUserSelector);
  const handleTodoEntity = useNormalizeEntity(todoNormalizer);
  const setTodoPageData = useSetRecoilState(todoPageData);

  const handler = useCallback((content: string) => handleLoading(async () => {
    if (!currentUser) {
      throw new Error('Do dont have a currentUser');
    }
    const result = handleTodoEntity(await addTodo(currentUser.id, content));
    setTodoPageData(prevData => [...prevData, result]);
  }), [currentUser]);

  return {
    handler,
    loading
  }
}

export function useTodoPageData () {
  const [loading, handleLoading] = useAsyncLoading();
  const todoData = useRecoilValue(todoPageDataSelector);
  const setTodoPageData = useSetRecoilState(todoPageData);
  const handleTodoListEntity = useNormalizeEntity(todoListNormalizer);

  useEffect(() => {
    handleLoading(async () => {
      const result = handleTodoListEntity(await getTodos());
      setTodoPageData(result);
    });
  }, []);

  return {
    todoData,
    loading
  }
}