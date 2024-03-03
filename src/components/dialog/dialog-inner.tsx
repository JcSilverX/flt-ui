import useDialogContext from "@/lib/hooks/use-dialog-context";
import cn from "@/lib/utils/cn";
import { cva } from "class-variance-authority";

const DialogInnerVariants = cva(
  "relative w-auto m-2 sm:m-7 pointer-events-none sm:mx-auto",
  {
    variants: {
      scrollable: {
        true: "h-[calc(100%_-_.5rem_*_2)] sm:h-[calc(100%_-_1.75rem_*_2)]",
      },
      size: {
        default: "sm:max-w-[31.25rem]",
        sm: "sm:max-w-[18.75rem]",
        lg: "sm:max-w-[31.25rem] lg:max-w-[50rem]",
        xl: "lg:max-w-[50rem] xl:max-w-[71.25rem]",
      },
      fullscreen: {
        true: "w-dvw !max-w-none h-full !m-0",
        sm: "max-sm:w-dvw max-sm:!max-w-none max-sm:h-full max-sm:!m-0",
        md: "max-md:w-dvw max-md:!max-w-none max-md:h-full max-md:!m-0",
        lg: "max-lg:w-dvw max-lg:!max-w-none max-lg:h-full max-lg:!m-0",
        xl: "max-xl:w-dvw max-xl:!max-w-none max-xl:h-full max-xl:!m-0",
      },
      centered: {
        true: "flex items-center min-h-[calc(100%_-_.5rem_*_2)] sm:min-h-[calc(100%_-_1.75rem_*_2)]",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);
type DialogInnerProps = {
  children: React.ReactNode;
};

export default function DialogInner({ children }: DialogInnerProps) {
  const {
    scrollable,
    centered,
    size,
    fullscreen,
    dialogClassName: className,
  } = useDialogContext();

  return (
    <div
      className={cn(
        DialogInnerVariants({
          scrollable,
          size,
          centered,
          fullscreen,
          className,
        })
      )}
    >
      {children}
    </div>
  );
}
