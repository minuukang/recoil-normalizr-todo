import React, { useCallback } from 'react';
import { useAddUser } from '../hooks';

const AddUserForm: React.FC = () => {
  const { handler, loading } = useAddUser();
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = useCallback(e => {
    e.preventDefault();
    const form = e.currentTarget;
    const input = form.elements.namedItem('content') as HTMLInputElement;
    handler(input.value).then(() => {
      form.reset();
    });
  }, [handler]);
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="content" disabled={loading} />
      <button type="submit" disabled={loading}>Add</button>
    </form>
  );
};

export default AddUserForm;