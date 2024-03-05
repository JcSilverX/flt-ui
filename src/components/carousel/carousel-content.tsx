import useCarouselContext from "@/lib/hooks/use-carousel-context";
import cn from "@/lib/utils/cn";
import { motion } from "framer-motion";

type CarouselContentProps = React.HTMLAttributes<HTMLDivElement> & {};

export function CarouselContent({
  children,
  className }: CarouselContentProps) {
  const { page, carouselContentRef: ref } = useCarouselContext();

  return (
    <motion.div
      key={page}
      ref={ref}
      initial={{
        marginInline: `-${page * 100}%`
      }}
      animate={{
        marginInline: 0
      }}
      exit={{
        marginInline: `${page * 100}%`
      }}
      className={cn('relative w-full h-full grid grid-flow-col-dense grid-cols-[repeat(3,minmax(100%,1fr))]', className)}
    >
      {children}
    </motion.div>
  );
}