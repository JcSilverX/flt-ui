import { motion } from "framer-motion";
import useDialogContext from "@/lib/hooks/use-dialog-context";
import { cva } from "class-variance-authority";
import cn from "@/lib/utils/cn";

const DialogOverlayVariants = cva(
  "fixed top-0 left-0 z-[1050] w-dvw h-dvh bg-slate-900/20",
  {
    variants: {
      blur: {
        true: "backdrop-blur",
      },
      backdrop: {
        false: "",
        static: "",
      },
    },
    defaultVariants: {},
  }
);

type DialogOverlayProps = {
  children: React.ReactNode;
};

export default function DialogOverlay({ children }: DialogOverlayProps) {
  const {
    backdrop,
    blur,
    backdropClassName: className,
    backdropAnimation,
    onClickOutside,
  } = useDialogContext();

  return (
    <motion.div
      key={"dialog-overlay"}
      variants={backdropAnimation}
      initial={"initial"}
      animate={"animate"}
      exit={"exit"}
      onClick={onClickOutside}
      className={cn(DialogOverlayVariants({ blur, backdrop, className }))}
    >
      {children}
    </motion.div>
  );
}
