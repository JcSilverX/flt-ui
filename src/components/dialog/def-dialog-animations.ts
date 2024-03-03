import { easeOut } from "framer-motion";

const defaultVariants = {
  zoom: {
    initial: {
      scale: 0,
    },
    animate: {
      scale: 1,
    },
    exit: {
      scale: 0,
    },
  },
  fade: {
    initial: {
      y: "-50px",
      opacity: 0,
    },
    animate: {
      y: "0",
      opacity: 1,
      transition: {
        duration: 0.3,
        type: easeOut,
      },
    },
    exit: {
      y: "-50px",
      opacity: 0,
    },
  },
  backdrop: {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
    },
    exit: {
      opacity: 0,
    },
  },
};

export default defaultVariants;
