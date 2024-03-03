import { Variants } from "framer-motion";

type DialogProps = {
  children: React.ReactNode;
  /**
   * When true The dialog will show itself.
   */
  isOpen: boolean;
  /**
   * A callback fired when the header's close button or the non-static backdrop is clicked. This function is necessary if either of these elements is specified.
   * @returns void
   */
  onHide: () => void;
  /**
   * Include a backdrop component. Use 'static' to create a backdrop that doesn't trigger an "onHide" event when clicked.
   */
  backdrop?: "static" | boolean;
  /**
   * Applies a blurring effect to the backdrop.
   */
  blur?: boolean;
  /**
   * Apply an optional additional class name to backdrop.
   */
  backdropClassName?: string;
  /**
   * Apply an optional additional class name to dialog.
   */
  dialogClassName?: string;
  /**
   * Close the dialog when the escape key is pressed.
   */
  keyboard?: boolean;
  /**
   * Enables scrolling within the <ModalBody> instead of the entire modal when content overflows.
   */
  scrollable?: boolean;
  /**
   * Open and close the dialog with a smooth animation.
   */
  animation?: false | "fade" | "zoom" | Variants;
  /**
   * Specifies the element that should receive focus when the dialog is opened.
   */
  initialFocus?: number;
  /**
   * Render a dialog in large, extra-large, or small sizes. If not specified, the dialog defaults to medium size.
   */
  size?: "default" | "sm" | "lg" | "xl";
  /**
   * Render a fullscreen dialog. If a breakpoint is specified, the dialog will be fullscreen below that breakpoint size.
   */
  fullscreen?: boolean | "sm" | "md" | "lg" | "xl";
  /**
   * Vertically center the dialog in the window.
   */
  centered?: boolean;
  /**Variantsnts) that describes the object.
   * @see aria-labelledby
   */
  "aria-labelledby"?: string | undefined;
  /**
   * Defines a string value that describes or annotates the current element.
   * @see related aria-describedby.
   */
  "aria-describedby"?: string | undefined;
};

export default DialogProps;
