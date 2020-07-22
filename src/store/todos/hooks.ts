import { useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { todoSetComplete } from '../../api/todo';
import { todoCompleteQuery } from './querys';
import { useAsyncLoading } from '../../helpers/useLoading';

export function useTodoCompleteQuery (todoId: number) {
  const [loading, handleLoading] = useAsyncLoading();
  const [value, setValue] = useRecoilState(todoCompleteQuery(todoId));
  const handler = useCallback((complete: boolean) => {
    handleLoading(async () => {
      await todoSetComplete(todoId, complete);
      setValue(complete);
    });
  }, [setValue, todoId]);
  return {
    loading,
    handler,
    value
  }
}