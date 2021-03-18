import { useState, useEffect, useCallback } from 'react';
import { isFunction } from 'lodash';

import { DataServiceOptions } from '../interfaces';

import useMemoizedValue from './useMemoizedValue';

// loaded data getter, load action trigger adapter to unify different API calls
export const useService = (
  service: (...args: any[]) => Promise<any>,
  options: DataServiceOptions = {}
): any => {
  const { lazy = false, onCompleted, args = [] } = options;
  const [data, setData] = useState<any>();
  const [isLoading, setIsLoading] = useState(!lazy);
  const [isError, setIsError] = useState(false);

  // increase performance by passed data memoization
  const memoArgs = useMemoizedValue(args);
  const memoOnCompleted = useMemoizedValue(onCompleted);

  // load action
  const fetchData = useCallback(async () => {
    // start action
    setIsError(false);
    setIsLoading(true);

    try {
      // successful data load handling
      const result = await service(...(memoArgs ? memoArgs : []));
      setData(result);
      setIsError(false);
      setIsLoading(false);
      // onCompleted function is optional, run only if passed
      if (isFunction(memoOnCompleted)) {
        memoOnCompleted(result);
      }
    } catch (error) {
      // data load failure handling
      setIsError(true);
      setIsLoading(false);
    }
  }, [service, memoArgs, memoOnCompleted]);

  useEffect(() => {
    // immediate action call only on lazy flag set to true
    if (lazy) return;
    fetchData();
  }, [lazy, fetchData]);

  // return loaded data, loading/error state, and load action trigger
  return { data, isLoading, isError, fetch: fetchData };
};

export default useService;
