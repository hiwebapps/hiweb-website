import { useRef, useEffect, useMemo, useDebugValue } from 'react';
import { useSyncExternalStore } from 'react';

/**
 * Minimal with-selector shim (same API as use-sync-external-store/shim/with-selector).
 * @template Snapshot
 * @template Selection
 */
export function useSyncExternalStoreWithSelector(
  subscribe,
  getSnapshot,
  getServerSnapshot,
  selector,
  isEqual,
) {
  const inst = useRef(null);
  if (inst.current === null) {
    inst.current = { hasValue: false, value: null };
  }

  const [getSelection, getServerSelection] = useMemo(() => {
    let hasMemo = false;
    /** @type {Snapshot} */
    let memoizedSnapshot;
    /** @type {Selection} */
    let memoizedSelection;

    const memoizedSelector = (/** @type {Snapshot} */ nextSnapshot) => {
      if (!hasMemo) {
        hasMemo = true;
        memoizedSnapshot = nextSnapshot;
        const nextSelection = selector(nextSnapshot);
        if (isEqual !== undefined && inst.current.hasValue) {
          const currentSelection = inst.current.value;
          if (isEqual(currentSelection, nextSelection)) {
            memoizedSelection = currentSelection;
            return currentSelection;
          }
        }
        memoizedSelection = nextSelection;
        return nextSelection;
      }

      const prevSnapshot = memoizedSnapshot;
      const prevSelection = memoizedSelection;
      if (Object.is(prevSnapshot, nextSnapshot)) {
        return prevSelection;
      }
      const nextSelection = selector(nextSnapshot);
      if (isEqual !== undefined && isEqual(prevSelection, nextSelection)) {
        memoizedSnapshot = nextSnapshot;
        return prevSelection;
      }
      memoizedSnapshot = nextSnapshot;
      memoizedSelection = nextSelection;
      return nextSelection;
    };

    const maybeGetServerSnapshot =
      getServerSnapshot === undefined ? undefined : () => memoizedSelector(getServerSnapshot());
    return [() => memoizedSelector(getSnapshot()), maybeGetServerSnapshot];
  }, [getSnapshot, getServerSnapshot, selector, isEqual]);

  const value = useSyncExternalStore(subscribe, getSelection, getServerSelection);

  useEffect(() => {
    inst.current.hasValue = true;
    inst.current.value = value;
  }, [value]);

  useDebugValue(value);
  return value;
}

export default useSyncExternalStoreWithSelector;
