import { SliceStore } from '@qlover/slice-store';
import { useState, useEffect } from 'react';

export function useSliceStore<T>(store: SliceStore<T>): T {
  const [storeState, _setStoreState] = useState(store.state);

  useEffect(() => {
    store.observer(_setStoreState);

    return () => {
      store.clear();
    };
  }, []);

  return storeState;
}
