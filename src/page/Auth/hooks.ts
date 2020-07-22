import { useEffect, useCallback } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userListSelector, userListAtom } from "./querys";
import { getUsers, addUser } from "../../api/user";
import { userListNormalizer, userNormalizer } from "../../model/normalizer";
import { useAsyncLoading } from "../../helpers/useLoading";
import { useNormalizeEntity } from "../../store/entitys/hooks";

export function useUserList () {
  const [loading, handleLoading] = useAsyncLoading();
  const handleSetUserList = useSetRecoilState(userListAtom);
  const userList = useRecoilValue(userListSelector);
  const handleUserListEntity = useNormalizeEntity(userListNormalizer);

  useEffect(() => {
    handleLoading(async () => {
      const result = handleUserListEntity(await getUsers());
      handleSetUserList(result);
    });
  }, []);

  return {
    loading,
    userList
  }
}

export function useAddUser () {
  const [loading, handleLoading] = useAsyncLoading();
  const handleUserEntity = useNormalizeEntity(userNormalizer);
  const handleSetUserList = useSetRecoilState(userListAtom);

  const handler = useCallback((name: string) => handleLoading(async () => {
    const result = handleUserEntity(await addUser(name));
    handleSetUserList(prevList => [...prevList, result]);
  }), []);

  return {
    loading,
    handler
  }
}