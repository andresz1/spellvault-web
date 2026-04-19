import isEqual from "lodash.isequal";
import { SetStateAction, useCallback, useRef, useState } from "react";

export function useCombinedState<T>(
  controlledValue?: T,
  defaultValue?: T,
  onChange?: (nextValue: T) => void,
): [
  T | undefined,
  (newValue: T, forceFlag?: (prev: T, next: T) => boolean) => void,
  boolean,
  T | undefined,
] {
  const isControlled = controlledValue !== undefined;
  const { current: initialValue } = useRef(
    isControlled ? controlledValue : defaultValue,
  );

  const [innerValue, setInnerValue] = useState(defaultValue as T);
  const value = isControlled ? (controlledValue as T) : innerValue;

  const updater = useCallback(
    (
      next: SetStateAction<T>,
      shouldUpdateProp = (prevValue: T, nextValue: T) =>
        !isEqual(prevValue, nextValue),
    ) => {
      const nextValue =
        typeof next !== "function" ? next : (next as (value: T) => T)(value);

      const shouldUpdate = shouldUpdateProp(value, nextValue);

      if (!shouldUpdate) {
        return;
      }

      if (!isControlled) {
        setInnerValue(nextValue);
      }

      if (onChange) {
        onChange(nextValue);
      }
    },
    [isControlled, value, onChange],
  );

  return [value, updater, isControlled, initialValue];
}
