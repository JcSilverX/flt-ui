import React from "react";
import cn from "@/lib/utils/cn";

type TOrientation = "horizontal" | "vertical";

type SeparatorProps = React.HTMLAttributes<HTMLSpanElement> & {
  reference?: React.RefObject<HTMLSpanElement> | undefined;
  orientation?: TOrientation | undefined;
  decorative?: boolean;
};

export default function Separator({
  orientation = "horizontal",
  decorative,
  className,
  ...props
}: SeparatorProps) {
  const { reference: ref } = props;
  const ariaOrientation = orientation === "vertical" ? orientation : undefined;
  const semanticProps = !decorative
    ? { role: "none" }
    : { "aria-orientation": ariaOrientation, role: "separator" };

  return (
    <span
      ref={ref}
      data-jsx-orientation={orientation}
      className={cn(
        "inline-block data-[jsx-orientation=horizontal]:h-[.0625rem] data-[jsx-orientation=horizontal]:w-full data-[jsx-orientation=vertical]:h-full data-[jsx-orientation=vertical]:w-[.0625rem]",
        className,
        {}
      )}
      {...props}
      {...semanticProps}
    />
  );
}
