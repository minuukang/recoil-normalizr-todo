import React, { useCallback } from 'react';
import { User } from '../../../model/types';
import { useChangeCurrentUserName } from '../../../store/auth/hooks';

type Props = {
  user: User;
  isCurrentUser: boolean;
  onChangeCurrentUser: VoidFunction;
}

const UserItem: React.FC<Props> = ({ user, isCurrentUser, onChangeCurrentUser }) => {
  const { handleChangeCurrentUserName, loading } = useChangeCurrentUserName();
  const handleChangeUserName: React.FormEventHandler<HTMLFormElement> = useCallback(e => {
    e.preventDefault();
    const input = e.currentTarget.elements.namedItem('name') as HTMLInputElement;
    handleChangeCurrentUserName(input.value);
  }, [handleChangeCurrentUserName]);
  return (
    <div>
      <input type="checkbox" checked={isCurrentUser} onChange={onChangeCurrentUser} />
      {isCurrentUser ? (
        <form style={{ display: 'inline' }} onSubmit={handleChangeUserName}>
          <input type="text" name="name" defaultValue={user.name} disabled={loading} />
          <input type="submit" value="Change Name" disabled={loading} />
        </form>
      ) : user.name}
    </div>
  );
};

export default UserItem;