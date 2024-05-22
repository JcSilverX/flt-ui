"use client";

import { ImageLoadingStatus } from "@/components/avatar/avatar";
import { createContext } from "react";

type TAvatarContext = {
	imageLoadingStatus: ImageLoadingStatus;
	setImageLoadingStatus: React.Dispatch<
		React.SetStateAction<ImageLoadingStatus>
	>;
};

const AvatarContext = createContext<TAvatarContext | null>(null);

export default AvatarContext;
