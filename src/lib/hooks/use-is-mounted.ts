import React from "react";

export default function useIsMounted() {
	const [isMouted, setIsMounted] = React.useState<boolean>(false);

	React.useEffect(() => setIsMounted(true), []);

	return isMouted;
}
