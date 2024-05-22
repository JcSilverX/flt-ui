import Checkbox from "@/components/checkbox/checkbox";
import React from "react";
import Label from "../label";

export default function LabelDemo() {
	return (
		<div>
			<div className="flex items-center space-x-2">
				<Checkbox id="terms" />
				<Label htmlFor="terms">Accept terms and conditions</Label>
			</div>
		</div>
	);
}
