import React from "react";

function useDebounce<T>(value: T, delay = 500): T {
	const [debounceValue, setDebounceValue] = React.useState(value);

	React.useEffect(() => {
		const timerId = setTimeout(() => setDebounceValue(value), delay);

		return () => clearTimeout(timerId);
	}, [value, delay]);

	return debounceValue;
}

export { useDebounce };
