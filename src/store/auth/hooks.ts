import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil";
import { currentUserSelector, currentUserIdAtom } from "./querys";
import { useEffect, useCallback } from "react";
import { getCurrentUser, changeUserName } from "../../api/user";
import { userNormalizer } from "../../model/normalizer";
import { useNormalizeEntity } from "../entitys/hooks";
import { useAsyncLoading } from "../../helpers/useLoading";

export function useChangeCurrentUserName () {
  const [loading, handleLoading] = useAsyncLoading();
  const currentUser = useRecoilValue(currentUserSelector);
  const handleUserEntity = useNormalizeEntity(userNormalizer);

  const handleChangeCurrentUserName = useCallback((newName: string) => handleLoading(async () => {
    if (!currentUser) {
      throw new Error('CurrentUser is not defined');
    }
    handleUserEntity(await changeUserName(currentUser.id, newName));
  }), [currentUser]);

  return {
    loading,
    handleChangeCurrentUserName
  }
}

export function useCurrentUser () {
  const [loading, handleLoading] = useAsyncLoading();
  const [currentUser, setCurrentUser] = useRecoilState(currentUserSelector);
  const handleChangeCurrentUserId = useSetRecoilState(currentUserIdAtom);
  const handleUserEntity = useNormalizeEntity(userNormalizer);
  useEffect(() => {
    handleLoading(async () => {
      const result = handleUserEntity(await getCurrentUser());
      handleChangeCurrentUserId(result);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    loading,
    currentUser,
    setCurrentUser
  };
}