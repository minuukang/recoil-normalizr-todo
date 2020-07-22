import { useState } from "react";

export function useAsyncLoading (initialState: boolean = false) {
  const [loading, setLoading] = useState(initialState);
  return [
    loading,
    async (callback: () => Promise<any>) => {
      setLoading(true);
      await callback();
      setLoading(false);
    }
  ] as const;
}