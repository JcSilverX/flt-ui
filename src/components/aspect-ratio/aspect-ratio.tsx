import React from "react";

type AspectRatioProps = React.HTMLAttributes<HTMLDivElement> & {
	reference?: React.RefObject<HTMLDivElement> | undefined;
};

export default function AspectRatio({}: AspectRatioProps) {
	return <div>AspectRatio</div>;
}
