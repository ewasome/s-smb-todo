import { useRef } from 'react';
import { isEqual } from 'lodash';

// deep comparison with previous value
export function useMemoizedValue(value: unknown): any {
  const ref = useRef() as React.MutableRefObject<any>;

  if (!isEqual(value, ref.current)) {
    ref.current = value;
  }
  return ref.current;
}

export default useMemoizedValue;
