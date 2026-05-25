import { useSyncExternalStore } from 'react';

export function useIsMounted() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}
