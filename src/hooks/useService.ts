import { useState, useEffect, useCallback } from "react";
import { isFunction } from "lodash";

import useMemoizedValue from "./useMemoizedValue";

export const useService = (
  service: (...args: any[]) => Promise<any>,
  options: DataServiceOptions = {}
): any => {
  const { lazy = false, onCompleted, args = [] } = options;
  const [data, setData] = useState<any>();
  const [isLoading, setIsLoading] = useState(!lazy);
  const [isError, setIsError] = useState(false);

  const memoArgs = useMemoizedValue(args);
  const memoOnCompleted = useMemoizedValue(onCompleted);

  const fetchData = useCallback(async () => {
    setIsError(false);
    setIsLoading(true);

    try {
      const result = await service(...(memoArgs ? memoArgs : []));
      setData(result);
      setIsError(false);
      setIsLoading(false);
      if (isFunction(memoOnCompleted)) {
        memoOnCompleted(result);
      }
    } catch (error) {
      console.error(error);
      setIsError(true);
      setIsLoading(false);
    }
  }, [service, memoArgs, memoOnCompleted]);

  useEffect(() => {
    if (lazy) return;
    fetchData();
  }, [lazy, fetchData]);

  return { data, isLoading, isError, fetch: fetchData };
};

export default useService;
