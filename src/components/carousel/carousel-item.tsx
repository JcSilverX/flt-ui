import { motion } from "framer-motion";
import cn from "@/lib/utils/cn";
import useCarouselContext from "@/lib/hooks/use-carousel-context";

type CarouselItemProps = React.HTMLAttributes<HTMLDivElement> & {};

export function CarouselItem({ children, className }: CarouselItemProps) {
  const { page, dragX, handleDragEnd } = useCarouselContext();

  return (
    <motion.div
      key={page}
      transition={{
        x: { type: "spring", stiffness: 300, damping: 30, mass: 3 },
        opacity: { duration: 0.2 },
      }}
      className={cn("relative w-full h-full", className)}>
      {children}
    </motion.div>
  );
}

