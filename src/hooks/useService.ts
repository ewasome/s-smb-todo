import {
  useState,
  useEffect,
  useCallback,
} from 'react';

export const useService = (service, options = {}) => {
  const { lazy = false, onCompleted, args } = options;

  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchData = useCallback(async () => {
    setIsError(false);
    setIsLoading(true);

    try {
      const a = args || [];
      const result = await service(...a);
      setData(result);
      setIsError(false);
      if (typeof onCompleted === 'function') {
        onCompleted(result);
      }
    } catch (error) {
      setIsError(true);
    }

    setIsLoading(false);
  }, [args, onCompleted, service]);

  useEffect(() => {
    if (lazy) return;
    fetchData();
  }, [fetchData, lazy]);

  return { data, isLoading, isError, fetch: fetchData };
};

export default useService;