import { Variants, motion } from "framer-motion";
import useDialogContext from "@/lib/hooks/use-dialog-context";
import { cva } from "class-variance-authority";
import cn from "@/lib/utils/cn";

const DialogContentVariants = cva(
  "relative flex flex-col w-full text-inherit pointer-events-auto bg-white border border-gray-950/90 rounded-lg shadow outline-[0]",
  {
    variants: {
      scrollable: {
        true: "max-h-full overflow-hidden",
      },
      fullscreen: {
        true: "h-full border-0 rounded-none",
        sm: "max-sm:h-full max-sm:border-0 max-sm:rounded-none",
        md: "max-md:h-full max-md:border-0 max-md:rounded-none",
        lg: "max-lg:h-full max-lg:border-0 max-lg:rounded-none",
        xl: "max-xl:h-full max-xl:border-0 max-xl:rounded-none",
      },
    },
    defaultVariants: {},
  }
);

type DialogContentProps = {
  children: React.ReactNode;
  className?: string;
};

export default function DialogContent({
  children,
  className,
}: DialogContentProps) {
  const {
    animation,
    scrollable,
    fullscreen,
    animateStaticDialog,
    onStopPropagation,
  } = useDialogContext();

  return (
    <motion.div
      key={"dialog-content"}
      variants={animation as Variants}
      initial={"initial"}
      animate={"animate"}
      exit={"exit"}
      className={cn(
        DialogContentVariants({ scrollable, fullscreen, className }),
        {
          "!scale-[1.02] !transition-transform !duration-300 !ease-out":
            animateStaticDialog,
        }
      )}
      onClick={onStopPropagation}
    >
      {children}
    </motion.div>
  );
}
