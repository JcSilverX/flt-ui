import React from "react";
import ScrollArea, { ScrollAreaScrollbar } from "../scroll-area";
import Separator from "@/components/separator/separator";

const TAG_COUNT = 50;
const tags = Array.from({ length: TAG_COUNT }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`
);

export default function ScrollAreaExample() {
  return (
    <>
      <ScrollArea className="h-72 w-48 rounded-md border mb-3">
        <div className="p-4">
          <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>

          {tags.map((tag) => (
            <React.Fragment key={tag}>
              <div className="text-sm">{tag}</div>
              <Separator className="my-2 bg-black/15" />
            </React.Fragment>
          ))}
        </div>
      </ScrollArea>

      <ScrollArea className="w-96 whitespace-nowrap rounded-md border">
        <div className="flex w-max space-x-4 p-4">
          {tags.slice(0, 5).map((tag) => (
            <figure key={tag} className="flex-shrink-0">
              <div className="overflow-clip rounded-md h-[400px] w-[300px]">
                {tag}
              </div>
            </figure>
          ))}
        </div>

        <ScrollAreaScrollbar orientation="horizontal" />
      </ScrollArea>
    </>
  );
}
