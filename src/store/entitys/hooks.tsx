import { useSetRecoilState } from "recoil";
import { entitySelector } from "./selectors";
import { NormalizedSchema } from "normalizr";
import { EntityRecord } from "../../model/types";
import { useCallback } from "react";

export function useNormalizeEntity<D, R>(normalizerFn: (data: D) => NormalizedSchema<EntityRecord, R>) {
  const handleSetEntities = useSetRecoilState(entitySelector);
  return useCallback((data: D) => {
    const { entities, result } = normalizerFn(data);
    handleSetEntities(entities);
    return result;
  }, [normalizerFn]);
}