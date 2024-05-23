import React from "react";

/**
 * Indicates whether the component is currently mounted.
 * @returns isMounted
 */
export default function useIsMounted() {
	const [isMounted, setIsMounted] = React.useState<boolean>(false);

	React.useEffect(() => setIsMounted(true), []);

	return isMounted;
}
