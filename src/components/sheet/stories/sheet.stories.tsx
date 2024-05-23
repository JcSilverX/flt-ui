import React from "react";
import Sheet, {
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
} from "../sheet";

export default function SheetDemo() {
	return (
		<Sheet>
			<SheetHeader>
				<SheetTitle></SheetTitle>
				<SheetDescription></SheetDescription>
			</SheetHeader>
			<SheetContent></SheetContent>
		</Sheet>
	);
}
