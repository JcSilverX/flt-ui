import React from "react";
import Badge from "../badge";

export default function BadgeExample1() {
  return (
    <div>
      <Badge>Example</Badge>
      <Badge variant={"outline"}>Example 1</Badge>
      <Badge variant={"destructive"}>Example 2</Badge>
      <Badge variant={"secondary"}>Example 3</Badge>
    </div>
  );
}
