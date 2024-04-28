import React from "react";

type UseControllableStateParams<T> = {
  prop?: T;
  defaultProp: T;
  onChange: (state: T) => void;
};

type SetStateFn<T> = (prevState?: T) => T;

export default function useControllableState<T>({
  prop,
  defaultProp,
  onChange = () => {},
}: UseControllableStateParams<T>) {
  const [uncontrolledProp, setUncontrolledProp] = useUncontrolledState({
    defaultProp,
    onChange,
  });
  const isControlled = prop !== undefined;
  const value = isControlled ? prop : uncontrolledProp;

  // event handlers / actions
  const handleChange = onChange;

  const setValue: React.Dispatch<React.SetStateAction<T>> = React.useCallback(
    (nextValue) => {
      if (isControlled) {
        const setter = nextValue as SetStateFn<T>;
        const value =
          typeof nextValue === "function" ? setter(prop) : nextValue;

        if (value !== prop) handleChange(value as T);
      } else {
        setUncontrolledProp(nextValue);
      }
    },
    [isControlled, prop, setUncontrolledProp, handleChange]
  );

  return [value, setValue] as const;
}

export function useUncontrolledState<T>({
  defaultProp,
  onChange,
}: Omit<UseControllableStateParams<T>, "prop">) {
  const uncontrolledState = React.useState<T>(defaultProp);
  const [value] = uncontrolledState;
  const prevValueRef = React.useRef(value);

  // event handlers / actions
  const handleChange = onChange;

  // useEffect
  React.useEffect(() => {
    if (prevValueRef.current !== value) {
      handleChange(value as T);
      prevValueRef.current = value;
    }
  }, [value, prevValueRef, handleChange]);

  return uncontrolledState;
}
