import React, { useCallback } from 'react';
import { useUserList } from './hooks';
import { useCurrentUser } from '../../store/auth/hooks';
import { User } from '../../model/types';
import AddUserForm from './components/AddUserForm';
import UserItem from './components/UserItem';

const Auth: React.FC = () => {
  const { userList, loading: userListLoading } = useUserList();
  const { currentUser, setCurrentUser } = useCurrentUser();
  const handleChangeCurrentUser = useCallback((user: User) => () => {
    setCurrentUser(user);
  }, [setCurrentUser]);
  return (
    <>
      {userListLoading ? <strong>Loading...</strong> : (
        <ul>
          {userList.map(user => (
            <li key={user.id}>
              <UserItem
                user={user}
                isCurrentUser={user.id === currentUser?.id}
                onChangeCurrentUser={handleChangeCurrentUser(user)}
              />
            </li>
          ))}
        </ul>
      )}
      <AddUserForm />
    </>
  );
};

export default Auth;